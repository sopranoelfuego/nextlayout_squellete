"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useRouter,usePathname,useSearchParams } from "next/navigation";

export default function Home() {
  
   const pathname = usePathname()
  const searchParams = useSearchParams()
   useEffect(() => {
      const url = pathname + searchParams.toString()
      // sendSomewhere(url)
      console.log("url:",pathname,searchParams.toString())
   }, [pathname, searchParams])

  return (
    <Box>
      loging page here
      <Button variant="outlined" color="primary" size="small" href="/timeline">
        {" "}
        go straigth to the home page
      </Button>
    </Box>
  );
}
