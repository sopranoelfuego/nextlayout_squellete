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
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

export default function GeneralSettings({
  settings,
}: {
  settings: ISettingType;
}) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: settings?.id || 0,
      montantParAction: settings.montantParAction,
      jourApresCotisation: settings.jourApresCotisation,
      dateDebutCycle: settings.dateDebutCycle ,
      dateFinCyle: settings.dateFinCyle,
      tauxInteret: settings.tauxInteret,
    },
    onSubmit: async (values, resetForm) => {
      // if (validationSchema()) await handleSubmit(values, resetForm);
    },
  });

  return (
    <form>
      <TableContainer component={Paper} sx={{ maxWidth: "100vh" }}>
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
                <FormattedMessage id="montantParAction" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  fullWidth
                  id="nom"
                  type="number"
                  {...formik.getFieldProps("montantParAction")}
                  // error={Boolean(errors.prenom)}
                  // helperText={formik.touched.prenom && errors.prenom}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="jourApresCotisation" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  fullWidth
                  id="nom"
                  type="number"
                  {...formik.getFieldProps("jourApresCotisation")}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="tauxInteret" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  fullWidth
                  id="nom"
                  type="number"
                  {...formik.getFieldProps("tauxInteret")}
                  // error={Boolean(errors.prenom)}
                  // helperText={formik.touched.prenom && errors.prenom}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="dateDebutCycle" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <DatePicker
                  sx={{ width: "100%" }}
                  // value={formik.values.dateDebutCycle}
                  // onChange={(newValue) =>
                  //   formik.setFieldValue("dateDebutCycle", newValue)
                  // }
                  defaultValue={dayjs(Date.now())}
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="dateFinCyle" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <DatePicker
                  sx={{ width: "100%" }}
                  // value={formik.values.dateFinCyle}
                  // onChange={(newValue) =>
                  //   formik.setFieldValue("dateFinCyle", newValue)
                  // }
                  defaultValue={dayjs(Date.now())}
                  
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell colSpan={2}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{ textAlign: "center" }}
                  variant="outlined"
                >
                  <FormattedMessage id="edit" />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
