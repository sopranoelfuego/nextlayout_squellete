import React from "react";
// import Box from "@mui/material/Box";
import ListOfMembers from "@/app/timeline/membres/ListOfMembers";
import { ISearchParams } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IUser, MemberType } from "../../../../types";
// import { redirect } from "next/dist/server/api-utils";

interface ListOfMembersProps {
  members: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadMembers = async ({ page, size, direction ,token}: ISearchParams ) => {
  const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/membres?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
          cache:"no-cache",next:{
          tags:["members"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
      if(!res.ok)return
      return res.json();
};


export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  let userStorage:IUser={
    id:"",
    prenom:"",
    nom:"",
    email:"",
    role:"",
    token:""
  }
  if(typeof window !== 'undefined'){

    userStorage=JSON.parse(localStorage.getItem("user")!)
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
    token:userStorage?.token!
  });

  return <ListOfMembers members={members} />;
}
