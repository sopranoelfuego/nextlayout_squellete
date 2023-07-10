import React from "react";
import SidebarItem from "./SidebarItem";
import Stack from "@mui/material/Stack";
import { sidebarData, SidebarItemType } from "./SidebarData";

function index() {
  return (
    <Stack minHeight="100vh" paddingTop="7rem">
      {sidebarData.map((data:SidebarItemType) => (
        <SidebarItem item={data} expand={true} key={data?.href} />
      ))}
    </Stack>
  );
}

export default index;
