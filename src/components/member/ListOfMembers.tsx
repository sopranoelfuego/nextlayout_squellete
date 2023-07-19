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
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { HiArchive, HiPencil } from "react-icons/hi";

export type MemberType = {
  nom: string;
  contact: string;
  email: string;
  password: string;
};
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
function ListOfMembers() {
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
            <StyledTableRow>
              <StyledTableCell>bunanme</StyledTableCell>
              <StyledTableCell align="center">kabura</StyledTableCell>
              <StyledTableCell align="center">contact</StyledTableCell>
              <StyledTableCell align="center">email@gmail.com</StyledTableCell>
              <StyledTableCell align="center">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton >
                    <HiPencil fontSize={20} color="black"/>
                  </IconButton>
                  <IconButton>
                    <HiArchive fontSize={20} color="black"/>
                  </IconButton>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListOfMembers;
