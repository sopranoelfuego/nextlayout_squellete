import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function UserInfo() {
  return (
    <Stack className="bg-white  w-full sm:w-1/4 box-border" justifyContent="center" alignItems="center" >
      <Image
        width={200}
        height={200}
        src="/user.svg"
        // src={`https://e7.pngegg.com/pngimages/8/36/png-clipart-man-black-illustration-computer-icons-google-account-user-profile-iconfinder-com-icons-profile-account-profile-thumbnail.png`}
        alt="profileImage"
      />
      {/* ============== USER INFO HERE ========= */}
      <Stack className="text-center">
        <Typography fontSize="1rem" fontWeight="800">Kaburente Edouard</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>membre</Typography>
      </Stack>
      <Box className="w-full p-2 flex flex-col gap-1">

      <Stack>
        <Typography fontSize="0.9rem" fontWeight="600">Nom</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>kaburente</Typography>
      </Stack>
      <Stack>
        <Typography fontSize="0.9rem" fontWeight="600">Prenom</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>edouard</Typography>
      </Stack>
      <Stack>
        {/* 
        "nom": "hello",
        "prenom": "halloween",
        "contact": "+11445454441",
        "email": "aubinjaja@gmail.com",
        "role": "USER"
        */}
        <Typography fontSize="0.9rem" fontWeight="600">Email</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>kaburente@gmail.com</Typography>
      </Stack>
      <Stack>
        <Typography fontSize="0.9rem" fontWeight="600">Phone number</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>+24821112323</Typography>
      </Stack>
      <Stack>
        <Typography fontSize="0.9rem" fontWeight="600">Role</Typography>
        <Typography fontSize="0.8rem" fontWeight="600" className="opacity-80" letterSpacing={1}>user</Typography>
      </Stack>
      <Button variant="outlined" onClick={()=>console.log("hek")} size="small" fullWidth>
        Editer vos informations
      </Button>
      </Box>
    </Stack>
  );
}
