import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { grey } from "@mui/material/colors";

import { toggleDrawer } from "@/redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "@/widgets/atoms";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: "black",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "black",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "black",
    },
  }),
}));

function SideNav() {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          {isDrawerOpen ? (
            <ChevronLeftIcon sx={{ color: grey[800] }} />
          ) : (
            <MenuIcon sx={{ color: grey[800], mr: "5px" }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Tabs />
    </Drawer>
  );
}

SideNav.displayName = "/src/layouts/SideNav.jsx";

export default SideNav;
