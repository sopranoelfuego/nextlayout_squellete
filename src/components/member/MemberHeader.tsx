import React from "react";
import { Box } from "@mui/material";
import { HiOutlineSearch, HiOutlineUserAdd } from "react-icons/hi";

 type AppProps={
setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
function MemberHeader({setOpen}:AppProps) {
  return (
    <Box
      sx={{
        backgroundColor: `background.paper`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection:{xs:"column",sm:"row"},
        justifyContent: "flex-end",
        padding: "1rem 0.3rem",
        gap:"10px"
      }}
    >
      <Box
          sx={{
            display: "flex",
            width: {xs:"100%",sm:"400px"},
            borderRadius: "10px",
            backgroundColor: "#eef5f3",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            style={{
              outline: "none",
              backgroundColor: "transparent",
              flex: "1",
              padding: "0.5rem",
              height: "40px",
            }}
          />
          <HiOutlineSearch fontSize={20} />
        </Box>
        {/* CREATE NEW MEMBER BOTTOM */}
     
        <button onClick={()=>setOpen(prev=>!prev)}  className="py-2  hover:border-mainColor  opacity-75 hover:opacity-100 px-3 bg-mainColor rounded text-white flex items-center justify-center gap-1 sm:w-full md:w-auto  font-medium transition-all  ">
         <HiOutlineUserAdd fontSize={16} />  cree un membre
        </button>
    </Box>
  );
}

export default MemberHeader;
