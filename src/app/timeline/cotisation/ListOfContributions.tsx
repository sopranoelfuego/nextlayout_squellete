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
import { HiArchive, HiPencil } from "react-icons/hi";
import CreateMember from "@/app/timeline/membres/CreateMember";
import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";
import { CotisationType } from "../../../../types";
import ContibutionHeader from "./ContributionHeader";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { HiSearch } from "react-icons/hi";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import CreateContribution from "./CreateContribution";

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

interface ListOfContributionsProps {
  contributions: any;
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
const ListOfContributions = ({ contributions }: ListOfContributionsProps) => {
  console.log("contrubitions:", contributions);

  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [contribution, setContribution] = useState<CotisationType>({
    id: "",
    montant: 0,
    codeTransaction: "",
    dateCotisation: "",
    membreId: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  const handleClear = () => setFilterValue("");
  const handleClickOpenCreateDialog = (contribution?: CotisationType) => {
    console.log("contibution:",contribution)
    setContribution({
      id: "",
      montant: 0,
      codeTransaction: "",
      dateCotisation: "",
      membreId: "",
    });
    if (contribution)
      setContribution({
        montant: contribution.montant,
        codeTransaction: contribution.codeTransaction,
        dateCotisation: contribution.dateCotisation,
        id: contribution.id,
        membreId: contribution?.membre?.id!,
      });
    setOpen(true);
  };

  return (
    <>
      <ContibutionHeader
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
                  <FormattedMessage id="trans-code" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="dateCotisation" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="actions" />
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {contributions?.result?.map((m: CotisationType) => {
                return (
                  <StyledTableRow key={m.id}>
                    <StyledTableCell>{m?.membre?.fullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.montant}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.codeTransaction}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.dateCotisation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2 }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          onClick={() => handleClickOpenCreateDialog(m)}
                        >
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
              {!contributions?.result?.content && (
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
          count={contributions?.result?.totalPages || 0}
          rowsPerPage={contributions?.result?.size || 0}
          page={contributions?.result?.number || 0}
          // onPageChange={handleChangePage}
          onPageChange={() => console.log("chanage page")}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          onRowsPerPageChange={() => console.log("chanage rows")}
        />
      </Box>
      <CreateContribution
        cotisation={contribution}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ListOfContributions;
