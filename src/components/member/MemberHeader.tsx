import { Box, Button } from "@mui/material";
import React from "react";
import { HiOutlineSearch, HiOutlineUserAdd } from "react-icons/hi";
import {styled} from "@mui/material/styles"

const CustumBtton=styled(Button)(()=>({
  color:"#055E68",
  
  transition:"all ease 400ms",
  ':hover':{
    color:"#fff",
  backgroundColor:"#055E68",


  }
}))
function MemberHeader() {
  return (
    <Box
      sx={{
        backgroundColor: `background.paper`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "1rem 0.3rem",
        gap:"10px"
      }}
    >
      <Box
          sx={{
            display: "flex",
            width: "400px",
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
        {/* <button
          className="buttonClass"
        >
          <HiOutlineUserAdd fontSize={16} /> <p >cree sasa</p>
        </button> */}
        <CustumBtton variant="contained"  startIcon={<HiOutlineUserAdd fontSize={16} /> }>
          cree un membre
        </CustumBtton>
    </Box>
  );
}

export default MemberHeader;
