'use client' // Error components must be Client Components
 
import { Box, Stack } from '@mui/material'
import { useEffect } from 'react'
 import { HiOutlineRefresh } from "react-icons/hi";
import { FormattedMessage } from 'react-intl';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error here:",error)
  }, [error])
 
  return (
    <Box sx={{width:"100%",textAlign:"center"}}>
      <Stack sx={{margin:"0 auto",width:'fit-content',marginTop:'1rem'}} spacing={{xs:1,sm:2}} >

      <p className='text-xs opacity-60 font-semibold ' ><FormattedMessage id="err_message"/></p>
      
      <button
      className={`bg-mainColor hover:bg-white border hover:border-mainColor transition-all duration-500 hover:text-mainColor  text-xs rounded-full py-2 text-white flex items-center gap-1  justify-center  `}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
       <HiOutlineRefresh fontSize={20}/> <FormattedMessage id="ressayer"/>
      </button>
      </Stack>
    </Box>
  )
}
