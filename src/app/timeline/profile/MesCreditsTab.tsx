"use client"
import {useState} from "react"
import { Box } from "@mui/material";
import { ICreditType } from "../../../../types";
import CreditHeader from "../credit/CreditHeader";
import ListOfCredits from "../credit/ListOfCredits";


interface IMesCreditsProps{
  credits:any
}

export default function MesCredits({credits}:IMesCreditsProps){
   const [credit, setCredit] = useState<ICreditType>({
    id: "",
    montant: 0,
    motif:"",
    membreId: 0,
  });
  const [open, setOpen ] = useState<boolean>(false)
  const handleClickOpenCreateDialog = (credit?: ICreditType) => {
  
    setCredit({
      id: "",
      montant: 0,
    motif:"",
      membreId: 0,
    })
    if (credit)
      setCredit({
        montant: credit.montant,
        motif: credit.motif,
        id: credit.id,
        membreId: credit?.membre?.id!,
      });
    setOpen(true);
  };
  return (

    <ListOfCredits credits={credits} />
  )
    
    
  

}