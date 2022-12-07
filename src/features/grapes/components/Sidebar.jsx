import { useState } from "react";
import { Stack, Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { BsLayersFill, BsGearFill } from "react-icons/bs";
import { FaPaintBrush } from "react-icons/fa";

import logo from "../../../assets/arab-logo.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {<Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sidebar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Link
        to="/home"
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
      >
        <img src={logo} alt="logo" height={55} />
      </Link>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              sx={{ minWidth: "78px" }}
              icon={<HiViewGridAdd style={{ width: "22px", height: "22px" }} />}
              {...a11yProps(0)}
            />
            <Tab
              sx={{ minWidth: "78px" }}
              icon={<BsLayersFill style={{ width: "18px", height: "18px" }} />}
              {...a11yProps(1)}
            />
            <Tab
              sx={{ minWidth: "78px" }}
              icon={<FaPaintBrush style={{ width: "18px", height: "18px" }} />}
              {...a11yProps(2)}
            />
            <Tab
              sx={{ minWidth: "78px" }}
              icon={<BsGearFill style={{ width: "18px", height: "18px" }} />}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box id="blocks-container"></Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box id="layer-container"></Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box id="style-container"></Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box id="trait-container"></Box>
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default Sidebar;
