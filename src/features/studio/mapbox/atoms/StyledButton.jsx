import { styled } from "@mui/material/styles";
import { AppBar as MuiAppBar } from "@mui/material";

const StyledButton = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "29px",
  height: "29px",
  borderRadius: 4,
  backgroundColor: "white",
  boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default StyledButton;
