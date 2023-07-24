import {
  Box,
  IconButton,
  useTheme,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {

  HiChevronDown,
  HiChevronLeft,
  HiLogout,
  HiMenuAlt1,
  HiOutlineUserCircle,
  HiUser,
} from "react-icons/hi";
/* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */
type HeaderProps={
  displayMenuDrawer:boolean,
  handleChangeDisplayMenuDrawer:React.Dispatch<React.SetStateAction<boolean>>

}
function Header({displayMenuDrawer,handleChangeDisplayMenuDrawer}:HeaderProps) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");


  return (
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
        display: "flex",
        justifyContent: matches?"space-between":"flex-end",
        padding: " 1rem",
        alignItems: "center",
        
        backgroundColor: "#fff",
        boxShadow: "0 0 2px rgba(0,0,0,0.1)",
        minHeight: "3.1rem",
      }}
    >
     {matches && <IconButton onClick={()=>handleChangeDisplayMenuDrawer((prev:boolean)=>!prev)}>
        <HiMenuAlt1 fontSize={26} />
      </IconButton>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          position: "relative",
          opacity:"0.7",
          ':hover':{
            opacity:"1",
            cursor:"pointer"
          }
        }}
      >
        <HiOutlineUserCircle fontSize={27} />
        <Typography fontWeight="700">eric ndikukazi</Typography>
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
