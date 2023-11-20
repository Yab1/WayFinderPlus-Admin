import Box from "@mui/material/Box";
import { Images } from "@/constants";
import styled from "styled-components";
import SignInForm from "./SignInForm";
import { Grid, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

function Auth() {
  const RouteImage = styled("div")({
    position: "absolute",
    width: "50%",
    height: "50%",
    left: 20,
    top: "50%",
    transform: `translate(-10%, -48%)`,
    backgroundImage: `url(${Images.RouteLines})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  });

  return (
    <Grid container columnSpacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: blue[500],
            fontFamily: "Agbalumo, sans-serif",
            p: 5,
            // pt: 10,
          }}
        >
          Wayfinder Plus
        </Typography>
        <RouteImage />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignInForm />
      </Grid>
    </Grid>
    // <Box
    //   sx={{
    //     height: "100vh",
    //     py: 2,
    //     px: 5,
    //     bgcolor: "#1a1b20",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "flex-end",
    //   }}
    // >
    // </Box>
  );
}

Auth.displayName = "/src/features/auth/Auth.jsx";

export default Auth;
