import { useState } from "react";
import Tool from "./tool";

// MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

//MUI Icons
import EventIcon from "@mui/icons-material/Event";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import FeedIcon from "@mui/icons-material/Feed";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// MUI Colors
import { grey } from "@mui/material/colors";

const drawerWidth = 60;
const drawerHeight = "94%";

export default function Drawer() {
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const icons = [
    { iconMUI: <EventIcon />, title: "Event Controler", key: "0" },
    { iconMUI: <AddLocationAltIcon />, title: "Map Editor", key: "1" },
    { iconMUI: <FeedIcon />, title: "POI Editor", key: "2" },
  ];

  // Functions
  const handleDrawer = () => {
    setOpen(!open);
  };
  const changeWindow = () => {
    console.log("clicked");
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const expandDrawer = () => {
    console.log("width");
  };

  return open ? (
    <Box sx={{ display: "flex", height: "100dvh", alignItems: "center" }}>
      <Box
        sx={{
          width: drawerWidth,
          height: drawerHeight,
          boxShadow: 3,
          ml: 2,
          gap: 2,
          borderRadius: 5,
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        {/* <IconButton onClick={expandDrawer} size="small">
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton> */}
        {/* Tools */}
        {icons.map(icon => (
          <Tool icon={icon} />
        ))}
        {/* Close Drawer */}
        <IconButton
          onClick={handleDrawer}
          sx={{
            color: grey[50],
            my: 1,
            transition: "color 900ms ease-in,",
            "&:hover": {
              color: grey[900],
            },
          }}
        >
          <ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />
        </IconButton>
      </Box>
    </Box>
  ) : (
    // Open Drawer
    <Box
      sx={{
        boxShadow: 3,
        width: 50,
        mt: 5,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        bgcolor: "primary.dark",
        transition: "all 900ms ease-in,",
      }}
    >
      <IconButton onClick={handleDrawer}>
        <ExitToAppIcon sx={{ color: grey[50] }} />
      </IconButton>
    </Box>
  );
}
