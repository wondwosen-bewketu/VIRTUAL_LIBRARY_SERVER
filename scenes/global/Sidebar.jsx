// Sidebar.jsx
import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LineStyleSharp from "@mui/icons-material/LineStyleSharp";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo from "../../assets/log.png"; // Replace with the actual path

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  // Dynamically adjust logo color based on theme
  const logoStyle = {
    width: "100%", // Adjust the size as needed
    height: "auto", // Maintain aspect ratio
    filter: theme.palette.mode === "dark" ? "invert(100%)" : "none",
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0  0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={theme.palette.mode === "dark" ? "black" : "green"}
                  fontWeight="bold"
                  sx={{ m: "10px 0 -40px 0" }}
                >
                  <img src={logo} alt="Logo" style={logoStyle} />
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            ></Typography>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="New Message"
              to="/newmessage"
              icon={<DraftsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bulk Message"
              to="/bulkmessage"
              icon={<LineStyleSharp />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sent Message"
              to="/sentmessage"
              icon={<SendOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts"
              to="/contact"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Scheduled Messages"
              to="/scheduledmessage"
              icon={<ScheduleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Inbox"
              to="/inbox"
              icon={<InboxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
