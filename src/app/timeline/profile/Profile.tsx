"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UserInfo from "./UserInfo";
import MesCredits from "./MesCreditsTab";
import MesCotisations from "./MesCotisationTabs";
import MesRemboursements from "./MesRemboursementsTab";
import { CotisationType, ICreditType, IReimbourssementType } from "../../../../types";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface IProfileProps{
  credits:ICreditType[],
  cotisations:CotisationType[],
  reimboursements:IReimbourssementType[]
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Profile({credits,cotisations,reimboursements}:IProfileProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className="flex align-start w-full gap-2 box-border flex-col sm:flex-row">
      <UserInfo />
      <Box sx={{ typography: "body1", flex: "1" }} className="w-full">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="mes credit" {...a11yProps(0)} />
            <Tab label="mes cotisations" {...a11yProps(1)} />
            <Tab label="mes remboursements" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box>
          <CustomTabPanel value={value} index={0}>
            <MesCredits credits={credits}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MesCotisations />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MesRemboursements />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
