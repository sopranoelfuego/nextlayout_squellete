"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { FormattedMessage, useIntl } from "react-intl";
import { Stack } from "@mui/material";
import { CotisationType, ICompteSettingType, ICreditType, IReimbourssementType } from "../../../types";

interface ISumarize {
  id: number;
  title: React.ReactNode;
  number: number | string;
  date: string;
}
interface IResume {
  MembreResponse: [];
  remboursementResponse: [];
  CreditResponse: [];
  cotisationResponse: [];
}

export default function DashBoard({ resumee }: { resumee: IResume }) {
  //   const { resumee } = await getData();
  const intl = useIntl();
  let sumarizes: ISumarize[] = [];
  if (resumee)
    sumarizes = [
      {
        id: 1,
        title: <FormattedMessage id="member" />,

        number: resumee.MembreResponse.length || 0,
        date: "01 janv 2019 - 01 Dec 2019",
      },
      {
        id: 2,

        title: <FormattedMessage id="rembourssement" />,

        number: resumee.remboursementResponse.length || 0,
        date: "01 janv 2019 - 01 Dec 2019",
      },

      {
        id: 3,

        title: <FormattedMessage id="cotisation" />,

        number: resumee.cotisationResponse.length || 0,

        date: "01 janv 2019 - 01 Dec 2019",
      },
      {
        id: 4,

        title: <FormattedMessage id="credit" />,

        number: resumee.CreditResponse.length || 0,

        date: "01 janv 2019 - 01 Dec 2019",
      },
    ];
  return (
    <Box sx={{ minHeight: "100%", padding: { xs: "auto", sm: " 0 3rem" } }}>
      <Grid
        container
        justifyContent="center"
        marginTop={{ xs: "0.5rem", sm: "1rem" }}
        spacing="1rem"
      >
      
        {/* ======================= RESUMER MEMBRE ======================== */}
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            borderLeftStyle: "solid",
            borderColor: "transparent",
            borderLeftColor: "white",
            display: "flex",
            flexDirection: "column",
            borderWidth: "5px",

            padding: "1rem",
            justifySelf: { xs: "left", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              fontSize={{ xs: "3rem", sm: "4rem" }}
              color="#055E68"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {resumee.MembreResponse.length}
            </Typography>
          </Box>
          <Typography
            fontSize="12px"
            textTransform="uppercase"
            fontWeight="800"
            letterSpacing="1px"
            sx={{ opacity: "0.6" }}
          >
            <FormattedMessage id="member" />
          </Typography>
        </Grid>

        {/* ======================= RESUMER COTISATION ======================== */}

        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            borderLeftStyle: "solid",
            borderColor: "transparent",
            borderLeftColor: "white",
            display: "flex",
            flexDirection: "column",
            borderWidth: "5px",

            padding: "1rem",
            justifySelf: { xs: "left", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"space-between" }}>
            <Typography
              fontSize={{ xs: "3rem", sm: "4rem" }}
              color="#055E68"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {resumee.cotisationResponse.length}
            </Typography>
            {/* ======= CHIPS ================= */}
            {resumee.cotisationResponse.length >0 ?(<Stack direction="column" spacing={1}>
              <Box sx={{ border: "1px #2d4f85 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#2d4f85"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.cotisationResponse.filter((c:CotisationType)=>c.etat === 0).length} - ${intl.formatMessage({ id: "en_attente" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #055E68 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#055E68"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.cotisationResponse.filter((c:CotisationType)=>c.etat === 1).length} - ${intl.formatMessage({ id: "valid" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #82472b solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#82472b"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.cotisationResponse.filter((c:CotisationType)=>c.etat === 2).length} - ${intl.formatMessage({ id: "rejet" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
            </Stack>):null}
          </Box>
          <Typography
            fontSize="12px"
            textTransform="uppercase"
            fontWeight="800"
            letterSpacing="1px"
            sx={{ opacity: "0.6" }}
          >
            <FormattedMessage id="cotisation" />
          </Typography>
        </Grid>
        {/* ======================= RESUMER CREDIT ======================== */}

        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            borderLeftStyle: "solid",
            borderColor: "transparent",
            borderLeftColor: "white",
            display: "flex",
            flexDirection: "column",
            borderWidth: "5px",

            padding: "1rem",
            justifySelf: { xs: "left", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"space-between" }}>
            <Typography
              fontSize={{ xs: "3rem", sm: "4rem" }}
              color="#055E68"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {resumee.CreditResponse.length}
            </Typography>
            {/* ======= CHIPS ================= */}
          {resumee.CreditResponse.length >0 ? ( <Stack direction="column" spacing={1}>
              <Box sx={{ border: "1px #2d4f85 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#2d4f85"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.CreditResponse.filter((c:ICreditType)=>c.etat === 0).length} - ${intl.formatMessage({ id: "en_attente" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #055E68 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#055E68"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.CreditResponse.filter((c:ICreditType)=>c.etat === 1).length} - ${intl.formatMessage({ id: "valid" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #82472b solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#82472b"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.CreditResponse.filter((c:ICreditType)=>c.etat === 2).length} - ${intl.formatMessage({ id: "rejet" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
            </Stack>):null}
          </Box>
          <Typography
            fontSize="12px"
            textTransform="uppercase"
            fontWeight="800"
            letterSpacing="1px"
            sx={{ opacity: "0.6" }}
          >
            <FormattedMessage id="credit" />
          </Typography>
        </Grid>
        {/* ======================= RESUMER REIMBOURSEMENT ======================== */}

        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          sx={{
            borderLeftStyle: "solid",
            borderColor: "transparent",
            borderLeftColor: "white",
            display: "flex",
            flexDirection: "column",
            borderWidth: "5px",

            padding: "1rem",
            justifySelf: { xs: "left", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"space-between" }}>
            <Typography
              fontSize={{ xs: "3rem", sm: "4rem" }}
              color="#055E68"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {resumee.remboursementResponse.length}
            </Typography>
            {/* ======= CHIPS ================= */}
            {resumee.remboursementResponse.length >0 ? (<Stack direction="column" spacing={1}>
              <Box sx={{ border: "1px #2d4f85 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#2d4f85"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.remboursementResponse.filter((c:IReimbourssementType)=>c.etat === 0).length} - ${intl.formatMessage({ id: "en_attente" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #055E68 solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#055E68"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.remboursementResponse.filter((c:IReimbourssementType)=>c.etat === 1).length} - ${intl.formatMessage({ id: "valid" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
              <Box sx={{ border: "1px #82472b solid", borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color="#82472b"
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {` ${resumee.remboursementResponse.filter((c:IReimbourssementType)=>c.etat === 2).length} - ${intl.formatMessage({ id: "rejet" })}`}
                    {/* {s.number} */}
                  </Typography>
                </Box>
            </Stack>):null}
          </Box>
          <Typography
            fontSize="12px"
            textTransform="uppercase"
            fontWeight="800"
            letterSpacing="1px"
            sx={{ opacity: "0.6" }}
          >
            <FormattedMessage id="rembourssement" />
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          backgroundColor: "white",
          width: "100%",
          minHeight: { xs: "20svh", sm: "30svh" },
          marginTop: "2rem",
          gap: { sx: "1rem", sm: "1.5rem" },
          borderRadius: "1px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          color="#055E68"
          fontWeight="bold"
          fontSize="1.5rem"
          sx={{
            "&::after": {
              content: '"ziganya"',
              color: "#055E68",
              opacity: "1",
            },
          }}
        >
          {" "}
          wellcome to{" "}
        </Typography>
        <Typography
          maxWidth="40rem"
          width="100%"
          sx={{ opacity: "0.7" }}
          fontWeight="600"
          fontSize="0.8rem"
          textAlign="center"
        >
         Cotisation - Crédit - Rembourssement
        </Typography>
      </Box>
    </Box>
  );
}
