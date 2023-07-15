import { Box, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { HiMenu } from 'react-icons/hi'
     /* backgroundMain:#055E68 */
/* blackMain:#343434 */
/* greenMain:#62A388 */
/* greyMain:#B9D2D2 */
function Header() {
  
  const theme=useTheme()
  return (
    <Box sx={{backgroundColor:"#fff",boxShadow:"0 0 2px rgba(0,0,0,0.1)",minHeight:"3.1rem"}}>
        header
      </Box>
  )
}

export default Header