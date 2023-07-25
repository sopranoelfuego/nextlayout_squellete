"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import MemberHeader from "@/components/member/MemberHeader";
import ListOfMembers from "@/components/member/ListOfMembers";
import CreateMember from "@/components/member/CreateMember";
import { MemberType } from "@/types";


export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [member, setMember] = useState({
    id: "",
    nom: "",
    email: "",
    contact: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  const handleClear = () => setFilterValue("");
  const [members, setMembers] = useState<MemberType[]>([])
  const handleClickOpenCreateDialog = (member?:MemberType) => {
    if(member)
    setMember(()=>member)
    setOpen(true)
  };
  return (
    <Box sx={{ width: "100%" }}>
      <MemberHeader
        handleChange={handleChange}
        handleClear={handleClear}
        value={filterValue}
        handleClickOpenCreateDialog={handleClickOpenCreateDialog}
      />
      <ListOfMembers listOfMembers={members} handleClickOpenCreateDialog={handleClickOpenCreateDialog} />
      <CreateMember open={open} setOpen={setOpen} />
    </Box>
  );
}
