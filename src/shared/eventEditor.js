import { useState, useContext, useEffect, forwardRef } from "react";
import { EventContext } from "../contexts/EventContext";
import { MapContext } from "../contexts/MapContext";
import eventCategories from "../utils/eventCategories";
import { AuthContext } from "../contexts/AuthContext";

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventEditor({ event, handleEvent, clickedMarkerId }) {
  const [snack, setSnack] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
    severity: "",
    message: "",
  });
  const { currentUser } = useContext(AuthContext);
  const errorMessage = {
    loc: "Please choose a location on the map.",
    cat: "Please select a category for the event.",
    date: "Please choose a valid date for the event.",
    locCat: "Please choose a location and select a category for the event.",
    locDate: "Please choose a location and choose a valid date for the event.",
    catDate: "Please select a category and choose a valid date for the event.",
    all: "Incomplete information. Please fill in all required fields.",
    success: "Event saved successfully!",
  };

  // Context
  const { buildingsData } = useContext(MapContext);

  const { vertical, horizontal, open, severity, message } = snack;

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

  const handleClick = (newSnack) => {
    setSnack((prevSnack) => ({ ...prevSnack, ...newSnack, open: true }));
  };
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  const reset = () => {
    handleEvent({
      geoHash: "",
      startDate: "",
      endDate: "",
      eventCategory: "",
      eventName: "",
      eventDescription: "",
    });
  };

  return (
    <EventContext.Consumer>
      {(context) => {
        const { addData } = context;
        const middleMan = () => {
          if (
            event.geoHash &&
            event.eventCategory &&
            event.startDate &&
            event.endDate
          ) {
            // All conditions are true
            handleClick({
              severity: "success",
              message: errorMessage.success,
            });
            addData(event, currentUser.uid);
            reset();
          } else {
            if (
              !event.geoHash &&
              !event.eventCategory &&
              !event.startDate &&
              !event.endDate
            ) {
              // All conditions are false
              handleClick({
                severity: "error",
                message: errorMessage.all,
              });
            } else if (
              !event.geoHash &&
              event.eventCategory &&
              event.startDate &&
              event.endDate
            ) {
              // Only location is false
              handleClick({
                severity: "error",
                message: errorMessage.loc,
              });
            } else if (
              event.geoHash &&
              !event.eventCategory &&
              event.startDate &&
              event.endDate
            ) {
              // Only category is false
              handleClick({
                severity: "error",
                message: errorMessage.cat,
              });
            } else if (
              event.geoHash &&
              event.eventCategory &&
              (!event.startDate || !event.endDate)
            ) {
              // Only date is false
              handleClick({
                severity: "error",
                message: errorMessage.date,
              });
            } else if (
              !event.geoHash &&
              event.eventCategory &&
              (!event.startDate || !event.endDate)
            ) {
              // Only location and date are false
              handleClick({
                severity: "error",
                message: errorMessage.locDate,
              });
            } else if (
              event.geoHash &&
              !event.eventCategory &&
              (!event.startDate || !event.endDate)
            ) {
              // Only category and date are false
              handleClick({
                severity: "error",
                message: errorMessage.catDate,
              });
            } else if (
              !event.geoHash &&
              !event.eventCategory &&
              (event.startDate || event.endDate)
            ) {
              // Only location and category are false
              handleClick({
                severity: "error",
                message: errorMessage.locCat,
              });
            }
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
                  sm: "45%",
                  md: "35%",
                  lg: "25%",
                  xl: "20%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack spacing={3}>
                <FormControl disabled variant="standard" required>
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
                  required
                  fullWidth
                  variant="standard"
                  select
                  label="Event Category"
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#757575",
                  }}
                >
                  <Stack>
                    <label htmlFor="startDate">Start Date *</label>
                    <input
                      type="date"
                      id="startDate"
                      value={event.startDate}
                      style={{
                        width: "100%",
                        padding: "0.5em",
                      }}
                      onChange={(e) => {
                        handleEvent((prevEvent) => ({
                          ...prevEvent,
                          startDate: e.target.value,
                        }));
                      }}
                    />
                  </Stack>
                  <Stack>
                    <label htmlFor="endDate">End Date *</label>
                    <input
                      type="date"
                      value={event.endDate}
                      id="endDate"
                      style={{
                        width: "100%",
                        padding: "0.5em",
                      }}
                      onChange={(e) => {
                        handleEvent((prevEvent) => ({
                          ...prevEvent,
                          endDate: e.target.value,
                        }));
                      }}
                    ></input>
                  </Stack>
                </Box>
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
              </Stack>
              <Button
                onClick={() => {
                  middleMan();
                }}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ width: "50%", mx: "auto", mt: 3 }}
              >
                Submit
              </Button>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                sx={{ marginBottom: "1.4em", marginLeft: "3.5em" }}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={severity}
                  sx={{ width: "100%" }}
                >
                  {message}
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
