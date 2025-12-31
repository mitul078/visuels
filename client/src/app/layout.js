"use client";

import { useDispatch, useSelector } from "react-redux";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { get_me } from "@/redux/features/auth/auth.thunk";
import Redux from "@/redux/provider";
import Nav from "@/components/Nav/Nav";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "@/components/Loading/Spinner";
import { Toaster } from "react-hot-toast";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

const publicRoutes = ["/signin", "/signup"];
const authRoutes = ["/signin", "/signup", "/verify-otp"];
const otpRoute = "/verify-otp";

function InitAuth({ children }) {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { authChecked, otpPending, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_me());
  }, [dispatch]);

  if (!authChecked || loading) {
    return <Spinner />;
  }

  if (!isAuthenticated && !publicRoutes.includes(path) && !(path === otpRoute && otpPending)) {
    router.replace("/signin");
    return <Spinner />;
  }


  if (isAuthenticated && authRoutes.includes(path)) {
    router.replace("/");
    return <Spinner />;
  }

  return (
    <>
      {!authRoutes.includes(path) && <Nav />}
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
