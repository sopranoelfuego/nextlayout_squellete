"use client"
import React,{useState} from 'react'

export const ExpandContext=React.createContext<{expand:boolean,setExpand:Function}>({expand:false,setExpand:()=>null})

export function  ExpandContextProvider({children}:{children:React.ReactNode}) {
    const [expand, setExpand] = useState(true)
    return (
    <ExpandContext.Provider value={{expand,setExpand}}>{children}</ExpandContext.Provider>
  )
}
