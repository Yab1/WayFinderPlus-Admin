import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountAnchorEl } from "@/redux/slices";
// import { clearUserCredentials } from "@/layouts";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// MUI Icons
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AccountMenu() {
  const { accountAnchorEl } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <IconButton
        // sx={{ position: "absolute", right: 15, top: 5, zIndex: "snackbar" }}
        onClick={(event) => dispatch(setAccountAnchorEl(event.currentTarget))}
        size="small"
      >
        <Avatar sx={{ width: 30, height: 30 }}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        onClose={() => dispatch(setAccountAnchorEl(null))}
        onClick={() => dispatch(setAccountAnchorEl(null))}
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
          dense
          sx={{ p: 0 }}
          // onClick={() => dispatch(clearUserCredentials())}
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
