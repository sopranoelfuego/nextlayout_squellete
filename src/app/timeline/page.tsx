"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useIntl } from "react-intl";

interface ISumarize {
  id: number;
  title: string;
  number: number | string;
  date: string;
}
export default function Home() {
  const intl = useIntl();
  const sumarizes: ISumarize[] = [
    {
      id: 1,
      title: `${intl.formatMessage({ id: "member" })}`,
      number: 20,
      date: "01 janv 2019 - 01 Dec 2019",
    },
    {
      id: 2,
      title: `${intl.formatMessage({ id: "rembourssement" })}`,

      number: "2000 fbu",
      date: "01 janv 2019 - 01 Dec 2019",
    },
    {
      id: 3,
      title: `${intl.formatMessage({ id: "cotisation" })}`,

      number: "2000 fbu",
      date: "01 janv 2019 - 01 Dec 2019",
    },
    {
      id: 4,
      title: `${intl.formatMessage({ id: "credit" })}`,

      number: 2000,
      date: "01 janv 2019 - 01 Dec 2019",
    },
  ];
  return (
    <Box sx={{ minHeight: "100%" ,padding:{xs:"auto",sm:" 0 3rem"} }}>
      <Grid container justifyContent="center" marginTop={{xs:"0.5rem",sm:"1rem"}} spacing="1rem" >
        {sumarizes.map((s) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            key={s.id}
            sx={{
              borderLeftStyle: "solid",
              borderColor: "transparent",
              borderLeftColor: "white",
              borderWidth: "5px",
              padding: "1rem",
              justifySelf:{xs:"left",sm:"center"},
           
            }}
          >
            <Typography
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="800"
              letterSpacing="1px"
              sx={{ opacity: "0.6" }}
            >
              {s.title}
            </Typography>
            <Typography fontSize={{xs:"2rem",sm:"2.5rem"}} color="#055E68" fontWeight="bold" whiteSpace="nowrap">
              {s.number}
            </Typography>
            <Typography
              fontSize="12px"
              letterSpacing="1px"
              fontWeight="600"
              sx={{ opacity: "0.6" }}
            >
              {s.date}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box sx={{flexDirection:"column",display:"flex",backgroundColor:"white",width:"100%",minHeight:{xs:"30vh",sm:"49vh"},marginTop:"2rem",gap:{sx:"1rem",sm:"1.5rem"},borderRadius:"1px",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
            <Typography color="#055E68" fontWeight="bold" fontSize="28px"  sx={{'&::after':{
              content:'"ziganya"',
              color:"#055E68",
              opacity:"1"
            }}}> wellcome again to </Typography>
            <Typography maxWidth="40rem" width="100%" sx={{opacity:"0.7"}} fontWeight="600"  textAlign="center">
              we aim to change your daily life  with this cutting-edge app which will contributions to ease your life by ... 
            </Typography>
      </Box>
    </Box>
  );
}
