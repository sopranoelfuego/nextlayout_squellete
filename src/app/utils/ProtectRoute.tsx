import React from "react"
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter,usePathname,useSearchParams } from "next/navigation";

interface IPageProps{
    Component:React.ReactNode,
}
export default function MyApp({ Component, pageProps }:AppProps<IPageProps>) {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const checkUserAuthentication=()=>"hello"
    useEffect(() => {
      const url = pathname + searchParams.toString()
      // sendSomewhere(url)
      console.log("url:",pathname,searchParams.toString())
   }, [pathname, searchParams])


  return <Component {...pageProps} />
}