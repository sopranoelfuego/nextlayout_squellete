import React from "react";
import ListOfContributions from "@/app/timeline/cotisation/ListOfContributions";
import { ISearchParams } from "@/types";
import Profile from "./Profile"

import { redirect } from "next/navigation";
import { IUser, MemberType } from "../../../../types";


interface ListOfCotisationsProps {
  contributions: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadContributions = async ({ page, size, direction ,token}: ISearchParams ) => {
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
        `${process.env.ROOT_API}/cotisations`,{
          cache:"no-cache",next:{
          tags:["cotisations"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
      if(!res.ok)return
      return res.json();
};
const loadCredits = async ({ page, size, direction ,token}: ISearchParams ) => {
  // const res = await fetch(
  //       `${process.env.ROOT_API}/credits?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(
        `${process.env.ROOT_API}/credits`,{
          cache:"no-cache",next:{
          tags:["credits"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
      if(!res.ok)return
      return res.json();
};
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
  const creditsData=loadCredits({
    page,
    size,
    direction,
    token:userStorage?.token!
  })
  const cotisationsData=loadContributions({
    page,
    size,
    direction,
    token:userStorage?.token!
  })
  const remboursements=loadReimboursements({
    page,
    size,
    direction,
    token:userStorage?.token!
  })
  const [credits,cotisations,reimboursements]=await Promise.all([creditsData,cotisationsData,remboursements])
//   const contributions: ListOfCotisationsProps = await loadContributions({
//     page,
//     size,
//     direction,
//     token:userStorage?.token!
//   })





  return <Profile credits={credits} cotisations={cotisations} reimboursements={reimboursements}/>
}
