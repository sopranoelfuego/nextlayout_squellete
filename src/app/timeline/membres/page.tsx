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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_API}/membres?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,
    {
      cache: "no-cache",
      next: {
        tags: ["members"],
      },
    }
  );
  if (!res.ok) return;
  return res.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  if (typeof window !== "undefined") {
    const userStorage = localStorage.getItem("user");

    // const session = await getServerSession(authOptions);
    if (!userStorage) redirect("/login");
  }
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
