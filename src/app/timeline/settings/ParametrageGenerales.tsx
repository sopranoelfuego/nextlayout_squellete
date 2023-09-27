"use client";
import { useContext, useState } from "react";
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
import TextField  from "@mui/material/TextField";
import CircularProgress  from "@mui/material/CircularProgress";
import { useFormik, FormikHelpers } from "formik";
import { AuthContext } from "@/components/contexts/authContext";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import { useRouter } from "next/navigation";

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

  const { user } = useContext(AuthContext);
  const { handleOpenAlert } = useContext(SnackAlertContext);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    values: typeof settings,
    resetForm: FormikHelpers<{
      id: number | string;
      montantParAction: number;
      jourApresCotisation: number;
      dateDebutCycle: Date;
      dateFinCyle: Date;
      tauxInteret: number;
    }>
  ) => {
    let res: any = "";

    setCreating(true);
    try {
      res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/params`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });

      await res.json();
      setCreating(false);
      resetForm.resetForm();

      settings.id
        ? handleOpenAlert("success", <FormattedMessage id="edit-succ" />)
        : handleOpenAlert("success", <FormattedMessage id="create-succ" />);

      router.push("/timeline/settings?tab=0");
    } catch (error) {
      setCreating(false);
      handleOpenAlert("error", <FormattedMessage id="operation-failed" />);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: settings?.id || 0,
      montantParAction: settings.montantParAction,
      jourApresCotisation: settings.jourApresCotisation,
      dateDebutCycle: settings.dateDebutCycle,
      dateFinCyle: settings.dateFinCyle,
      tauxInteret: settings.tauxInteret,
    },
    onSubmit: async (values, resetForm) => {
      await handleSubmit(values, resetForm);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
                  id="montantParAction"
                  type="number"
                  {...formik.getFieldProps("montantParAction")}
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
                  id="jourApresCotisation"
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
                  id="tauxInteret"
                  type="number"
                  {...formik.getFieldProps("tauxInteret")}
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="dateDebutCycle" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  id="dateDebutCycle"
                  fullWidth
                  type="date"
                  size="small"
                  {...formik.getFieldProps("dateDebutCycle")}
                  variant="outlined"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                <FormattedMessage id="dateFinCyle" />
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  id="dateFinCyle"
                  fullWidth
                  type="date"
                  size="small"
                  {...formik.getFieldProps("dateFinCyle")}
                  variant="outlined"
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
                  disabled={!formik.dirty || creating}
                >
                  {
                    creating?<CircularProgress size={20} color="inherit" />:<FormattedMessage id="edit" />
                  }
                  
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
