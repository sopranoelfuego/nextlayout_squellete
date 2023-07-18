'use client'
import Box from "@mui/material/Box"
import { Button } from '@mui/material'
import MemberHeader from "@/components/member/MemberHeader"
import ListOfMembers from "@/components/member/ListOfMembers"

export default function Home() {
  return (
    <Box sx={{width:"100%"}}>
      <MemberHeader/>
      <ListOfMembers />

    </Box>
  )
}
