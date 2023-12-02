import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/redux/slices";
import { StyledButton } from "@/features/studio/mapbox/atoms";

function DrawerOpener() {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  const { compundConfig } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  return (
    <StyledButton
      open={isDrawerOpen}
      sx={{ display: compundConfig.bounds ? "" : "none", top: 10, left: 10 }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => dispatch(toggleDrawer(true))}
        sx={{ ...(isDrawerOpen && { display: "none" }) }}
      >
        <Menu sx={{ color: "#333333" }} />
      </IconButton>
    </StyledButton>
  );
}

DrawerOpener.displayName =
  "/src/features/studio/componnets/controls/DrawerOpener.jsx";

export default DrawerOpener;
