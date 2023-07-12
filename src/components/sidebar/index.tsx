import React from "react";
import SidebarItem from "./SidebarItem";
import Stack from "@mui/material/Stack";
import { sidebarData, SidebarItemType } from "./SidebarData";
import { Avatar, Badge, Box, Button } from "@mui/material";
import { HiLogout } from "react-icons/hi";
/* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */

function index() {
  return (
    <Stack
      minHeight="100vh"
      width="100%"
      maxWidth="20rem"
      minWidth="20rem"
      spacing={{ xs: 1, sm: 2 }}
      direction="column"
      justifyContent="space-between"
      position="sticky"
      top="0"
      alignItems="center"
      padding="0  0  3rem 0"
      sx={{ backgroundColor: "#055E68", color: "#B9D2D2" }}
      display="flex"
    >
      <Box>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          maxWidth="20rem"
          minWidth="20rem"
          width="100%"
          sx={{
            backgroundColor: "#1d7a85",
            width: "100%",
            padding: "1.9rem 1rem",
          }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box>
            <h3 className="font-bold text-justify">Eric mugabekazi</h3>

            <small>
              <span className="mr-2">
                <Badge color="success" badgeContent=" " variant="dot"></Badge>
              </span>
              online
            </small>
          </Box>
        </Stack>
      
        {sidebarData.map((data: SidebarItemType) => (
          <SidebarItem item={data} expand={true} key={data?.href} />
        ))}
      </Box>

      <Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<HiLogout size={23} />}
        >
          disconect
        </Button>
      </Box>
    </Stack>
  );
}

export default index;
