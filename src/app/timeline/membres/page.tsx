import React from "react";
// import Box from "@mui/material/Box";
import ListOfMembers from "@/app/timeline/membres/ListOfMembers";
import { ISearchParams, MemberType } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

interface ListOfMembersProps {
  members: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadMembers = async ({ page, size, direction }: ISearchParams) => {
  console.log("enter again",page,size)
   const res = await fetch(
      `${process.env.ROOT_API}/membres?page:${page}&size:${size}&direction:${direction}&sortBy=nom`,{cache:"no-cache"}
    );
    return res.json();
};


export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  const session = await getServerSession(authOptions);
  // GET PARAMS
  /**  page:string
    size:number
    direction:'ASC' | 'DESC' */
  if (!session) redirect("/login");
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
