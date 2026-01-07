"use client";

import { useDispatch, useSelector } from "react-redux";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { get_me } from "@/redux/features/auth/auth.thunk";
import Redux from "@/redux/provider";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "@/components/Loading/Spinner";
import { Toaster } from "react-hot-toast";
import UserNav from "@/components/Nav/UserNav/UserNav";
import Nav from "@/components/Nav/Nav";
import ArtistNav from "@/components/Nav/ArtistNav/ArtistNav";
import { artist_profile, user_profile } from "@/redux/features/profile/profile.thunk";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup", "/auth/verify-otp"];
const otpRoute = "/auth/verify-otp";
const completeProfileRoute = "/artist/complete-profile";
const hideNavRoutes = ["/auth/signin", "/auth/signup", "/auth/verify-otp", "/artist/complete-profile"];


function InitAuth({ children }) {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isProfileCompleted, loading: profileLoading, isCompleted } = useSelector((state) => state.profile)
  const {
    authChecked,
    otpPending,
    isAuthenticated,
    loading,
    user
  } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(get_me())
  }, [dispatch])

  useEffect(() => {



    if (isAuthenticated && user?.role === "ARTIST") {
      dispatch(artist_profile())
    }

    if (isAuthenticated && user?.role === "USER") {
      dispatch(user_profile())
    }
  }, [dispatch, isAuthenticated, user?.role])


  if (!authChecked || loading) {
    return <Spinner />;
  }


  if (!isAuthenticated && !publicRoutes.includes(path) && !(path === otpRoute && otpPending)) {
    router.replace("/auth/signin");
    return <Spinner />;
  }


  if (isAuthenticated && authRoutes.includes(path)) {
    router.replace("/");
    return <Spinner />;
  }

  if (
    isAuthenticated && path.startsWith("/artist") && user?.role !== "ARTIST"
    ||
    isAuthenticated && path.startsWith("/user") && user?.role !== "USER") {

    router.replace("/");
    return <Spinner />;
  }

  if (isAuthenticated && user?.role === "ARTIST" && !profileLoading  && isCompleted && !isProfileCompleted && path !== completeProfileRoute) {
    router.replace(completeProfileRoute);
    return <Spinner />;
  }


  if (isCompleted && path === completeProfileRoute) {
    router.replace("/")
  }

  return (
    <>
      {!hideNavRoutes.includes(path) && <Nav />}
      {!hideNavRoutes.includes(path) && (
        user?.role === "ARTIST" ? <ArtistNav /> : <UserNav />
      )}
      {children}
    </>
  );
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Redux>
          <InitAuth>
            {children}
            <Toaster position="top-right" />
          </InitAuth>
        </Redux>
      </body>
    </html>
  );
}
