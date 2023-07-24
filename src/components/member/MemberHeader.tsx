import React from "react";
import { Box } from "@mui/material";
import { HiOutlineUserAdd, HiOutlineRefresh } from "react-icons/hi";
import InputSearchComponent from "../common/InputSearchComponent";

type AppProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClear: () => void;
};
function MemberHeader({ setOpen, value, handleChange, handleClear }: AppProps) {
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

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="py-2 border-mainColor border-solid border bg-white  opacity-75 hover:opacity-100 px-3  rounded text-mainColor flex items-center justify-center gap-1 sm:w-full md:w-auto  font-medium transition-all  "
      >
        <HiOutlineRefresh fontSize={16} /> actualiser
      </button>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="py-2  hover:border-mainColor  opacity-75 hover:opacity-100 px-3 bg-mainColor rounded text-white flex items-center justify-center gap-1 sm:min-w-fit md:w-auto  font-medium transition-all  "
      >
        <HiOutlineUserAdd fontSize={16} /> cree un membre
      </button>
    </Box>
  );
}

export default MemberHeader;
