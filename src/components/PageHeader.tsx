"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { usePathname } from "next/navigation";

const PageHeader = () => {
  const pathname = usePathname();

  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    if (pathname) {
      pathname.split("/").pop() === "timeline"
        ? setTitle("DashBoard")
        : setTitle(() => pathname.split("/").pop()!);
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        padding: "1rem 2rem",
        marginY: "10px",
        width: "100%",
        backgroundColor: `background.paper`,
      }}
    >
      <Typography
        fontWeight="800"
        color="black"
        fontSize="20px"
        sx={{ opacity: "0.7" }}
      >
        {" "}
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
