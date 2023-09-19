"use client";

import React, { useState,useContext } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import signIn from "next-auth"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormik } from "formik";
// HiOutlineEye,HiOutlineEyeOff
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation"
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import jwtDecode from "jwt-decode";
import { AuthContext } from "@/components/contexts/authContext";

const Login = () => {
  const intl = useIntl();
  const {initiateUserSession}=useContext(AuthContext)
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {handleOpenAlert} = useContext(SnackAlertContext)
  
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const router=useRouter()
  
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
      setIsLoading(true)
        setWrongCredentials(false)
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
        
        const data=await res.json()
       
        setIsLoading(false)
        initiateUserSession(data?.result?.accessToken)
        router.push('/timeline')
        
      } catch (error) {
        setWrongCredentials(true)
        
        handleOpenAlert("error","network error")
        setIsLoading(false)
        
        // console.log("error:", error);
      }
    },
  });
  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        height: "100svh",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          marginTop: "auto",
          maxWidth: "1000px",
          margin: "auto 0",
          borderRadius: "12px",
          backgroundColor: "white",
          minHeight: { xs: "100%", sm: "700px" },
          maxHeight: { xs: "100%", sm: "700px" },
          height: "100%",
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
            <h1 className="font-bold text-xl">New vision</h1>
          </Divider>
          <Typography
            fontSize="15px"
            sx={{ opacity: 0.8, width: "100%", paging: 0, margin: 0 }}
          >
            Cotisation - Crédit - Rembourssement
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <form className="h-full w-full minw flex-1" onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              margin: "auto 0",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              // minWidth:"500px",
              padding: "1rem 2rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: "1rem", sm: "2rem" },
                marginBottom: "2rem",
              }}
            >
              <Image
                width={`${200}`}
                height={`${200}`}
                objectFit="cover"
                // src={`data:image/png;base64,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`}
                src="logo.svg"
                alt="logo"
              />
              <h2 className="font-bold text-xl">Welcome to New vision plateform</h2>
            </Box>
            <p className="font-semibold opacity-80">
              Please login to your account
            </p>
            {wrongCredentials && <Alert severity="error"><FormattedMessage id="wrong-cred"/></Alert>}

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
              placeholder="eg:jhondoe@gmail.com"
              fullWidth
              sx={{ margin: "0.9rem  0" }}
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
              <Button type="submit"  disabled={!formik.dirty || !Boolean(formik.values.email) || !Boolean(formik.values.password) || isLoading } variant="outlined" sx={{borderColor:"#055E68",color:"#055E68",backgroundColor:"#055E68",':hover':{
                color:"#055E68",
                borderColor:"#055E68"
                
              }}}  fullWidth>
                <FormattedMessage id="login" />
              </Button>
             <Link href={"/"}  > <small className=" align-middle font-semibold opacity-75 hover:opacity-100 transition-all duration-500 underline">forget password</small></Link>
             
             
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={{ xs: 1, sm: 2 }}
                marginTop={{ xs: "1rem", sm: "2rem" }}
                alignItems="center"
              >
                <Link href={"/timeline"}>Don&#39;t have a account ?</Link>
                <button className="w-fit rounded-md  bg-mainColor whitespace-nowrap text-white py-1 font-bold px-9 hover:bg-inherit border border-md border-mainColor  transition-all duration-500 hover:text-mainColor ">
                  create one
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
