import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { toggleSignInDialog } from "@/redux/slices";
import { AuthDialog } from "@/features/auth";
import { MapCard } from "../widgets";
import { useNavigate } from "react-router-dom";

function ExplorePage() {
  const { isAuthDialogOpen } = useSelector((state) => state.ui);
  const { selectedMap } = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 2,
        px: 5,
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${selectedMap.pictureURL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Button
        variant="outlined"
        disabled={isAuthDialogOpen}
        sx={{
          position: "absolute",
          right: 20,
          top: 20,
          width: "fit-content",
          // bgcolor: blueGrey[800],
          alignSelf: "flex-end",
        }}
        onClick={() => dispatch(toggleSignInDialog())}
      >
        Login
      </Button>

      <AuthDialog />
      <Grid item xs={6} sx={{ pr: 10 }}>
        <Typography gutterBottom variant="h4" component="div">
          {selectedMap.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedMap.description}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: "fit-content", bgcolor: blueGrey[800], mt: 3 }}
          onClick={() => navigate("/wayfinder/studio/mapbox/inventory")}
        >
          Tour Map
        </Button>
      </Grid>

      <Grid item xs={6} sx={{ gap: 5, display: "flex" }}>
        <MapCard />
      </Grid>
    </Grid>
  );
}

ExplorePage.displayName = "/src/features/user/pages/ExplorePage.jsx";

export default ExplorePage;
