
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListOfContributions from '../cotisation/ListOfContributions';





export default function MesCotisations({cotisations}:{cotisations:any}){


  return <ListOfContributions contributions={cotisations}/>
}