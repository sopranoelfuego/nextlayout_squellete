

import React from "react";
import { redirect } from "next/navigation";
import Settings from "./settingsEntry";



const  loadDataComptes=async()=>{
    const res=await fetch(`${process.env.ROOT_API}/comptes`,{
          cache:"no-cache",next:{
          tags:["comptes"]
        }})
    return res.json()
}
const  loadDataGeneralSettings=async()=>{
    const res=await fetch(`${process.env.ROOT_API}/params`,{
          cache:"no-cache",next:{
          tags:["settings"]
        }})
    return res.json()
}
export default async function Home() {

  const comptesData=loadDataComptes()
  const generalsSetingsData=loadDataGeneralSettings()
  const [comptes,settings]=await Promise.all([comptesData,generalsSetingsData]) 
  if (typeof window !== "undefined") {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return redirect("/login");
  }



  return <Settings settings={settings?.result}  comptes={comptes?.result?.[0]}/>;
}
