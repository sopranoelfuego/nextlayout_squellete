import React from "react";
import { Box } from "@mui/material";
import { HiOutlineUserAdd, HiOutlineRefresh } from "react-icons/hi";
import InputSearchComponent from "../common/InputSearchComponent";

type AppProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickOpenCreateDialog: ()=>void;
  handleClear: () => void;
};
function MemberHeader({ handleClickOpenCreateDialog, value, handleChange, handleClear }: AppProps) {
  return (
    <Box
      sx={{
        backgroundColor: `background.paper`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "flex-end",
        padding: "1rem 0.3rem",

        gap: "10px",
      }}
    >
      <InputSearchComponent
        handleClear={handleClear}
        value={value}
        handleChange={handleChange}
      />
      {/* CREATE NEW MEMBER BOTTOM */}
      <Box sx={{display:"flex",justifyContents:"center",alignItems:"center",flexDirection:{xs:"column",sm:"row"},width:{xs:"100%",sm:"auto"},gap:{xs:1,sm:2}}}>
        <button
          onClick={() => handleClickOpenCreateDialog()}
          className="py-2 border-mainColor border-solid border bg-white  opacity-75 hover:opacity-100 px-3  rounded text-mainColor flex items-center justify-center gap-1 w-full  font-medium transition-all  "
        >
          <HiOutlineRefresh fontSize={16} /> actualiser
        </button>
        <button
          onClick={() => handleClickOpenCreateDialog()}
          className="py-2  hover:border-mainColor whitespace-nowrap  opacity-75 hover:opacity-100 px-3 bg-mainColor rounded text-white flex items-center justify-center gap-1 w-full  font-medium transition-all  "
        >
          <HiOutlineUserAdd fontSize={16} /> nouveau membre
        </button>
      </Box>
    </Box>
  );
}

export default MemberHeader;
