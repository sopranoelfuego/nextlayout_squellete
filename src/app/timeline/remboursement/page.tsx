import React from "react";
import ListOfReimboursements from "./ListOfReimboursements";
import { ISearchParams } from "@/types";

import { redirect } from "next/navigation";
import { IUser, MemberType } from "../../../../types";


interface ListOfReimboursements {
  reimboursements: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadReimboursements = async ({ page, size, direction ,token}: ISearchParams ) => {
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
  const res = await fetch(
        `${process.env.ROOT_API}/remboursements`,{
          cache:"no-cache",next:{
          tags:["remboursements"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
      if(!res.ok)return
      return res.json();
};
// const loadCredits = async ({ page, size, direction ,token}: ISearchParams ) => {
//   // const res = await fetch(
//   //       `${process.env.ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
//   //         cache:"no-cache",next:{
//   //         tags:["cotisations"]
//   //       },
//   //       headers:{
//   //         "Authorization":`Bearer ${token}`
//   //       }
//   //     }
//   //     );
//   // http://192.168.20.180:8081/gp-com/api/v1/credits
//   const res = await fetch(
//         // `${process.env.ROOT_API}/credits`,{
//         'http://192.168.20.180:8081/gp-com/api/v1/credits',{
//           cache:"no-cache",next:{
//           tags:["credits"]
//         },
//         headers:{
//           "Authorization":`Bearer ${token}`
//         }
//       }
//       );
//       // console.log("resjson:",res.json())
//       if(!res.ok)return
//       return res.json();
// };


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

const reimboursement=loadReimboursements({
    page,
    size,
    direction,
    token:userStorage?.token!
  })

  return <ListOfReimboursements reimboursements={reimboursement}  />;
}
