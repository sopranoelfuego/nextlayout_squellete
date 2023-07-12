"use client"
import React,{useState} from 'react'

export const ExpandContext=React.createContext<{expand:boolean,handleChangeExpand:Function}>({expand:false,handleChangeExpand:()=>null})

function ExpandContextProvider({children}:{children:React.ReactNode}) {
    const [expand, setExpand] = useState(false)
  const handleChangeExpand=()=>setExpand(prev=>!prev)
    return (
    <ExpandContext.Provider value={{expand,handleChangeExpand}}>{children}</ExpandContext.Provider>
  )
}

export default ExpandContextProvider