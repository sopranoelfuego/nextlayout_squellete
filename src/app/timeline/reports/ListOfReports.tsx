"use client";
import * as React from "react";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FormattedMessage } from "react-intl";
import { IReportType } from "../../../../types";
import styled from "@mui/material/styles/styled";
import { HiOutlinePrinter } from "react-icons/hi";
import { Stack } from "@mui/material";

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

function createData(
  membre: {
    fullName: string;
  },
  montantCotise: number,
  montantCredit: number,
  montantRemburse: number,
  montantRestantSurCredit: number,
  montantTotalARecevoir: number,
  interet: number
) {
  return {
    membre,
    montantCotise,
    montantCredit,
    montantRemburse,
    montantRestantSurCredit,
    montantTotalARecevoir,
    interet,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" align="left">
          {row?.membre?.fullName}
        </StyledTableCell>

        <StyledTableCell align="right">{row.montantCotise}</StyledTableCell>
        <StyledTableCell align="right">{row.montantCredit}</StyledTableCell>
        <StyledTableCell align="right">{row.montantRemburse}</StyledTableCell>
        <StyledTableCell align="right">
          {row.montantRestantSurCredit}
        </StyledTableCell>
        <StyledTableCell align="right">{row.interet}</StyledTableCell>
        <StyledTableCell align="right">
          {row.montantTotalARecevoir}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
export default function ListOfReports({ reports }: { reports: any }) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small">reload</Button>
        <Button size="small" startIcon={<HiOutlinePrinter />}>
          print
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">
                <FormattedMessage id="single_member" />
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="prenom" /> */}
                Montant cotisé
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="contact" /> */}
                Montant en crédit
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="contact" /> */}
                Montant à rembourssé
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="contact" /> */}
                Montant restant sur crédits
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="contact" /> */}
                interet
              </StyledTableCell>
              <StyledTableCell align="right">
                {/* <FormattedMessage id="contact" /> */}
                montant total à recevoir
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {reports?.rapportResponses?.map(
              (
                row: IReportType & {
                  membre: {
                    fullName: string;
                  };
                }
              ) => (
                <Row key={row?.membre?.fullName} row={row} />
              )
            )}
          </TableBody>
          <StyledTableRow>
            <StyledTableCell colSpan={6} />
            <StyledTableCell align="right">
              {/* "montantDisponible": 0,
  "montantEndette": 0,
  "interet": 0, */}
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600" fontSize="0.9rem">
                  En dette :
                </Typography>
                <Typography fontWeight="600" fontSize="0.9rem">
                  {reports?.montantEndette}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600" fontSize="0.9rem">
                  Disponible :
                </Typography>
                <Typography fontWeight="600" fontSize="0.9rem">
                  {reports?.montantDisponible}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600" fontSize="0.9rem">
                  interet :
                </Typography>
                <Typography fontWeight="600" fontSize="0.9rem">
                  {reports?.interet}
                </Typography>
              </Stack>
            </StyledTableCell>
          </StyledTableRow>
        </Table>
      </TableContainer>
    </>
  );
}
