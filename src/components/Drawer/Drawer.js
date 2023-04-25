import { useState } from "react";
import Tool from "./tool";

// MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

//MUI Icons
import EventIcon from "@mui/icons-material/Event";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

// MUI Colors
import { grey, lightBlue } from "@mui/material/colors";

const drawerWidth = 50;
const drawerHeight = "85%";

export default function Drawer() {
  const [open, setOpen] = useState(true);
  const icons = [
    {
      iconMUI: <DatasetLinkedOutlinedIcon />,
      title: "Dataset",
      path: "/",
      key: 1,
    },
    {
      iconMUI: <PostAddIcon />,
      title: "Edit Dataset",
      path: "/POIEditor",
      key: 2,
    },
    {
      iconMUI: <AddLocationAltIcon />,
      title: "Map Editor",
      path: "/MapEditor",
      key: 3,
    },
    {
      iconMUI: <EventIcon />,
      title: "Event Controller",
      path: "/EventController",
      key: 4,
    },
  ];

  // Functions
  const handleDrawer = () => {
    setOpen(!open);
  };

  return open ? (
    <Box
      sx={{
        positon: "absolute",
        height: "100dvh",
        display: { xs: "none", sm: "none", md: "fixed", xl: "fixed" },
        alignItems: "center",
      }}
    >
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
        <Avatar sx={{ bgcolor: lightBlue[500], mt: 3 }}>
          <MapIcon />
        </Avatar>
        <Toolbar />

        {/* Tools */}
        {icons.map(icon => (
          <Tool icon={icon} key={icon.key} />
        ))}

        {/* Close Drawer */}
        <IconButton
          onClick={() => handleDrawer()}
          sx={{
            color: grey[50],
            my: 1,
            transition: "color 900ms ease-in,",
            "&:hover": {
              color: grey[900],
            },
          }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  ) : (
    // Open Drawer
    <Box
      sx={{
        boxShadow: 3,
        width: 40,
        height: 50,
        mt: 7,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        bgcolor: "primary.dark",
      }}
    >
      <IconButton onClick={handleDrawer}>
        <ArrowForwardIosOutlinedIcon sx={{ color: grey[50] }} />
      </IconButton>
    </Box>
  );
}
