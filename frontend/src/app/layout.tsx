'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/Navbar/page";
import { usePathname, useRouter } from 'next/navigation'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from "react";
import { getUserToken, isLoggedIn, logout } from "@/assets/utils/auth.util";
import { navigation } from "@/api/CommonData";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ChatBot from "./component/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuth, setIsAuth] = useState<Boolean>(false)
  const pathname = usePathname()
  const router = useRouter();

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (isLoggedIn()) {
      if (pathname === "/") {
        router?.push(navigation?.[0]?.href)
        setIsAuth(true)
      } else {
        const data = navigation?.find((item) => item?.href === pathname)
        setIsAuth(data ? true : false)
      }
      if (getUserToken()) {
        const decodedToken: any = jwtDecode(getUserToken());
        if (decodedToken?.exp < Math.floor(Date.now() / 1000)) {
          logout()
          router.push('/')
        }
      }
    } else {
      router?.push("/")
      setIsAuth(false)
    }
  }, [pathname])


  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Digital Lync</title>
      <body className={inter.className}>
        <>
          <Provider store={storeRef.current}>
            <ToastContainer />
            {isAuth && <Navbar />}
            <ChatBot />
            {children}
          </Provider>
        </>
      </body>
    </html>
  );
}
