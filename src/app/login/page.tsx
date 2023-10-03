"use client";

import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import signIn from "next-auth";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormik } from "formik";
// HiOutlineEye,HiOutlineEyeOff
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import jwtDecode from "jwt-decode";
import { AuthContext } from "@/components/contexts/authContext";

const Login = () => {
  const intl = useIntl();
  const { initiateUserSession } = useContext(AuthContext);
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleOpenAlert } = useContext(SnackAlertContext);

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const router = useRouter();

  const [erros, setErros] = useState<{ email: string; password: string }>({
    email: intl.formatMessage({ id: "req-field" }),
    password: intl.formatMessage({ id: "req-field" }),
  });
  const handleChangeShowPassword = () => setshowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setWrongCredentials(false);
      // signIn("credentials",values)

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values?.email,
              password: values?.password,
            }),
          }
        );

        const data = await res.json();

        setIsLoading(false);
        initiateUserSession(data?.result?.accessToken);
        router.push("/timeline");
      } catch (error) {
        setWrongCredentials(true);

        handleOpenAlert("error", "network error");
        setIsLoading(false);

      }
    },
  });
  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        justifyContent:"center",

        alignItems: "center",
        // margin:"0 auto",
        height: "100svh",

      }}
    >
      <Box
        sx={{
          width: {xs:"62.5rem",sm:"70svw"},
          height:"80%",
          marginTop: "auto",
          maxWidth: "62.5rem",
          margin: "0 auto",
          borderRadius: "12px", 
          backgroundColor: "white",
          overFlow:"hidden",
       
          display: "flex",
          alignItems: "center",
        }}
        className="shadow-2xl"
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: "500px",
            borderRadius: "12px",
            height: "100%",
            backgroundColor: "#055E68",
            padding: "1rem 2rem",
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            gap: "1.5rem",
            color: "white",
          }}
        >
          <Divider flexItem sx={{ color: "white", margin: 0 }}>
            <h1 className="font-bold text-xl">New-vision</h1>
          </Divider>
          <Typography
            fontSize="15px"
            sx={{ opacity: 0.8, width: "100%", paging: 0, margin: 0 }}
          >
            Cotisation - Crédit - Rembourssement
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form
          className="h-full w-full  flex-1 box-border overflow-hidden"
          onSubmit={formik.handleSubmit}
        >
          <Stack
            direction="column"
            spacing={{ xs: 1 }}
            sx={{
              margin: "auto 0",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              boxSizing:"border-box",
            
              padding: "1rem 2rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // gap: {  sm: "1rem",lg:"2rem" },
                // marginBottom: "2rem",
              }}
            >
              <Image
                width={`${150}`}
                height={`${150}`}
                objectFit="cover"
                className="m-0 p-0 "
                src="logo.svg"
                alt="logo"
              />
              <h2 className="font-bold text-xl">
                <FormattedMessage id="welcome" />
              </h2>
            </Box>
            <p className="font-semibold opacity-80 text-sm">
              <FormattedMessage id="signin" />
            </p>
            {wrongCredentials && (
              <Alert severity="error" >
                <FormattedMessage id="wrong-cred" />
              </Alert>
            )}

            <TextField
              label="Email"
              id="outlined-size-small"
              size="small"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.values.email === ""}
              helperText={
                formik.touched.email &&
                formik.values.email === "" &&
                erros.email
              }
              placeholder=""
              fullWidth
              // sx={{ margin: "0.9rem  0" }}
            />
            <TextField
              label="Password"
              id="outlined-size-small"
              type={showPassword ? "text" : "password"}
              size="small"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.values.password === ""}
              helperText={
                formik.touched.password &&
                formik.values.password === "" &&
                erros.password
              }
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleChangeShowPassword}>
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </IconButton>
                ),
              }}
            />
            <Box sx={{ width: "100%" }}>
              <Button
                type="submit"
                disabled={
                  !formik.dirty ||
                  !Boolean(formik.values.email) ||
                  !Boolean(formik.values.password) ||
                  isLoading
                }
                variant="outlined"
                sx={{
                  borderColor: "#055E68",
                  color: "#055E68",
                  backgroundColor: "#055E68",
                  ":hover": {
                    color: "#055E68",
                    borderColor: "#055E68",
                  },
                }}
                fullWidth
              >
                <FormattedMessage id="login" />
              </Button>
              <Link href={"/"}>
                {" "}
                <small className="align-middle font-semibold opacity-75 hover:opacity-100 transition-all duration-500 underline">
                  <FormattedMessage id="oubli" />
                </small>
              </Link>

              <Stack
                direction={{xs:"column",sm:"column",md:"row"}}
                justifyContent="flex-end"
                spacing={{ xs: 1, sm: 2 }}
                
                // marginTop={{ xs: "1rem", sm: "2rem" }}
                alignItems={{xs:"flex-end",sm:"flex-end"}}
              >
                <Link href={"/timeline"} className="text-left text-sm sm:text-xs sm:font-semibold ">
                  <FormattedMessage id="noaccount" />
                </Link>
                <button className="w-fit rounded-md  bg-mainColor whitespace-nowrap text-white py font-bold px-4 hover:bg-inherit border border-md border-mainColor  transition-all duration-500 hover:text-mainColor ">
                  <FormattedMessage id="createAccount" />
                </button>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
