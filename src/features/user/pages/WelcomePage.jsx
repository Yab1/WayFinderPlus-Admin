import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styled from "styled-components";
import { blue, blueGrey } from "@mui/material/colors";
import { Tooltip } from "@mui/material";
import { Images } from "@/constants";

function WelcomePage() {
  const navigate = useNavigate();

  const BuildingsImage = styled("div")({
    position: "absolute",
    width: "100%",
    height: "60%",
    right: 20,
    top: "50%",
    transform: `translate(29%, -48%)`,
    backgroundImage: `url(${Images.BuildingRoute})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  });

  return (
    <Fragment>
      <Box
        sx={{
          background:
            "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 10,
          gap: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: blue[500], fontFamily: "Agbalumo, sans-serif" }}
        >
          Wayfinder Plus
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{ color: blueGrey[500], width: "40%" }}
        >
          Wayfinder Plus introduces an immersive suite of tools, redefining
          navigation across indoor and outdoor domains. Embrace panoramic
          imagery and advanced navigation technology for effortless exploration.
          Whether starting with our robust tools or integrating your existihng
          system, Wayfinder Plus ensures swift deployment of innovative
          solutions, empowering your journey with production-ready features.
        </Typography>
        <Button
          variant="contained"
          sx={{ width: "fit-content", bgcolor: blueGrey[800] }}
          onClick={() => navigate("explore-maps")}
        >
          Explore Now
        </Button>
      </Box>

      <BuildingsImage />

      <Box
        component={"div"}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: blueGrey[50],
        }}
      >
        <Tooltip title="Need Help?" placement="bottom" arrow>
          <IconButton
            sx={{ width: "fit-content", color: blueGrey[800] }}
            onClick={() => navigate("help")}
          >
            <HelpOutlineIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Fragment>
  );
}

WelcomePage.displayName = "/src/layouts/WelcomePage.jsx";

export default WelcomePage;
