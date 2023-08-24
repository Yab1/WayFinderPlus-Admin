import { useNavigate } from "react-router-dom";

// MUI Components
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

// MUI Icons
import EventIcon from "@mui/icons-material/Event";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StreetviewIcon from "@mui/icons-material/Streetview";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";

export default function MobileSpeedDial() {
  const navigate = useNavigate();

  const actions = [
    {
      iconMUI: <StreetviewIcon />,
      title: "Map View",
      path: "/",
      key: 0,
    },
    {
      iconMUI: <DatasetLinkedOutlinedIcon />,
      title: "Dataset",
      path: "/Dataset",
      key: 1,
    },
    {
      iconMUI: <AddLocationAltIcon />,
      title: "Map Editor",
      path: "/MapEditor",
      key: 2,
    },
    {
      iconMUI: <EventIcon />,
      title: "Event Controller",
      path: "/EventController",
      key: 3,
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 5,
        left: 5,
        flexGrow: 1,
        zIndex: 500,
        display: { sx: "block", md: "none" },
      }}
    >
      <SpeedDial
        ariaLabel="speed dial navigation"
        sx={{ "& .MuiFab-primary": { width: 50, height: 50 } }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.key}
            icon={action.iconMUI}
            tooltipTitle={action.title}
            onClick={(e) => {
              navigate(action.path);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
