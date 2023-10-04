import { Fragment } from "react";
import { setAnchorEl } from "@/slices";
import { clearUserCredentials } from "@/features";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// MUI Icons
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";

function AccountMenu() {
  const { anchorEl } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <IconButton
        sx={{ position: "absolute", right: 20, top: 5, zIndex: 50 }}
        onClick={(event) => dispatch(setAnchorEl(event.currentTarget))}
        size="small"
      >
        <Avatar sx={{ width: 30, height: 30 }}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => dispatch(setAnchorEl(null))}
        onClick={() => dispatch(setAnchorEl(null))}
        PaperProps={{
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
            px: 1,
            mr: 3,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -6,
              left: 75,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(10%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => dispatch(clearUserCredentials())}
        >
          Logout
          <Logout fontSize="small" sx={{ ml: 2 }} />
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

AccountMenu.displayName = "/src/widgets/AccountMenu.jsx";

export default AccountMenu;
