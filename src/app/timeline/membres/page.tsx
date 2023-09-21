import React from "react";
// import Box from "@mui/material/Box";
import ListOfMembers from "@/app/timeline/membres/ListOfMembers";
import { ISearchParams } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberType } from "../../../../types";
// import { redirect } from "next/dist/server/api-utils";

interface ListOfMembersProps {
  members: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadMembers = async ({ page, size, direction }: ISearchParams) => {
  let user:any
  if(typeof window !== "undefined"){

    user=JSON.parse(localStorage.getItem("user")!)
   
     const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/membres?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
          cache:"no-cache",next:{
          tags:["members"]
        },
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      }
      );
      // console.log("res:",res)
      if(!res.ok)return
      return res.json();
  }
};


export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  if(typeof window !== 'undefined'){

    let userStorage=localStorage.getItem("user")
    if (!userStorage) redirect("/login");
  }

  // const session = await getServerSession(authOptions);
 
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams?.page) : 0;
  const size =
    typeof searchParams?.size === "string" ? Number(searchParams?.size) : 10;
  const direction =
    searchParams?.direction === "DESC" ? searchParams?.direction : "ASC";

  const members: ListOfMembersProps = await loadMembers({
    page,
    size,
    direction,
  });

  return <ListOfMembers members={members} />;
}
