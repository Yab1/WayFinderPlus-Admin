import { styled } from "@mui/material/styles";
import { Drawer as MuiDrawer, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/redux/slices";
import { useEffect } from "react";

const drawerWidth = 400;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Drawer({ children }) {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  const { newBounds } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  useEffect(() => {
    !Boolean(newBounds) && dispatch(toggleDrawer(false));
  }, [newBounds, dispatch]);

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "rgba(0, 0, 20, 1)",
          paddingInline: 5,
        },
      }}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={() => dispatch(toggleDrawer(false))}>
          <ChevronLeftIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
        </IconButton>
      </DrawerHeader>
      {children}
    </MuiDrawer>
  );
}

Drawer.displayName = "/src/features/studio/componnets/widgets/form/Drawer.jsx";

export default Drawer;
