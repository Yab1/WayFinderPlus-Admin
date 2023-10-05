import { Fragment } from "react";
import { switchMapStyle } from "@/slices";
import { useDispatch, useSelector } from "react-redux";
import { setStyleAnchorEl } from "@/slices";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import LayersIcon from "@mui/icons-material/Layers";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";

function StyleController() {
  const { styleAnchorEl } = useSelector((state) => state.ui);
  const { styles, mapStyle } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();
  return (
    <Fragment>
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

StyleController.displayName = "/src/widgets/layout/StyleController.jsx";

export default StyleController;
