"use client";
import React, { useState } from "react";

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
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import {  HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

import { FormattedMessage } from "react-intl";
import { ICreditType} from "../../../../types";
import CreditHeader from "./CreditHeader";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { HiSearch } from "react-icons/hi";

import CreateCredit from "./CreateCredit";
import { Tooltip } from "@mui/material";

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

interface ListOfCreditsProps {
  credits: any;
}
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
const ListOfCredits = ({ credits }: ListOfCreditsProps) => {
  console.log("contrubitions:", credits);

  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [credit, setCredit] = useState<ICreditType>({
    id: "",
    montant: 0,
    motif:"",
    membreId: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  const handleClear = () => setFilterValue("");
  const handleClickOpenCreateDialog = (credit?: ICreditType) => {
    console.log("contibution:",credit)
    setCredit({
      id: "",
      montant: 0,
    motif:"",
      membreId: 0,
    })
    if (credit)
      setCredit({
        montant: credit.montant,
        motif: credit.motif,
        id: credit.id,
        membreId: credit?.membre?.id!,
      });
    setOpen(true);
  };

  return (
    <>
      <CreditHeader
        // handleChange={handleChange}
        // handleClear={handleClear}
        // value={filterValue}
        handleClickOpenCreateDialog={handleClickOpenCreateDialog}
      />

      <Grid
        container
        spacing={1}
        justifyContent={{ xs: "flex-end", md: "flex-end", lg: "center" }}
        sx={{
          marginY:"0.5rem",
          backgroundColor:"white",
          width:"100%"
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography fontWeight="600" color="#252528">
            <FormattedMessage id="single_member" />
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              Maxwidth: 300,
              minWidth: 200,
              width: { xs: "100%", sm: "auto" },
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography fontWeight="600" color="#252528">
            <FormattedMessage id="Du" />
          </Typography>
          <TextField
            id="du"
            fullWidth
            type="date"
            size="small"
            // {...formik.getFieldProps("dateDebutCycle")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography fontWeight="600" color="#252528">
            <FormattedMessage id="Au" />
          </Typography>
          <TextField
            id="au"
            fullWidth
            type="date"
            size="small"
            // {...formik.getFieldProps("dateDebutCycle")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <button className="py-2  w-full mt-4  border-mainColor border-solid border bg-white hover:bg-mainColor hover:text-white  opacity-75 hover:opacity-100 px-3  rounded text-mainColor flex items-center justify-center gap-1    font-semibold transition-all  ">
            <HiSearch fontSize={18} /> <FormattedMessage id="search" />
          </button>
        </Grid>
      </Grid>
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
 
                  <FormattedMessage id="single_member" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="montant" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="motif" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="status" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="dateCredit" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="actions" />
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {credits?.result?.map((m: ICreditType) => {
           
                return (
                  <StyledTableRow key={m.id}>
                    <StyledTableCell>{m?.membre?.fullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.montant}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.motif}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.dateCredit}
                    </StyledTableCell>
                  
                    <StyledTableCell align="center">

                         <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Tooltip title="edit">

                        <IconButton
                          onClick={() => handleClickOpenCreateDialog(m)}
                        >
                          <HiOutlinePencil fontSize={17} />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">

                        <IconButton
                          sx={{color:"red" }}
                        //   onClick={() => handleDeleteMember(m)}
                        >
                          <HiOutlineTrash fontSize={17} />
                        </IconButton>
                        </Tooltip>
                      </Stack>
                    
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {!credits?.result && (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} sx={{ textAlign: "center" }}>
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
          count={credits?.result?.totalPages || 0}
          rowsPerPage={credits?.result?.size || 0}
          page={credits?.result?.number || 0}
          // onPageChange={handleChangePage}
          onPageChange={() => console.log("chanage page")}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          onRowsPerPageChange={() => console.log("chanage rows")}
        />
      </Box>
      <CreateCredit
        credit={credit}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ListOfCredits;
