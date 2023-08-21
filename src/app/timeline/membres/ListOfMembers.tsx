'use client'
import React,{useState} from "react";


import Box from "@mui/material/Box"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import styled from "@mui/material/styles/styled"
import tableCellClasses from "@mui/material/TableCell/tableCellClasses"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import TableBody from "@mui/material/TableBody"
import MemberHeader from "@/components/member/MemberHeader";
import TablePagination from '@mui/material/TablePagination';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { HiArchive, HiPencil } from "react-icons/hi";
import { MemberType } from "@/types";
import CreateMember from "@/app/timeline/membres/CreateMember";
import { useRouter } from "next/navigation";



// import { notFound } from 'next/navigation'


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
  members: any;
}

const ListOfMembers = ({
  members,
}: ListOfMembersProps) => {
   const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const router=useRouter()
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
  const handleClickOpenCreateDialog = (member?:MemberType) => {
    if(member)
    setMember(()=>member)
    setOpen(true)
  };

  return (
    <>
     <MemberHeader

        handleChange={handleChange}
        handleClear={handleClear}
        value={filterValue}
        handleClickOpenCreateDialog={handleClickOpenCreateDialog}
      />
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
                <StyledTableCell colSpan={5} sx={{ textAlign: "center" }}>
                  <Typography fontSize="bold">pas de donner</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
              <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={members?.result?.totalPages}
          rowsPerPage={members?.result?.size}
          page={members?.result?.number}
          // onPageChange={handleChangePage}
          onPageChange={()=>console.log("chanage page")}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          onRowsPerPageChange={()=>console.log("chanage rows")}
        />

    </Box>
      <CreateMember open={open} setOpen={setOpen} />

        </>
  );
};

export default ListOfMembers;
