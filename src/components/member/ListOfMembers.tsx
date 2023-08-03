import React from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  TableBody,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { HiArchive, HiPencil } from "react-icons/hi";
import { MemberType } from "@/types";
// import { notFound } from 'next/navigation'

export  const loadMembers=async()=>{
  const res=await fetch('http://192.168.40.75:8081/gp-com/api/v1/membres?page=0&size=10&direction=ASC&sortBy=nom')
  // if(!res.ok)throw new Error('Failed to fetch res')
  // if(res.status === 401){

  //   notFound()
  // }
  if(!res.ok)
  return alert(`alert type:${res?.type}`)

  return res.json()
  // return []
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "white",
    backgroundColor: "#055E68",
    fontSize: 14,
    fontWeight: "bold",
    border: "0.5px solid #fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "0.5px solid #ccc",
  },

  [`&.${tableCellClasses.footer}`]: {
    fontSize: 16,
    fontWeight: "700",
    border: "0.5px solid #ccc",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    borderRight: "0.5px solid #ccc",
  },
}));


// { members }: { members: MemberType[] }
interface ListOfMembersProps {
  listOfMembers: MemberType[];
  handleClickOpenCreateDialog: (member: MemberType) => void;
}




 const ListOfMembers=async({
  listOfMembers,
  handleClickOpenCreateDialog,
}: ListOfMembersProps) =>{
  const members=await loadMembers()
  return (
    <Box
      sx={{
        backgroundColor: `background.paper`,
        height: "100%",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>nom</StyledTableCell>
              <StyledTableCell align="center">prenom</StyledTableCell>
              <StyledTableCell align="center">contact</StyledTableCell>
              <StyledTableCell align="center">email</StyledTableCell>
              <StyledTableCell align="center">actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {members?.result?.content?.map((m: MemberType) => {
              return (
                <StyledTableRow key={m.id}>
                  <StyledTableCell>{m?.nom}</StyledTableCell>
                  <StyledTableCell align="center">{m?.prenom}</StyledTableCell>
                  <StyledTableCell align="center">{m?.contact}</StyledTableCell>
                  <StyledTableCell align="center">{m?.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2 }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton>
                        <HiPencil fontSize={20} color="black" />
                      </IconButton>
                      <IconButton>
                        <HiArchive fontSize={20} color="black" />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            {members?.result?.content === 0 && (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={5}
                  sx={{ textAlign: "center"}}
                >
                  <Typography fontSize="bold">pas de donner</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListOfMembers;
