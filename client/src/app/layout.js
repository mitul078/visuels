"use client"
import { useDispatch, useSelector } from "react-redux";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { get_me } from "@/redux/features/auth/auth.thunk";
import Redux from "@/redux/provider"
import Nav from "@/components/Nav/Nav";
import { useRouter, usePathname } from "next/navigation";


const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});


const authRoutes = ["/signin", "/signup"]

function InitAuth({ children }) {
  const path = usePathname()

  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const router = useRouter()
  
  useEffect(() => {
    dispatch(get_me());
  }, [dispatch])
  
  useEffect(() => {
    if (!loading && !user && !authRoutes.includes(path)) {
      router.replace("/signup")
    }

  }, [user, loading, router , path])

  if (loading) return null

  return children
}

export default function RootLayout({ children }) {
  const path = usePathname()
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
            {!authRoutes.includes(path) && <Nav />}
            {children}
          </InitAuth>
        </Redux>
      </body>
    </html>
  );
}
