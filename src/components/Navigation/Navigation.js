// MUI Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
//MUI Icons

export default function Navigation() {
  return (
    <Box sx={{ margin: 2 }}>
      <Drawer hideBackdrop anchor="left" className="border" open="true">
        <Toolbar>
          <Stack>
            <Avatar />
            <Avatar />
          </Stack>
        </Toolbar>
      </Drawer>
    </Box>
  );
}
