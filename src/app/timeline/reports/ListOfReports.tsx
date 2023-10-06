"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {HiOutlineChevronDown,HiOutlineChevronUp} from "react-icons/hi"
import { FormattedMessage } from 'react-intl';
import { IReportType } from '../../../../types';




function createData(
    nom: string,
    prenom: string,
    contact: string,
    montantCotise: number,
    montantCredit: number,
    montantRemburse: number,
    montantRestantSurCredit: number,
    montantTotalARecevoir: number,
    interet: number
  ) {
    return {
      nom,
      prenom,
      contact,
      montantCotise,
      montantCredit,
      montantRemburse,
      montantRestantSurCredit,
      montantTotalARecevoir,
      interet,
    };
  }


  function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  console.log("report here:",row)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.nom}
        </TableCell>
        <TableCell align="right">{row?.prenom}</TableCell>
        <TableCell align="right">{row?.contact}</TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Rapport
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                      {/* montantCotise,
      montantCredit,
      montantRemburse,
      montantRestantSurCredit,
      montantTotalARecevoir,
      interet, */}
                    <TableCell>montantCotise</TableCell>
                    <TableCell>montantCredit</TableCell>
                    <TableCell align="right">montantRemburse</TableCell>
                    <TableCell align="right">montantRestantSurCredit</TableCell>
                    <TableCell align="right">montantTotalARecevoir</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                      <TableCell component="th" scope="row">
                        {row.montantCotise}
                      </TableCell>
                      <TableCell>{row.montantCredit}</TableCell>
                      <TableCell align="right">{row.montantRemburse}</TableCell>
                      <TableCell align="right">{row.montantRestantSurCredit}</TableCell>
                      <TableCell align="right">{row.montantTotalARecevoir}</TableCell>
                      
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default function ListOfReports({ reports }: { reports: any }) {

  
   return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><FormattedMessage id="nom"/></TableCell>
            <TableCell align="right"><FormattedMessage id="prenom"/></TableCell>
            <TableCell align="right"><FormattedMessage id="contact"/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports?.rapportResponses?.map((row:IReportType & {nom:string,prenom:string,contact:string}) => (
            <Row key={row?.nom} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
