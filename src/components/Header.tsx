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
    <Box sx={{width:`calc(100vw - ${theme.spacing(20)})`,backgroundColor:"#055E68",minHeight:"3.1rem"}}>
        <IconButton>
          <HiMenu size={30} />
        </IconButton>
      </Box>
  )
}

export default Header