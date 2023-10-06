"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
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
    nom: string;
    prenom: string;
    contact: string;
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
  const [open, setOpen] = React.useState(false);

  console.log("report here:", row);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row?.membre?.nom}
        </StyledTableCell>
        <StyledTableCell align="right">{row?.membre?.prenom}</StyledTableCell>
        <StyledTableCell align="right">{row?.membre?.contact}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Rapport
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Montant cotisé</StyledTableCell>
                    <StyledTableCell>Montant en crédit</StyledTableCell>
                    <StyledTableCell align="right">
                      Montant à rembourssé
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Montant restant sur crédits
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Montant total à remboursser
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.montantCotise}
                    </StyledTableCell>
                    <StyledTableCell>{row.montantCredit}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.montantRemburse}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.montantRestantSurCredit}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.montantTotalARecevoir}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
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
              <StyledTableCell />
              <StyledTableCell>
                <FormattedMessage id="nom" />
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormattedMessage id="prenom" />
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormattedMessage id="contact" />
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {reports?.rapportResponses?.map(
              (
                row: IReportType & {
                  membre: {
                    nom: string;
                    prenom: string;
                    contact: string;
                  };
                }
              ) => (
                <Row key={row?.membre?.nom} row={row} />
              )
            )}
          </TableBody>
          <StyledTableRow>
            <StyledTableCell colSpan={3} />
            <StyledTableCell align="right" >
              {/* "montantDisponible": 0,
  "montantEndette": 0,
  "interet": 0, */}
              <Stack direction="row"  justifyContent="right">
                <Typography fontWeight="600" fontSize="0.9rem">montant en dette :</Typography>
                <Typography fontWeight="600" fontSize="0.9rem">{reports?.montantEndette}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="right">
                <Typography fontWeight="600" fontSize="0.9rem">montant disponible :</Typography>
                <Typography fontWeight="600" fontSize="0.9rem">{reports?.montantDisponible}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="right">
                <Typography fontWeight="600" fontSize="0.9rem">interet :</Typography>
                <Typography fontWeight="600" fontSize="0.9rem">{reports?.interet}</Typography>
              </Stack>
            </StyledTableCell>
          </StyledTableRow>
       
        </Table>
      </TableContainer>
    </>
  );
}
