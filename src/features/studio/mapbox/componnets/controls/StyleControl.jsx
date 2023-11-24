import { Fragment } from "react";
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import { StyledButton } from "@/features/studio/mapbox/atoms";
import { useDispatch, useSelector } from "react-redux";
import { setStyle, setStyleAnchorEl } from "@/redux/slices";
import { MapStyles } from "@/features/studio/mapbox/constants";
import { grey } from "@mui/material/colors";

function StyleControl() {
  const { mapStyle } = useSelector((state) => state.mapBox);
  const { styleAnchorEl } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <StyledButton sx={{ top: "67.8%", right: 10 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={(event) => dispatch(setStyleAnchorEl(event.currentTarget))}
        >
          <LayersIcon sx={{ color: "#333333" }} />
        </IconButton>
      </StyledButton>
      <Menu
        anchorEl={styleAnchorEl}
        open={Boolean(styleAnchorEl)}
        onClose={() => dispatch(setStyleAnchorEl(null))}
        onClick={() => dispatch(setStyleAnchorEl(null))}
        sx={{ top: 5, left: -30, boxShadow: 1 }}
      >
        <MenuList dense sx={{ p: 0, px: 1 }}>
          {Object.entries(MapStyles).map(([key, value]) => (
            <MenuItem
              key={key}
              sx={{
                bgcolor: value === mapStyle ? "black" : grey[50],
                color: value === mapStyle ? grey[50] : "black",
                "&:hover": {
                  bgcolor: value === mapStyle && "black",
                  color: value === mapStyle && grey[50],
                },
              }}
              onClick={() => dispatch(setStyle(value))}
            >
              <ListItemText sx={{ textTransform: "capitalize" }}>
                {key}
              </ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Fragment>
  );
}

StyleControl.displayName =
  "/src/features/studio/componnets/controls/StyleControl.jsx";

export default StyleControl;
