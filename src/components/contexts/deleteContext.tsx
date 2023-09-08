"use client"
import React,{useState} from 'react'

export const DeleteContext=React.createContext<{expand:boolean,setExpand:Function}>({expand:false,setExpand:()=>null})

export function  DeleteContextProvider({children}:{children:React.ReactNode}) {
    const [expand, setExpand] = useState(true)
    return (
    <DeleteContext.Provider value={{expand,setExpand}}>{children}</DeleteContext.Provider>
  )
}
