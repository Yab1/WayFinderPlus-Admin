import React, { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";

// MUI Icons
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AuthContext.Consumer>
      {(context) => {
        const { logged, logout } = context;
        return (
          <React.Fragment>
            <IconButton
              sx={{ position: "absolute", right: 20, top: 5, zIndex: 50 }}
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 30, height: 30 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
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
              {logged ? (
                <MenuItem
                  sx={{ p: 0 }}
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                >
                  Logout
                  <ListItemIcon>
                    <IconButton></IconButton>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                </MenuItem>
              ) : (
                <MenuItem
                  sx={{ p: 0 }}
                  onClick={() => {
                    navigate("/LoginForm");
                  }}
                >
                  Login
                  <ListItemIcon>
                    <IconButton></IconButton>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default AccountMenu;
