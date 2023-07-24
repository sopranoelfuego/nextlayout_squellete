'use client'
import React,{useState} from "react"
import Box from "@mui/material/Box"
import MemberHeader from "@/components/member/MemberHeader"
import ListOfMembers from "@/components/member/ListOfMembers"
import CreateMember from "@/components/member/CreateMember"

export default function Home() {
  const[open,setOpen]=useState(false)
  const [filterValue, setFilterValue] = useState("")
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>setFilterValue(e.target.value)
  const handleClear=()=>setFilterValue("")
  return (
    <Box sx={{width:"100%"}}>
      <MemberHeader handleChange={handleChange} handleClear={handleClear} value={filterValue} setOpen={setOpen} />
      <ListOfMembers />
      <CreateMember open={open} setOpen={setOpen}/>

    </Box>
  )
}
