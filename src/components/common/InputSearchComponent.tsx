import React from 'react'
import { Box, IconButton } from '@mui/material'
import { HiOutlineSearch, HiX } from 'react-icons/hi'

type InputSearchProps={
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    value:string,
    handleClear:()=>void
}
function InputSearchComponent({value,handleChange,handleClear}:InputSearchProps) {
  return (
     <Box
          sx={{
            display: "flex",
            width: {xs:"100%",sm:"400px"},
            borderRadius: "10px",
            backgroundColor: "inherit",
            border:"1px solid #c7d9d4",
            opacity:"0.8",
            

            ":focus":{
            backgroundColor: "#eef5f3",
            },
            alignItems: "center",
            paddingX:"10px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            style={{
              outline: "none",
              backgroundColor: "transparent",
              flex: "1",
              padding: "0.5rem",
              height: "40px",
            }}
            value={value}
            onChange={handleChange}
            placeholder='search here...'
          />
          {value?.length ?
          <IconButton onClick={handleClear}>

            <HiX fontSize={20}/>
          </IconButton> 
          :null}
            <IconButton>
          <HiOutlineSearch fontSize={20}  />

          </IconButton> 
        </Box>
  )
}

export default InputSearchComponent