import { Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import { ImageButton, ImageSrc, Image, ImageBackdrop } from "@/widgets/atoms";
import { useSelector, useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";
import Thumbnail from "@/assets/Thumbnail.jpeg";
import { setClickedMarker } from "@/redux/slices";

function InfoCard() {
  const { map, clickedMarker } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  const close = () => {
    const existingPin = document.querySelector("#pin");
    if (existingPin) {
      existingPin.remove();
    }
    map.flyTo({
      center: [39.29039343419677, 8.563261132878523],
      zoom: 15.2,
      essential: true,
    });

    dispatch(setClickedMarker(null));
  };

  return (
    <Fragment>
      {clickedMarker ? (
        <Box
          component="aside"
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            zIndex: "drawer",
            height: "100vh",
            width: 350,
            pt: 2,
            px: 5,
          }}
        >
          <IconButton
            aria-label="close editor window"
            size="small"
            sx={{ alignSelf: "flex-end" }}
            onClick={close}
          >
            <CloseIcon
              sx={{ color: grey[800], "&:hover": { color: grey[600] } }}
            />
          </IconButton>

          <Typography
            variant="h5"
            sx={{ color: grey[200], mt: 5, textTransform: "capitalize" }}
          >
            {clickedMarker.buildingName}
          </Typography>

          <Box
            variant="div"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: grey[500] }}>
              {clickedMarker.buildingCategory}
            </Typography>

            <HdrWeakIcon fontSize="small" sx={{ color: "white", ml: 2 }} />
            <HdrWeakIcon
              fontSize="small"
              sx={{
                color: "white",
                mr: 2,
                transform: "rotate(180deg)",
              }}
            />

            <Typography variant="subtitle1" sx={{ color: grey[500] }}>
              B{clickedMarker.buildingNumber}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{ color: grey[400], my: 5, textTransform: "normal" }}
          >
            {clickedMarker.buildingDescription}
          </Typography>

          <ImageButton
            focusRipple
            sx={{
              width: "40%",
              mt: "auto",
              mb: 5,
            }}
          >
            <ImageSrc
              style={{
                backgroundImage: `url(${
                  clickedMarker.url === "" ? Thumbnail : clickedMarker.url
                })`,
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image></Image>
          </ImageButton>
        </Box>
      ) : null}
    </Fragment>
  );
}

InfoCard.displayName = "/src/widgets/cards/InfoCard.jsx";

export default InfoCard;
