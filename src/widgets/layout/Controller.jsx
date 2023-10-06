import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import RoomIcon from "@mui/icons-material/Room";
import { grey } from "@mui/material/colors";
import { switchMapStyle, toggleMarkers } from "@/slices";
import { setStyleAnchorEl } from "@/slices";

const styles = {
  dark: "dark-v11",
  light: "light-v11",
  night: "navigation-night-v1",
  outdoor: "outdoors-v12",
  satellite: "satellite-streets-v12",
};

function Controller() {
  const { styleAnchorEl } = useSelector((state) => state.ui);
  const { mapStyle, showMarkers } = useSelector((state) => state.mapBox);

  const dispatch = useDispatch();
  return (
    <Fragment>
      <IconButton
        aria-label="switch map style"
        sx={{
          zIndex: "modal",
          position: "absolute",
          right: 11,
          bottom: 150,
          p: 0,
        }}
        onClick={() => dispatch(toggleMarkers())}
      >
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: grey[50],
            p: "2px",
            width: 24,
            height: 24,
            boxShadow: showMarkers ? 2 : 0,
            opacity: showMarkers ? "100%" : "80%",
          }}
        >
          <RoomIcon
            fontSize="inherit"
            sx={{ color: showMarkers ? grey[900] : grey[400] }}
          />
        </Avatar>
      </IconButton>
      <IconButton
        aria-label="switch map style"
        sx={{
          zIndex: "modal",
          position: "absolute",
          right: 11,
          bottom: 110,
          p: 0,
        }}
        onClick={(event) => dispatch(setStyleAnchorEl(event.currentTarget))}
      >
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: grey[50],
            p: "2px",
            width: 24,
            height: 24,
            boxShadow: 2,
          }}
        >
          <LayersIcon fontSize="inherit" sx={{ color: grey[900] }} />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={styleAnchorEl}
        open={Boolean(styleAnchorEl)}
        onClose={() => dispatch(setStyleAnchorEl(null))}
        onClick={() => dispatch(setStyleAnchorEl(null))}
        sx={{ top: 5, left: -30, boxShadow: 1 }}
      >
        <MenuList dense sx={{ p: 0, px: 1 }}>
          {Object.entries(styles).map(([key, value]) => (
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
              onClick={() => dispatch(switchMapStyle(value))}
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

Controller.displayName = "/src/widgets/layout/Controller.jsx";

export default Controller;
