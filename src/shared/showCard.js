import { useContext, useState } from "react";
import { MapContext } from "../contexts/MapContext";
import Popup from "./dialog";
import Thumbnail from "../assets/Thumbnail image.jpeg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { red } from "@mui/material/colors";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShowCard({
  clickedMarkerId,
  buildingsData,
  closeCard,
  handleMarkerClick,
}) {
  const { deleteData } = useContext(MapContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  let markerArr = [];
  if (buildingsData !== []) {
    markerArr = buildingsData.filter(
      (building) => building.id === clickedMarkerId
    );
  }
  let building = {};

  if (markerArr[0]) {
    const {
      buildingNumber,
      buildingName,
      buildingDescription,
      buildingCategory,
      created_at,
    } = markerArr[0];
    building = {
      id: clickedMarkerId,
      buildingNumber,
      buildingName,
      buildingDescription,
      buildingCategory,
      created_at,
    };
  }

  if (building.buildingNumber) {
    return (
      <Card
        sx={{
          maxWidth: 345,
          position: "absolute",
          zIndex: "10",
          right: "3%",
          width: {
            xs: "60%",
            sm: "60%",
            md: "40%",
            lg: "20%",
            xl: "20%",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {building.buildingNumber}
            </Avatar>
          }
          action={
            <IconButton aria-label="close" onClick={closeCard}>
              <CloseIcon />
            </IconButton>
          }
          title={building.buildingName}
          subheader={building.buildingCategory}
        />
        <CardMedia
          component="img"
          height="194"
          image={Thumbnail}
          alt="Thumbnail"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {building.buildingDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={handleClose}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Popup
          open={open}
          building={building}
          handleClose={handleClose}
          deleteData={deleteData}
          handleMarkerClick={handleMarkerClick}
        ></Popup>
      </Card>
    );
  }
}
