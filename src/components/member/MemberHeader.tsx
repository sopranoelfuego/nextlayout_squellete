import { Box, Button } from "@mui/material";
import React from "react";
import { HiOutlineSearch, HiOutlineUserAdd } from "react-icons/hi";

function MemberHeader() {
  return (
    <Box
      sx={{
        backgroundColor: `background.paper`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "1.8rem 0.3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"red"
        }}
      >
        {/* SEARCH INPUT */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            
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
        <Button
        variant="contained"
          sx={{
            display: "flex",
            padding: "10px 20px ",
            alignItems: "center",
            gap: "6px",
            justifyContent: "center",
            backgroundColor: "#055E68",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          <HiOutlineUserAdd fontSize={20} /> cree saaa
        </Button>
      </Box>
    </Box>
  );
}

export default MemberHeader;
