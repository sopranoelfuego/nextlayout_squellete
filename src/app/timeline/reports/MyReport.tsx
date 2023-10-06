"use client";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { IReportType, MemberType } from "../../../../types";
import {
  Autocomplete,
  InputLabel,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "@/components/contexts/authContext";

interface IOptionValue {
  id: string | number | undefined;
  title: string;
}

export default function MyReport({
  members,
  reports,
}: {
  members: any;
  reports: IReportType[];
}) {
  const [newValue, setNewValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [myReport, setMyReport] = useState<IReportType>({
    montantCotise: 0,
    montantCredit: 0,
    montantRemburse: 0,
    montantRestantSurCredit: 0,
    montantTotalARecevoir: 0,
    interet: 0,
  });
  const handleSearch = () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user")!);
    if (newValue !== 0) {
      const init = () => {
        fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/rapport/${newValue}`, {
          cache: "no-cache",
          next: {
            tags: ["rapport"],
          },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setMyReport({
              montantCotise: res?.montantCotise,
              montantCredit: res?.montantCredit,
              montantRemburse: res?.montantRemburse,
              montantRestantSurCredit: res?.montantRestantSurCredit,
              montantTotalARecevoir: res?.montantTotalARecevoir,
              interet: res?.interet,
            });
            setLoading(false);
          })
          .catch((error: Error) => setLoading(false));
      };
      init();
    }
  };

  //      montantCotise: number,
  //   montantCredit: number,
  //   montantRemburse: number,
  //   montantRestantSurCredit: number,
  //   montantTotalARecevoir: number,
  //   interet: number
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "1rem", sm: "2rem" },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="flex-start"
        justifyContent="center"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ width: "100%" }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          <FormattedMessage id="single_member" />
        </InputLabel>

        <Autocomplete
          disablePortal
          // loading={creating}
          id="combo-box-demo"
          size="small"
          // {...formik.getFieldProps("memberId")}
          options={members?.result?.content?.map((res: MemberType) => ({
            id: res.id,
            title: `${res.nom}` + " " + `${res.prenom}`,
          }))}
          getOptionLabel={(option) => option.title}
          sx={{
            Maxwidth: 300,
            minWidth: 200,
            width: { xs: "100%", sm: "auto" },
          }}
          onChange={(e: any, newValue: IOptionValue | null) => {
            //   formik.setFieldValue("membreId", newValue.id);
            // @ts-ignore
            setNewValue(newValue?.id!);
            // handleChangeMember(newValue?.id!);
          }}
          aria-required
          renderInput={(params) => (
            <TextField {...params} fullWidth size="small" />
          )}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleSearch}
          disabled={newValue === 0}
        >
          submit
        </Button>
      </Stack>

      {newValue ? (
        <Box
          maxWidth="100rem"
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            width: { xs: "100%", sm: "40rem" },
            minWidth: { xs: "100%", sm: "30rem" },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fex-end", sm: "center" }}
          >
            <Typography fontWeight={600}>montant cotisé:</Typography>
            <Typography fontWeight={700}>
              {myReport?.montantCotise} fbu
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fex-end", sm: "center" }}
          >
            <Typography color="#252528">montant credit:</Typography>
            <Typography fontWeight={700}>
              {myReport?.montantCredit} fbu
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fex-end", sm: "center" }}
          >
            <Typography color="#252528">montant montantRemburse:</Typography>
            <Typography fontWeight={700}>
              {myReport?.montantRemburse} fbu
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fex-end", sm: "center" }}
          >
            <Typography color="#252528">
              montant montant Restant sur Crédit:
            </Typography>
            <Typography fontWeight={700}>
              {myReport?.montantRestantSurCredit} fbu
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fex-end", sm: "center" }}
          >
            <Typography color="#252528">interet:</Typography>
            <Typography fontWeight={700}>
              {myReport?.montantRestantSurCredit} fbu
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Typography color="#252528">
              montant montant total a recevoir:
            </Typography>
            <Typography fontWeight={700} color="green">
              {myReport?.montantRestantSurCredit} fbu
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          veuillez choisir le membere a calculer et{" "}
          <strong>cliquer sur submit</strong>
        </Alert>
      )}
    </Box>
  );
}
