import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "@/routes";

// MUI Components
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { grey } from "@mui/material/colors";

function Tabs() {
  const { isDrawerOpen } = useSelector((state) => state.ui);

  const renderTabs = routes.map(({ icon, name, path }) => (
    <NavLink
      key={name}
      to={`/dashboard${path}`}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <ListItem disablePadding sx={{ display: "block" }}>
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
                color: isActive ? grey[50] : grey[800],
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                opacity: isDrawerOpen ? 1 : 0,
                color: isActive ? grey[50] : grey[800],
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
