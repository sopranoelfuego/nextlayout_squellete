"use client";
import React, { useEffect,useContext } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UserInfo from "./UserInfo";
import MesCredits from "./MesCreditsTab";
import MesCotisations from "./MesCotisationTabs";
import MesRemboursements from "./MesRemboursementsTab";
import { CotisationType, ICreditType, IReimbourssementType } from "../../../../types";
import { ISearchParams } from "@/types";
import { AuthContext } from "@/components/contexts/authContext";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface IProfileProps{
  credits:ICreditType[],
  cotisations:CotisationType[],
  reimboursements:IReimbourssementType[]
}

const loadContributions = async ({ token,memberId}: {token:string,memberId:string | number | undefined} ) => {
  // const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/cotisations/membre/${memberId}`,{
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
const loadCredits = async ({ token,memberId}: {token:string,memberId:string | number | undefined} ) => {
  // const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_ROOT_API}/credits?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );

  const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/credits/membre/${memberId}`,{
          cache:"no-cache",next:{
          tags:["credits"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
        console.log("user:",memberId,token)

      if(!res.ok)return
      return res.json();
};
const loadReimboursements = async ({ token,memberId}: {token:string,memberId:string | number | undefined} ) => {

  // const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_ROOT_API}/cotisations?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_API}/remboursements/by-membre/${memberId}`,{
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
export default function Profile({credits,cotisations,reimboursements}:IProfileProps) {
  const { user } = useContext(AuthContext);
  const { handleOpenAlert } = useContext(SnackAlertContext);

  const [value, setValue] = React.useState(0);

  
  useEffect(() => {
    let unSubscriber = true;

 
  // if(user)

    const init = () => {
      if (user && unSubscriber){
   const creditsData=loadCredits({
    memberId:user?.id!,
    token:user?.token!
  })
  const cotisationsData=loadContributions({
    memberId:user?.id!,
    token:user?.token!
  })
  const remboursements=loadReimboursements({
    memberId:user?.id,
    token:user?.token!
  })
   Promise.all([creditsData,cotisationsData,remboursements]).then(res=>console.log("res:",res)).catch(err=>{
    handleOpenAlert("error",err.message)
   })

      }
        
    };
    init();
    return () => {
      unSubscriber = false;
    };
  }, [user]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className="flex align-start w-full gap-2 box-border flex-col sm:flex-row">
      <UserInfo />
      <Box sx={{ typography: "body1", flex: "1" }} className="w-full">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="mes credit" {...a11yProps(0)} />
            <Tab label="mes cotisations" {...a11yProps(1)} />
            <Tab label="mes remboursements" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box>
          <CustomTabPanel value={value} index={0}>
            <MesCredits credits={credits}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MesCotisations />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MesRemboursements />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
