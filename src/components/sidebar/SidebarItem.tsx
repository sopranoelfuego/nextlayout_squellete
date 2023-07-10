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
        <Stack direction="row" alignItems="center"   columnGap="0.6rem" sx={{backgroundColor:isActive?'green':'inherit'}} padding="0.4rem 1rem">
          {item?.icon} <Typography sx={{visibility:expand?'visible':'hidden'}} paragraph>{item.linkName}</Typography>
        </Stack>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
