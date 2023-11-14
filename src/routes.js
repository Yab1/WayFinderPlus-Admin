import { MyMap, TabularData, MapDataEditor, EventDataEditor } from "@/pages";

//MUI Icons
import MapIcon from "@mui/icons-material/Map";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EventIcon from "@mui/icons-material/Event";

const routes = [
  {
    icon: <MapIcon />,
    name: "My Map",
    path: "admin/my-map",
    element: <MyMap />,
  },
  {
    icon: <DatasetLinkedOutlinedIcon />,
    name: "Tabular Data",
    path: "admin/tabular-data",
    element: <TabularData />,
  },
  {
    icon: <AddLocationAltIcon />,
    name: "Map Data Editor",
    path: "admin/map-data-editor",
    element: <MapDataEditor />,
  },
  {
    icon: <EventIcon />,
    name: "Event Data Editor",
    path: "admin/event-data-editor",
    element: <EventDataEditor />,
  },
];

export default routes;
