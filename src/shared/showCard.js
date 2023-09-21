import { useContext, useEffect, useState } from "react";
import { MapContext } from "../contexts/MapContext";
import { EventContext } from "../contexts/EventContext";
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
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ShowCard({
  clickedMarkerId,
  buildingsData,
  closeCard,
  handleMarkerClick,
}) {
  const { deleteData } = useContext(MapContext);
  const { events, deleteEvents } = useContext(EventContext);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setOpen(!open);

  let markerArr = [];
  let filteredEvent = [];
  if (buildingsData.length > 0) {
    markerArr = buildingsData.filter(
      (building) => building.id === clickedMarkerId
    );
    filteredEvent = events.filter(
      (event) => event.geoHash === markerArr[0].geoHash
    );
  }
  let building = {};

  if (markerArr[0]) {
    const {
      url,
      geoHash,
      buildingNumber,
      buildingName,
      buildingDescription,
      buildingCategory,
      created_at,
    } = markerArr[0];
    building = {
      id: clickedMarkerId,
      url,
      geoHash,
      buildingNumber,
      buildingName,
      buildingDescription,
      buildingCategory,
      created_at,
    };
  }

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
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {building.buildingNumber
              ? building.buildingNumber
              : building.buildingCategory[0]}
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
        image={building.url ? building.url : Thumbnail}
        alt="Thumbnail"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {building.buildingDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        {filteredEvent[0] && (
          <IconButton
            aria-label="event available"
            onClick={() => setExpanded(!expanded)}
          >
            <EventIcon color="success" />
          </IconButton>
        )}
        {!filteredEvent[0] && (
          <Tooltip title="No event available" placement="bottom-start">
            <span>
              <IconButton aria-label="event not available" disabled>
                <CalendarTodayIcon color="disabled" />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <IconButton aria-label="delete" onClick={handleClose}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
      {filteredEvent[0] && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {filteredEvent[0].eventName}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`${filteredEvent[0].startDate} - ${filteredEvent[0].endDate}`}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {filteredEvent[0].eventCategory}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {filteredEvent[0].eventDescription}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ width: "100%", ml: "25%" }}
            onClick={() =>
              filteredEvent[0] && deleteEvents(filteredEvent[0].id)
            }
          >
            <Button variant="contained" color="error">
              Delete Event
            </Button>
          </CardActions>
        </Collapse>
      )}
      <Popup
        open={open}
        building={building}
        handleClose={handleClose}
        deleteData={deleteData}
        handleMarkerClick={handleMarkerClick}
      ></Popup>
    </Card>
  );
  if (building.buildingNumber) {
  }
}
