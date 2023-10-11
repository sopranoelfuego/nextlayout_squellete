"use cllient";

import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { AuthContext } from "@/components/contexts/authContext";
import { FormattedMessage } from "react-intl";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";

export default function UserInfo() {
  const { user } = useContext(AuthContext);
  const { handleOpenAlert } = useContext(SnackAlertContext);
  const [currentUser, setcurrentUser] = useState({
    id: "",
    contact: "",
    nom: "",
    prenom: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    let unSubscriber = true;
    const init = () => {
      if (user && unSubscriber)
        fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/membres/by-id/${user?.id}`)
          .then((res) => res.json())
          .then((res) => {
            setcurrentUser({
              id: res?.result?.id,
              contact: res?.result?.contact,
              nom: res?.result?.nom,
              prenom: res?.result?.prenom,
              email: res?.result?.email,
              role: res?.result?.role,
            });
          })
          .catch((err) => handleOpenAlert("error", err?.message));
    };
    init();
    return () => {
      unSubscriber = false;
    };
  }, [user, handleOpenAlert]);
  return (
    <Stack
      className="bg-white  w-full sm:w-1/4 box-border"
      justifyContent="center"
      alignItems="center"
    >
      <Image width={200} height={200} src="/user.svg" alt="profileImage" />
      {/* ============== USER INFO HERE ========= */}
      <Stack className="text-center">
        <Typography fontSize="1rem" fontWeight="800">
          {currentUser.nom + " " + currentUser.prenom}
        </Typography>
        <Typography
          fontSize="0.8rem"
          fontWeight="600"
          className="opacity-80"
          letterSpacing={1}
        >
          {currentUser.role}
        </Typography>
      </Stack>
      <Box className="w-full p-2 flex flex-col gap-1">
        <Stack>
          <Typography fontSize="0.9rem" fontWeight="600">
            <FormattedMessage id="nom" />
          </Typography>
          <Typography
            fontSize="0.8rem"
            fontWeight="600"
            className="opacity-80"
            letterSpacing={1}
          >
            {currentUser.nom}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize="0.9rem" fontWeight="600">
            <FormattedMessage id="prenom" />
          </Typography>
          <Typography
            fontSize="0.8rem"
            fontWeight="600"
            className="opacity-80"
            letterSpacing={1}
          >
            {currentUser.prenom}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize="0.9rem" fontWeight="600">
            Email
          </Typography>
          <Typography
            fontSize="0.8rem"
            fontWeight="600"
            className="opacity-80"
            letterSpacing={1}
          >
            {currentUser.email}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize="0.9rem" fontWeight="600">
            <FormattedMessage id="contact" />
          </Typography>
          <Typography
            fontSize="0.8rem"
            fontWeight="600"
            className="opacity-80"
            letterSpacing={1}
          >
            {currentUser.contact}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize="0.9rem" fontWeight="600">
            <FormattedMessage id="role" />
          </Typography>
          <Typography
            fontSize="0.8rem"
            fontWeight="600"
            className="opacity-80"
            letterSpacing={1}
          >
            {currentUser.role}
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => console.log("hek")}
          size="small"
          fullWidth
        >
          Editer vos informations
        </Button>
      </Box>
    </Stack>
  );
}
