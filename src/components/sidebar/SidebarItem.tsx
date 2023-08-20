'use client'
import React from "react";
import { usePathname } from 'next/navigation'
 
<<<<<<< HEAD
import Stack from "@mui/material/Stack";

import Tooltip  from "@mui/material/Tooltip";
import Typography  from "@mui/material/Typography";
import Link from "next/link";

=======
import { Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

import { useRouter } from 'next/navigation'
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
import { SidebarItemType } from "./SidebarData";

const SidebarItem = ({
  item,
  expand,
  displayMenuDrawer,
  handleCloseDisplayMenuDrawer
}: {
  item: SidebarItemType;
  expand: boolean;
  displayMenuDrawer?:boolean,
  handleCloseDisplayMenuDrawer?:()=>void ,
}) => {
<<<<<<< HEAD
=======
  const router = useRouter()
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
  // const navigate=useNaviga
  const  pathname  = usePathname();
  const isActive = pathname === item.href;
  return (
<<<<<<< HEAD
    <Tooltip title={`${item?.linkName?.toString()}`}>
=======
    <Tooltip title={`${item?.linkName.toString()}`}>
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
      <Link href={item.href} >
        <Stack direction={expand || displayMenuDrawer?"row":"column"} width={expand?"100%":"auto"} spacing={2}   sx={{display:"flex",opacity:isActive?"1":"0.8",color:isActive?'#055E68':'inherit',transition:"all ease 400ms",justifyContents:"center",alignItems:"center",":hover":{
          opacity:"1"
        }}} padding="0 1rem">
          {item?.icon} <Typography sx={{display:expand ?'inline-flex':'none',textAlign:"center",fontWeight:"bold",fontSize:"14px"}} gutterBottom={false} >{item.linkName}</Typography>
        </Stack>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
