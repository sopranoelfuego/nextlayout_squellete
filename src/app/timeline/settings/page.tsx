

import React from "react";
import { redirect } from "next/navigation";
import Settings from "./settingsEntry";
// import { useRouter } from "next/navigation";
// import DashBoard from "./DashBoard";


const  loadDataComptes=async()=>{
    const res=await fetch(`${process.env.ROOT_API}/comptes`)
    return res.json()
}
const  loadDataGeneralAccount=async()=>{
    const res=await fetch(`${process.env.ROOT_API}/params`)
    return res.json()
}
export default async function Home() {
  const comptesData=loadDataComptes()
  const generalsSetingsData=loadDataGeneralAccount()
  const [comptes,settings]=await Promise.all([comptesData,generalsSetingsData]) 
  if (typeof window !== "undefined") {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return redirect("/login");
  }



  return <Settings settings={settings?.result} comptes={comptes?.result?.[0]}/>;
}
