"use client";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
  Avatar,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  HiChevronDown,
  HiChevronLeft,
  HiLogout,
  HiMenuAlt1,
  HiOutlineUserCircle,
  HiUser,
} from "react-icons/hi";
import { LangueContext } from "./contexts/langueContext";
/* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */
interface HeaderProps {
  displayMenuDrawer: boolean;
  handleChangeDisplayMenuDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface Ilanguage {
  flag: string;
  name: string;
  code: string;
}
export const listLanguages: Ilanguage[] = [
  {
    flag: "https://www.worldometers.info/img/flags/by-flag.gif",
    name: "Ikirundi",
    code: "bi",
  },
  {
    flag: "https://www.worldometers.info/img/flags/fr-flag.gif",
    name: "Français",
    code: "fr",
  },
  {
    flag: "https://www.worldometers.info/img/flags/uk-flag.gif",
    name: "English",
    code: "eng",
  },
];
function Header({
  displayMenuDrawer,
  handleChangeDisplayMenuDrawer,
}: HeaderProps) {
  const {changeLangue,langue} = useContext(LangueContext)
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLang, setDisplayLang] = useState(false)
  const matches = useMediaQuery("(max-width:700px)");
  const [language, setLanguage] = useState<Ilanguage>({
   flag: "https://www.worldometers.info/img/flags/by-flag.gif",
    name: "Ikirundi",
    code: "bi",
  });
  useEffect(() => {
    if(langue)setLanguage(()=>listLanguages.find(lang=>lang.code === langue)!)
  }, [langue])
  
const handleChangeLangue=(l:Ilanguage)=>{
  changeLangue(l.code)
  setLanguage((_)=>l)
  setDisplayLang(prev=>!prev)
}
  return (
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
        display: "flex",
        justifyContent: matches ? "space-between" : "flex-end",
        padding: " 1rem",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: "0 0 2px rgba(0,0,0,0.1)",
        minHeight: "3.1rem",
      }}
    >
      {matches && (
        <IconButton
          onClick={() =>
            handleChangeDisplayMenuDrawer((prev: boolean) => !prev)
          }
        >
          <HiMenuAlt1 fontSize={26} />
        </IconButton>
      )}
      {/* LANGAUE TOGGLE BLOCK */}
      <Box sx={{ position: "relative", marginRight: "2rem" }}>
        <Stack onClick={()=>setDisplayLang(prev=>!prev)} sx={{padding: "0.3rem 0.5rem",transition:"all ease 400ms",borderRadius:"50px",border:"2px solid #dcf5f7",":hover":{borderColor:"#62d6e3",cursor:"pointer"}}}>
          <Stack direction="row" spacing={{ xs: 1 }} alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={language.flag}
              sx={{ width: 23, height: 23 }}
            />
            <Typography fontSize="12px" fontWeight="700" sx={{opacity:"0.8"}}>
              {language.name}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{display:displayLang?"block":"none", position: "absolute", backgroundColor: "white", top: "2.5rem" }}
        >
          {listLanguages
            ?.filter((f) => f.name !== language.name)
            ?.map((l) => (
              <Stack
                direction="row"
                key={l.name}
                spacing={{ xs: 1, sm: 2 }}
                sx={{
                  padding: "0.5rem 1rem",
                  opacity: "0.8",
                  transition: "all ease 400ms",
                  ":hover": {
                    cursor: "pointer",
                    opacity: 1,
                    color: "white",
                    backgroundColor: "#055E68",
                  },
                }}
                onClick={()=>handleChangeLangue(l)}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={l.flag}
                  sx={{ width: 22, height: 22 }}
                />
                <Typography fontSize="12px" fontWeight="600">
                  {l.name}
                </Typography>
              </Stack>
            ))}
        </Box>
      </Box>
      {/* END LANGAUE TOGGLE BLOCK */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          position: "relative",
          opacity: "0.7",
          ":hover": {
            opacity: "1",
            cursor: "pointer",
          },
        }}
      >
        <HiOutlineUserCircle fontSize={27} />
        <Typography
          fontWeight="700"
          sx={{ display: matches ? "none" : "inline-flex" }}
        >
          eric ndikukazi
        </Typography>
        <IconButton
          onClick={() => setDisplayMenu((prev: boolean) => !prev)}
          sx={{ transition: "all ease 400ms" }}
        >
          {displayMenuDrawer ? (
            <HiChevronLeft fontSize={20} />
          ) : (
            <HiChevronDown fontSize={20} />
          )}
        </IconButton>

        <List
          sx={{
            backgroundColor: `background.paper`,
            position: "absolute",
            top: "50px",
            right: "10px",
            transition: "all ease 400ms",
            display: displayMenu ? "inline-block" : "none",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HiLogout fontSize={20} />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HiUser fontSize={20} />
              </ListItemIcon>
              <ListItemText primary="profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Header;
