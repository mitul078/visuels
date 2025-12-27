"use client"
import { useDispatch } from "react-redux";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { get_me } from "@/redux/features/auth/auth.thunk";
import Redux from "@/redux/provider"
import Nav from "@/components/Nav";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

function InitAuth({ children }) {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_me());
  }, [])

  return children
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body>
        <Redux>
          <InitAuth>
            <Nav />
            {children}
          </InitAuth>
        </Redux>
      </body>
    </html>
  );
}
