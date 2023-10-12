"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ListOfReports from "./ListOfReports";
import MyReport from "./MyReport";
import {
  ICompteSettingType,
  IReportType,
  ISettingType,
  MemberType,
} from "../../../../types";
import { ISearchParams } from "@/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IReportProps {
  reports: IReportType[];
  members: any;
}

export default function Report({reports,members}:IReportProps) {
  const [value, setValue] = React.useState(0);
  // const [reports, setReports] = React.useState<IReportType[]>([]);
  // const [members, setMyReport] = React.useState<IReportType>({
  //   montantCotise: 0,
  //   montantCredit: 0,
  //   montantRemburse: 0,
  //   montantRestantSurCredit: 0,
  //   montantTotalARecevoir: 0,
  //   interet: 0,
  // });

  // React.useEffect(() => {
  //   let subscriber = true;
  //   const loadDataMyReport = async ({
  //     page,
  //     size,
  //     direction,
  //     token,
  //     memberId,
  //   }: ISearchParams) => {

  //     // const res = await fetch(
  //     //       `${process.env.ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //     //         cache:"no-cache",next:{
  //     //         tags:["cotisations"]
  //     //       },
  //     //       headers:{
  //     //         "Authorization":`Bearer ${token}`
  //     //       }
  //     //     }
  //     //     );
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_ROOT_API}/rapport/${memberId}`,
  //       {
  //         cache: "no-cache",
  //         next: {
  //           tags: ["reports"],
  //         },
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!res.ok) return;
  //     return res.json();
  //   };
  //   const loadDataReports = async ({
  //     page,
  //     size,
  //     direction,
  //     token,
  //   }: ISearchParams) => {
  //     // const res = await fetch(
  //     //       `${process.env.NEXT_PUBLIC_ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //     //         cache:"no-cache",next:{
  //     //         tags:["cotisations"]
  //     //       },
  //     //       headers:{
  //     //         "Authorization":`Bearer ${token}`
  //     //       }
  //     //     }
  //     //     );
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/rapport`, {
  //       cache: "no-cache",
  //       next: {
  //         tags: ["report"],
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!res.ok) return;
  //     return res.json();
  //   };
  //   const init = () => {
  //     let userStorage = JSON.parse(localStorage.getItem("user")!);
  //     const myReportData = loadDataMyReport({
  //       page: 0,
  //       size: 0,
  //       direction: "ASC",
  //       memberId: userStorage?.id!,
  //       token: userStorage?.token!,
  //     });

  //     const reportsData = loadDataReports({
  //       page: 0,
  //       size: 0,
  //       direction: "ASC",
  //       memberId: userStorage?.id,
  //       token: userStorage?.token!,
  //     });
  //     Promise.all([myReportData, reportsData])
  //       .then((res) => {
  //         console.log("response:", res);
  //           if(subscriber){

  //             setMyReport({
  //               montantCotise: res?.[0]?.montantCotise,
  //               montantCredit: res?.[0]?.montantCredit,
  //               montantRemburse: res?.[0]?.montantRemburse,
  //               montantRestantSurCredit: res?.[0]?.montantRestantSurCredit,
  //               montantTotalARecevoir: res?.[0]?.montantTotalARecevoir,
  //               interet: res?.[0]?.interet,
  //             });
    
  //             setReports(
  //               res?.[1]?.map((r: IReportType[]) => ({
  //                 montantCotise: r?.[1]?.montantCotise,
  //                 montantCredit: r?.[1]?.montantCredit,
  //                 montantRemburse: r?.[1]?.montantRemburse,
  //                 montantRestantSurCredit: r?.[1]?.montantRestantSurCredit,
  //                 montantTotalARecevoir: r?.[1]?.montantTotalARecevoir,
  //                 interet: r?.[1]?.interet,
  //               }))
  //             );
  //           }
  //       })
  //       .catch((err: Error) => console.log("error:", err.message));
  //     init();

  //     return () => {
  //       subscriber = false;
  //     };
  //   };
  // }, []);
  console.log("data:",members,reports)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="visualiser mon rapport" {...a11yProps(0)} />
          <Tab label="visualiser les rapports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MyReport members={members} reports={reports} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListOfReports reports={reports} />
      </CustomTabPanel>
    </Box>
  );
}
