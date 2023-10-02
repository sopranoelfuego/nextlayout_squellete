
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
export default function CustomChip({text,color}:{text:string,color:string}){

    return (
         <Box sx={{ border: `1px ${color} solid`, borderRadius: "5px" }}>
                  <Typography
                    fontSize="0.8rem"
                    color={`${color}`}
                    fontWeight="800"
                    whiteSpace="nowrap"
                  >
                    {/* {` ${resumee.cotisationResponse.filter((c:CotisationType)=>c.etat === 0).length} - ${intl.formatMessage({ id: "en_attente" })}`} */}
                    {text}
                  </Typography>
                </Box>
    )
}