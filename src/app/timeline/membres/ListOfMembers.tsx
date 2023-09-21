"use client";
import React, { useState,useContext } from "react";

import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/material/styles/styled";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import MemberHeader from "@/components/member/MemberHeader";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { HiOutlineArchive, HiOutlinePencil } from "react-icons/hi";
import CreateMember from "@/app/timeline/membres/CreateMember";
import { revalidateTag } from "next/cache";

import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";
import { MemberType } from "../../../../types";
import DeleteDialog from "@/components/common/DeleteDialogue";
import { AuthContext } from "@/components/contexts/authContext";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";

// import { notFound } from 'next/navigation'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "color",
    backgroundColor: "#b9cad2",
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
// const membersTest = [
//   {
//     id: 1,
//     nom: "string",
//     prenom: "string",
//     contact: "999342",
//     email: "string",
//     password: "string",
//     role: "ADMIN",
//   },
//   {
//     id: 2,
//     nom: "string",
//     prenom: "string",
//     contact: "999342",
//     email: "string",
//     password: "string",
//     role: "USER",
//   },
// ];
const ListOfMembers = ({ members }: ListOfMembersProps) => {

  const {handleOpenAlert} = useContext(SnackAlertContext)
  const {user} = useContext(AuthContext)
  


  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [member, setMember] = useState<MemberType>({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    password: "",
    role: "USER",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  const handleClear = () => setFilterValue("");
  const handleDeleteMember = (m: MemberType) => {
    if (m) setMember(m);
    setOpenDeleteModal((prev) => !prev);
  };
  const handleClickOpenCreateDialog = (member?: MemberType) => {
    setMember({
      id: "",
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      password: "",
      role: "USER",
    });
    if (member)
      setMember({
        nom: member.nom,
        prenom: member.prenom,
        contact: member.contact,
        id: member.id,
        email: member.email,
        password: member.password,
        role: member.role,
      });
    setOpen(true);
  };
  const handleOnDelete= ()=>{
    
    setDeleting(true)
    fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/membres/${member.id}`,{
        method:"DELETE",
        headers:{
          "Autorisation":`Bearer ${user.token}`
        }
      }).then((res)=>res.json())
      .then(res=>{

        console.log("res:",res.data)
        setDeleting(false)
        setOpenDeleteModal((prev) => !prev)
        revalidateTag("members");
        handleOpenAlert("succes",<FormattedMessage id="succes-del"/>)
      }).catch(error=>{
        setDeleting(false)
        console.log("error acure:",error)})
        handleOpenAlert("error",<FormattedMessage id="delet-failed"/>)

  }

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
                <StyledTableCell>
                  <FormattedMessage id="nom" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="prenom" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="contact" />
                </StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="center">role</StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="actions" />
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {/* {members?.result?.content?.map((m: MemberType) => {
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
                      <IconButton onClick={()=>handleClickOpenCreateDialog(m)}>
                        <HiOutlinePencil fontSize={20} color="black" />
                      </IconButton>
                      <IconButton>
                        <HiArchive fontSize={20} color="black" />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })} */}
              {members?.result?.content?.map((m: MemberType) => {
                return (
                  <StyledTableRow key={m.id}>
                    <StyledTableCell>{m?.nom}</StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.prenom}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">{m?.email}</StyledTableCell>
                    <StyledTableCell align="center">{m?.role}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          onClick={() => handleClickOpenCreateDialog(m)}
                        >
                          <HiOutlinePencil fontSize={17} />
                        </IconButton>
                        <IconButton
                          sx={{ ":hover": { color: "red" } }}
                          onClick={() => handleDeleteMember(m)}
                        >
                          <HiOutlineArchive fontSize={17} />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {!members?.result?.content  && (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} sx={{ textAlign: "center" }}>
                    <Typography fontSize="bold">
                      <FormattedMessage id="no-data-display" />
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={members?.result?.totalPages || 0}
          rowsPerPage={members?.result?.size || 0}
          page={members?.result?.number || 0}
          // onPageChange={handleChangePage}
          onPageChange={() => console.log("chanage page")}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          onRowsPerPageChange={() => console.log("chanage rows")}
        />
      </Box>
      <CreateMember member={member} open={open} setOpen={setOpen} />
      <DeleteDialog
        open={openDeleteModal}
        deleting={deleting}
        handleClose={() => setOpenDeleteModal((prev) => !prev)}
        handleDelete={ handleOnDelete}
      />
    </>
  );
};

export default ListOfMembers;
