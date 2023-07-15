"use client"
import React, { useContext } from "react";
import SidebarItem from "./SidebarItem";
import Stack from "@mui/material/Stack";
import { sidebarData, SidebarItemType } from "./SidebarData";
import { Avatar, Badge, Box, Button, IconButton, Typography } from "@mui/material";
import { HiLogout, HiMenu,HiChevronRight } from "react-icons/hi";
import Image from "next/image";
import  { ExpandContext } from "../contexts/expandNavBarContext";

/* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */

function Sidebar() {

  const{setExpand,expand} =useContext(ExpandContext)
  console.log("expand:",expand)
  return (
    <Stack
      width={expand?"250px":"90px"}
      minHeight="100vh"
      
      maxWidth="20rem"
      boxSizing="border-box"
  
      spacing={{ xs: 1, sm: 2 }}
      direction="column"
      justifyContent="space-between"
      position="sticky"
      top="0"
      left="0"
     
      
      alignItems="center"
      // padding="1rem "
      sx={{ backgroundColor: "#fff",boxShadow:"0 0 2px rgba(0,0,0,0.2)", transition:"all ease 400ms" }}
      display="flex"
    >
      <Box sx={{width:"100%",minHeight:"700px"}}>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          position="relative"
          alignItems="center"
          padding="2rem 0 0 1rem "

          width="100%"
          marginBottom="2rem"
        
          
        >
          <Image width={`${45}`} height={`${45}`}  objectFit="cover" src={`data:image/png;base64,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`} alt="logo" />
            <Typography sx={{fontWeight:"500",visibility:expand?"visible":"hidden"}}>Eric mugabekazi</Typography>
            <Box onClick={()=>setExpand()} sx={{position:"absolute",right:"-20px",transition:"all ease 400ms",top:"50%",padding:"7px",borderRadius:"20px" ,backgroundColor:"#055E68",color:"#fff",':hover':{
              color:"black",
              cursor:"pointer"
            }}}>

                <HiChevronRight size={25} />
            </Box>
        </Stack>
      
        {sidebarData.map((data: SidebarItemType) => (
          <SidebarItem item={data} expand={expand} key={data?.href} />
        ))}
      </Box>

      <Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<HiLogout size={23} />}
        >
          disconect
        </Button>
      </Box>
    </Stack>
  );
}

export default Sidebar;
