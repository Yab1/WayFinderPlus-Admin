import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import primaryRoutes from "@/routes";

// MUI Components
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { blue } from "@mui/material/colors";

function Tabs() {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const renderTabs = primaryRoutes.map(({ icon, name, path }) => (
    <NavLink
      key={name}
      to={`/dashboard${path}`}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <ListItem
          disablePadding
          sx={{
            display: "block",
            bgcolor: isActive ? blue[900] : "white",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isDrawerOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDrawerOpen ? 3 : "auto",
                justifyContent: "center",
                color: isActive ? blue[50] : "black",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                opacity: isDrawerOpen ? 1 : 0,
                color: isActive ? blue[50] : "black",
              }}
            />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  ));

  return <List>{renderTabs}</List>;
}

Tabs.displayName = "/src/atoms/Tabs.jsx";

export default Tabs;
