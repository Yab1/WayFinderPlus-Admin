import { useState, useContext, useEffect, forwardRef } from "react";
import { EventContext } from "../contexts/EventContext";
import { MapContext } from "../contexts/MapContext";
import eventCategories from "../utils/eventCategories";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// MUI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { ElectricalServicesOutlined } from "@mui/icons-material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventEditor({ event, handleEvent, clickedMarkerId }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    location: false,
    category: false,
    startDate: false,
    endDate: false,
  });

  // Context
  const { buildingsData } = useContext(MapContext);

  let markerArr = [];
  if (buildingsData !== []) {
    markerArr = buildingsData.filter(
      (building) => building.id === clickedMarkerId
    );
  }
  let building = {};

  if (markerArr[0]) {
    const { id, buildingNumber, buildingName, geoHash } = markerArr[0];
    building = {
      id,
      buildingNumber,
      buildingName,
      geoHash,
    };
  }

  useEffect(() => {
    handleEvent((prevEvent) => ({
      ...prevEvent,
      geoHash: building.geoHash,
    }));
  }, [building.geoHash]);

  const handleError = () => {
    setError({
      location: true,
      category: false,
      startDate: false,
      endDate: false,
    });
    event.geoHash === false &&
      setError((prevError) => ({
        ...prevError,
        location: !prevError.location,
      }));
    event.eventCategory === "" &&
      setError((prevError) => ({
        ...prevError,
        category: !prevError.category,
      }));
    event.startDate === "" &&
      setError((prevError) => ({
        ...prevError,
        startDate: !prevError.startDate,
      }));
    event.endDate === "" &&
      setError((prevError) => ({
        ...prevError,
        endDate: !prevError.endDate,
      }));
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <EventContext.Consumer>
      {(context) => {
        const { addData } = context;
        const middleMan = () => {
          if (event.geoHash && event.eventCategory) {
            building.buildingNumber = "";
            console.log(event);
            // addData(event);
            handleEvent({
              geoHash: "",
              eventCategory: "",
              eventName: "",
              eventDescription: "",
            });
          }
        };
        return (
          <>
            <Box
              component="form"
              noValidate
              autoCorrect="off"
              sx={{
                position: "absolute",
                background: "white",
                padding: "20px",
                right: "5%",
                width: {
                  xs: "60%",
                  sm: "60%",
                  md: "40%",
                  lg: "25%",
                  xl: "25%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack spacing={3}>
                <FormControl disabled variant="standard">
                  <InputLabel htmlFor="component-disabled">
                    Event Location
                  </InputLabel>
                  <Input
                    id="component-disabled"
                    value={
                      building.buildingName ||
                      "Please choose a location from the map."
                    }
                  />
                </FormControl>
                <TextField
                  id="eventName"
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Event Name"
                  value={event.eventName}
                  onChange={(e) =>
                    handleEvent((prevEvent) => ({
                      ...prevEvent,
                      eventName: e.target.value,
                    }))
                  }
                />
                <TextField
                  id="eventCategory"
                  error={error.category}
                  required
                  fullWidth
                  variant="standard"
                  select
                  label="Building Category"
                  defaultValue=""
                  value={event.eventCategory}
                  onChange={(e) =>
                    handleEvent((prevEvent) => ({
                      ...prevEvent,
                      eventCategory: e.target.value,
                    }))
                  }
                >
                  {eventCategories.map((option) => (
                    <MenuItem
                      key={option.key}
                      value={option.value}
                      sx={{ fontSize: 13 }}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="eventDescription"
                  label="Building Description"
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={event.eventDescription}
                  onChange={(e) =>
                    handleEvent((prevEvent) => ({
                      ...prevEvent,
                      eventDescription: e.target.value,
                    }))
                  }
                />

                <Button
                  id="pictureInput"
                  variant="outlined"
                  component="label"
                  endIcon={<PhotoCamera />}
                >
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Stack>
              <Button
                onClick={() => {
                  handleError();
                  middleMan();
                  handleClick();
                }}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ width: "50%", mx: "auto", mt: 3 }}
              >
                Submit
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            </Box>
          </>
        );
      }}
    </EventContext.Consumer>
  );
}

export default EventEditor;
