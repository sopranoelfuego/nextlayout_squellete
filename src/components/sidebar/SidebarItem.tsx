'use client'
import React from "react";
import { usePathname } from 'next/navigation'
 
import { Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

import { SidebarItemType } from "./SidebarData";

const SidebarItem = ({
  item,
  expand,
}: {
  item: SidebarItemType;
  expand: boolean;
}) => {
  const  pathname  = usePathname();
  const isActive = pathname === item.href;
  return (
    <Tooltip title={`${item?.linkName}`}>
      <Link href={item.href}>
        <Stack direction={expand?"row":"column"} width={expand?"100%":"auto"} spacing={1}   sx={{display:"flex",color:isActive?'#055E68':'inherit',transition:"all ease 400ms",justifyContents:"center",alignItems:"center"}} padding="0 1rem">
          {item?.icon} <Typography sx={{display:expand?'inline-block':'none',textAlign:"center"}} gutterBottom={false} >{item.linkName}</Typography>
        </Stack>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
