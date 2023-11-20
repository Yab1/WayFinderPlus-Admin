import { Fragment } from "react";
import { AppBar } from "@/widgets";
import { Box, Button, Divider, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { MapThumbnailCard } from "./widgets";
import { useNavigate } from "react-router-dom";

function StudioDashboard() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          height: "100vh",
          px: 20,
          py: 3,
        }}
      >
        <Box
          component="header"
          sx={{
            flex: "0 0 auto",
          }}
        >
          <AppBar />
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box component="main" sx={{ flex: "1 1 auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontFamily: "Asap Condensed, sans-serif" }}
            >
              Maps
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                width: "fit-content",
                color: blueGrey[800],
                textTransform: "capitalize",
                borderColor: blueGrey[500],
              }}
              onClick={() => navigate("new-map")}
            >
              New Map
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <MapThumbnailCard />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

StudioDashboard.displayName = "/src/features/admin/StudioDashboard.jsx";

export default StudioDashboard;
