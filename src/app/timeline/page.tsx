

import React from "react";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
import DashBoard from "./DashBoard";

const loadData = async () => {
  const res = await fetch(`${process.env.ROOT_API}/dashboard`,{cache:"no-cache"});
  const data = res.json();
  // if(!data.ok)return
  return data;
};
export default async function Home() {
  if (typeof window !== "undefined") {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return redirect("/login");
  }

   const {response}  = await loadData()
console.log("response:",response)
  // return <DashBoard resumee={response}/>;

  return <>hello</>;
}
