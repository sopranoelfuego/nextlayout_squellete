"use client";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/material/styles/styled";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import Button from "@mui/material/Button";

import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { ISettingType } from "../../../../types";
import { FormattedMessage } from "react-intl";
import { TextField } from "@mui/material";

import { ICompteSettingType } from "../../../../types";
import Settings from "./settingsEntry";

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

export default function ParametrageComptes({
  comptes,
}: {
  comptes: ICompteSettingType;
}) {
 

  return (
    <form>
      <TableContainer component={Paper} sx={{ maxWidth: "100vh",width:"100%" }}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="parametre" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <FormattedMessage id="actions" />
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="montantActuelle" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                disabled
                  fullWidth
                  id="nom"
                  type="number"
                  value={comptes.montantActuelle}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="montantEndette" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                disabled
                  fullWidth
                  id="nom"
                  type="number"
                  value={comptes.montantEndette}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="interet" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                disabled
                  fullWidth
                  id="nom"
                  type="number"
                  value={comptes.interet}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
