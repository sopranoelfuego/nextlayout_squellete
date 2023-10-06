import Report from "./Report";
import { ISearchParams } from "@/types";
import { IUser } from "../../../../types";
import { redirect } from "next/navigation";

const loadMembers = async ({ page, size, direction, token }: ISearchParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_API}/membres?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,
    {
      cache: "no-cache",
      next: {
        tags: ["members"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) return;
  return res.json();
};

const loadDataMyReport = async ({
  page,
  size,
  direction,
  token,
  memberId,
}: ISearchParams) => {
  console.log("enter:", memberId, token);

  // const res = await fetch(
  //       `${process.env.ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(`${process.env.ROOT_API}/rapport/${memberId}`, {
    cache: "no-cache",
    next: {
      tags: ["reports"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return;
  return res.json();
};
const loadDataReports = async ({
  page,
  size,
  direction,
  token,
}: ISearchParams) => {
  // const res = await fetch(
  //       `${process.env.ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(`${process.env.ROOT_API}/rapport`, {
    cache: "no-cache",
    next: {
      tags: ["report"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  let userStorage: IUser = {
    id: "",
    prenom: "",
    nom: "",
    email: "",
    role: "",
    token: "",
  };
  if (typeof window !== "undefined") {
    userStorage = JSON.parse(localStorage.getItem("user")!);
    if (!userStorage) redirect("/login");
  }
  if (userStorage?.id) console.log("here enter:", userStorage?.id);

  // const session = await getServerSession(authOptions);

  const page =
    typeof searchParams?.page === "string" ? Number(searchParams?.page) : 0;
  const size =
    typeof searchParams?.size === "string" ? Number(searchParams?.size) : 10;
  const direction =
    searchParams?.direction === "DESC" ? searchParams?.direction : "ASC";

  //  ===== PROMISES TO REQUEST =====================

  const memberData = loadMembers({
    page,
    size,
    direction,
    memberId: userStorage?.id!,
    token: userStorage?.token!,
  });

  const reportsData = loadDataReports({
    page,
    size,
    direction,
    memberId: userStorage?.id,
    token: userStorage?.token!,
  });
  const [members, reports] = await Promise.all([memberData, reportsData]);

  return <Report members={members} reports={reports} />;
}
