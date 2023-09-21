import { useState, forwardRef, useContext, useEffect } from "react";
import { MapContext } from "../contexts/MapContext";
import { AuthContext } from "../contexts/AuthContext";
import { BucketContext } from "../contexts/BucketContext";
import categories from "../utils/categories";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

// MUI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditorWindow({ poi, handlePoi, marker }) {
  const [error, setError] = useState({
    location: false,
    number: false,
    category: false,
    type: false,
  });
  const [snack, setSnack] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  const [disable, setDisable] = useState(false);

  const { logged } = useContext(AuthContext);

  const { uploadImage, downloadURL, uploadError, trigger } =
    useContext(BucketContext);

  const { open, severity, message } = snack;
  let middleMan;

  useEffect(() => {
    if (downloadURL && submitDisabled === true) {
      handlePoi((prevPoi) => ({
        ...prevPoi,
        url: downloadURL,
      }));
      middleMan();
    }
  }, [downloadURL]);

  const handleError = () => {
    if (logged) {
      setError({
        location: false,
        number: false,
        category: false,
        type: false,
      });
      if (
        poi.buildingCategory === "Area" ||
        poi.buildingCategory === "Parking Area"
      ) {
        setError((prevError) => ({ ...prevError, number: false }));
      } else if (poi.buildingNumber === "") {
        setError((prevError) => ({ ...prevError, number: !prevError.number }));
      }
      poi.geoHash === "" &&
        openSnack({
          severity: "error",
          message: "Please select a location on the map!",
        });
      poi.buildingCategory === "" &&
        setError((prevError) => ({
          ...prevError,
          category: !prevError.category,
        }));
      if (image) {
        image[0] &&
          !imageType &&
          setError((prevError) => ({
            ...prevError,
            type: !prevError.type,
          }));
      }
    } else {
      openSnack({
        severity: "info",
        message: "Sorry, only admins are allowed to add data.",
      });
    }
  };
  const stopImageUpload = () => {
    setImage(null);
    setImageType("");
  };

  const checkForDuplication = (buildingNumber, buildingsData) => {
    const duplicatedArr = buildingsData.filter(
      (building) => building.buildingNumber === buildingNumber
    );
    if (duplicatedArr.length === 0) {
      setDuplicated(false);
    } else {
      setDuplicated(true);
    }
  };

  const setDisableState = (category) => {
    if (category === "Area" || category === "Parking Area") {
      setDisable(true);
      handlePoi((prevPoi) => ({
        ...prevPoi,
        buildingNumber: "Building number not required",
      }));
    } else {
      setDisable(false);
      handlePoi((prevPoi) => ({
        ...prevPoi,
        buildingNumber: "",
      }));
    }
  };

  const reset = () => {
    trigger();
    setImage(null);
    setImageType("");
    handlePoi({
      url: "",
      geoHash: "",
      buildingName: "",
      buildingNumber: "",
      buildingCategory: "",
      buildingDescription: "",
    });
    setError((prevError) => ({
      ...prevError,
      type: false,
    }));
  };
  const openSnack = (newSnack) => {
    setSnack((prevSnack) => ({ ...prevSnack, ...newSnack, open: true }));
  };
  const closeSnack = () => {
    setSnack({ ...snack, open: false });
  };
  return (
    <MapContext.Consumer>
      {(context) => {
        const { addData, buildingsData } = context;
        middleMan = () => {
          if (logged) {
            if (duplicated) {
              openSnack({
                severity: "error",
                message:
                  "Duplicate building number. Please choose a unique number.",
              });
            } else {
              if (
                poi.geoHash &&
                poi.buildingNumber &&
                poi.buildingCategory &&
                image &&
                imageType
              ) {
                uploadImage(image[0], poi.buildingNumber, imageType);
                setSubmitDisabled(true);
                openSnack({
                  severity: "warning",
                  message:
                    "Upload in progress. Check your internet connection if it takes longer than usual!",
                });
                if (poi.url) {
                  addData(poi, logged);
                  if (marker) {
                    marker.remove();
                  }
                  reset();
                  openSnack({
                    severity: "success",
                    message: "Data saved successfully!",
                  });
                  setSubmitDisabled(false);
                } else {
                  if (uploadError) {
                    openSnack({
                      severity: "error",
                      message: uploadError,
                    });
                  }
                }
              } else if (
                poi.geoHash &&
                poi.buildingNumber &&
                poi.buildingCategory &&
                !image &&
                !imageType
              ) {
                setSubmitDisabled(true);
                addData(poi);
                openSnack({
                  severity: "success",
                  message: "Data saved successfully!",
                });
                reset();
                if (marker) {
                  marker.remove();
                }
                setSubmitDisabled(false);
              }
            }
          } else {
            openSnack({
              severity: "info",
              message: "Sorry, only admins are allowed to add data.",
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
                  lg: "20%",
                  xl: "20%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  disabled={submitDisabled || disable}
                  error={error.number}
                  required
                  fullWidth
                  variant="standard"
                  id="buildingNumber"
                  type={disable ? "text" : "number"}
                  label="Building Number"
                  value={poi.buildingNumber}
                  onChange={(e) => {
                    handlePoi((prevPoi) => ({
                      ...prevPoi,
                      buildingNumber: e.target.value,
                    }));
                    checkForDuplication(e.target.value, buildingsData);
                  }}
                />
                <TextField
                  disabled={submitDisabled}
                  error={error.category}
                  id="buildingCategory"
                  required
                  fullWidth
                  variant="standard"
                  select
                  label="Building Category"
                  defaultValue=""
                  value={poi.buildingCategory}
                  onChange={(e) => {
                    setDisableState(e.target.value);
                    handlePoi((prevPoi) => ({
                      ...prevPoi,
                      buildingCategory: e.target.value,
                    }));
                  }}
                >
                  {categories.map((option) => (
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
                  disabled={submitDisabled}
                  id="buildingName"
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Building Name"
                  value={poi.buildingName}
                  onChange={(e) =>
                    handlePoi((prevPoi) => ({
                      ...prevPoi,
                      buildingName: e.target.value,
                    }))
                  }
                />
                <TextField
                  disabled={submitDisabled}
                  id="buildingDescription"
                  label="Building Description"
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={poi.buildingDescription}
                  onChange={(e) =>
                    handlePoi((prevPoi) => ({
                      ...prevPoi,
                      buildingDescription: e.target.value,
                    }))
                  }
                />
                {image && (
                  <>
                    <Chip
                      label={image[0].name}
                      onDelete={stopImageUpload}
                      disabled={submitDisabled}
                    />
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      disabled={submitDisabled}
                    >
                      <InputLabel
                        error={error.type}
                        required
                        id="demo-select-small-label"
                        sx={{ backgroundColor: "white", paddingRight: "0.2em" }}
                      >
                        Image Type
                      </InputLabel>
                      <Select
                        error={error.type}
                        value={imageType}
                        label="Image Type"
                        onChange={(e) => setImageType(e.target.value)}
                      >
                        <MenuItem value="indoor">Indoor</MenuItem>
                        <MenuItem value="streetView">Street View</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}{" "}
                {!image && (
                  <Button
                    disabled={submitDisabled}
                    id="pictureInput"
                    variant="outlined"
                    component="label"
                    endIcon={<PhotoCamera />}
                    onChange={(e) => setImage(e.target.files)}
                  >
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                )}
              </Stack>
              <LoadingButton
                onClick={() => {
                  middleMan();
                  handleError();
                }}
                endIcon={<SendIcon />}
                loading={submitDisabled}
                loadingPosition="end"
                variant="contained"
                sx={{ width: "50%", mx: "auto", mt: 3 }}
              >
                <span>Submit</span>
              </LoadingButton>
            </Box>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open}
              autoHideDuration={6000}
              sx={{ marginBottom: "1.4em", marginLeft: "3.5em" }}
              onClose={closeSnack}
            >
              <Alert
                onClose={closeSnack}
                severity={severity}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </>
        );
      }}
    </MapContext.Consumer>
  );
}
export default EditorWindow;
