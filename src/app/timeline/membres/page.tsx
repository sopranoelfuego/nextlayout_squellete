import React from "react";
// import Box from "@mui/material/Box";
import ListOfMembers from "@/app/timeline/membres/ListOfMembers";
import { MemberType } from "@/types";

interface ListOfMembersProps {
  members: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

const loadMembers=async()=>{
  try{
   const res=await fetch('http://192.168.40.79:8081/gp-com/api/v1/membres?page=0&size=10&direction=ASC&sortBy=nom')
  if(!res.ok)throw Error("Failed to fetch")
  return res.json()

 }catch(err){
   throw new Error("Error accure")
 }
}

export  default async function Home() {
  const members:ListOfMembersProps=await loadMembers()
  
  // const [open, setOpen] = useState<boolean>(false);
  // const [member, setMember] = useState({
  //   id: "",
  //   nom: "",
  //   email: "",
  //   contact: "",
  //   password: "",
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setFilterValue(e.target.value);
  // // const handleClear = () => setFilterValue("");
  // const [members, setMembers] = useState([])
  // const handleClickOpenCreateDialog = (member?:MemberType) => {
  //   if(member)
  //   setMember(()=>member)
  //   setOpen(true)
  // };
  return (
    // <Box sx={{ width: "100%" }}>
     
      <ListOfMembers members={members} />
     
    // </Box>
  );
}
