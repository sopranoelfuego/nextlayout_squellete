import {
  Box,
  IconButton,
  Avatar,
  useTheme,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import {
  HiArrowSmDown,
  HiArrowSmLeft,
  HiChevronDown,
  HiChevronLeft,
  HiLogout,
  HiUser,
} from "react-icons/hi";
/* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */
function Header() {
  const [displayMenu, setDisplayMenu] = useState(false);

  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
        display: "flex",
        justifyContent: "flex-end",
        padding: " 1rem",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: "0 0 2px rgba(0,0,0,0.1)",
        minHeight: "3.1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography fontWeight="700">eric ndikukazi</Typography>
        <IconButton
          onClick={() => setDisplayMenu((prev: boolean) => !prev)}
          sx={{ transition: "all ease 400ms" }}
        >
          {displayMenu ? (
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
