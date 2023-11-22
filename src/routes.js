import { MapDefinition } from "@/features/studio/map-toolbox";
import { StudioDashboard } from "@/features/studio";

import MapIcon from "@mui/icons-material/Map";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EventIcon from "@mui/icons-material/Event";
import { ExplorePage, WelcomePage, Help } from "@/features/user/pages";
import { Auth } from "@/features/auth";

// export const routes = [
//   {
//     icon: <MapIcon />,
//     name: "My Map",
//     path: "/my-map",
//     element: <MyMap />,
//   },
//   {
//     icon: <DatasetLinkedOutlinedIcon />,
//     name: "Tabular Data",
//     path: "/tabular-data",
//     element: <TabularData />,
//   },
//   {
//     icon: <AddLocationAltIcon />,
//     name: "Map Data Editor",
//     path: "/map-data-editor",
//     element: <MapDataEditor />,
//   },
//   {
//     icon: <EventIcon />,
//     name: "Event Data Editor",
//     path: "/event-data-editor",
//     element: <EventDataEditor />,
//   },
// ];

export const userRoutes = [
  {
    path: "",
    element: <WelcomePage />,
  },
  {
    path: "/explore-maps",
    element: <ExplorePage />,
  },
  {
    path: "/help",
    element: <Help />,
  },
];

export const studioRoutes = [
  {
    path: "",
    element: <StudioDashboard />,
  },
  {
    path: "/define-map",
    element: <MapDefinition />,
  },
];
