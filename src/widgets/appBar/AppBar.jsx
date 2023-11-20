import { Box } from "@mui/material";
import { Logo, AccountMenu } from "./widgets";

function AppBar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Logo />
      <AccountMenu />
    </Box>
  );
}

AppBar.displayName = "/src/widgets/appBar/AppBar.jsx";

export default AppBar;
