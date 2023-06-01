import { useState } from "react";
import { BuildingsContext } from "../contexts/BuildingsContext";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// MUI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

function EditorWindow({ coordinates }) {
  const [poi, setPoi] = useState({
    buildingNumber: "",
    buildingCategory: "",
    buildingName: "",
    buildingDescription: "",
  });
  const [error, setError] = useState({ number: false, category: false });

  const category = [
    { value: "Area", key: 0 },
    { value: "Cafeteria", key: 1 },
    { value: "Class Room", key: 2 },
    { value: "Dormitory", key: 3 },
    { value: "Laboratory", key: 4 },
    { value: "Library", key: 5 },
    { value: "Lounge", key: 6 },
    { value: "Office", key: 7 },
    { value: "Public Toilet", key: 8 },
    { value: "Others", key: 9 },
  ];
  const handleError = () => {
    setError({ number: false, category: false });
    poi.buildingNumber === "" &&
      setError((prevError) => ({ ...prevError, number: !prevError.number }));
    poi.buildingCategory === "" &&
      setError((prevError) => ({
        ...prevError,
        category: !prevError.category,
      }));
  };
  return (
    <BuildingsContext.Consumer>
      {(context) => {
        const { addData } = context;
        const middleMan = () => {
          if (poi.buildingNumber && poi.buildingCategory) {
            addData(poi);
            setPoi({
              buildingNumber: "",
              buildingCategory: "",
              buildingName: "",
              buildingDescription: "",
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
                width: {
                  right: "5%",
                  xs: "60%",
                  sm: "60%",
                  md: "40%",
                  lg: "20%",
                  xl: "20%",
                },
                display: "flex",
                flexDirection: "column",
                border: "0.1em solid black",
              }}
            >
              <Typography variant="body2">Building Coordinates</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">
                  longitude: {coordinates.longitude}
                </Typography>
                <Typography variant="caption">
                  latitude: {coordinates.latitude}
                </Typography>
              </Box>
              <Stack spacing={3}>
                <TextField
                  error={error.number}
                  required
                  fullWidth
                  variant="standard"
                  id="buildingNumber"
                  type="number"
                  label="Building Number"
                  value={poi.buildingNumber}
                  onChange={(e) =>
                    setPoi((prevPoi) => ({
                      ...prevPoi,
                      buildingNumber: e.target.value,
                    }))
                  }
                />
                <TextField
                  error={error.category}
                  id="buildingCategory"
                  required
                  fullWidth
                  variant="standard"
                  select
                  label="Building Category"
                  defaultValue=""
                  value={poi.buildingCategory}
                  onChange={(e) =>
                    setPoi((prevPoi) => ({
                      ...prevPoi,
                      buildingCategory: e.target.value,
                    }))
                  }
                >
                  {category.map((option) => (
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
                  id="buildingName"
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Building Name"
                  value={poi.buildingName}
                  onChange={(e) =>
                    setPoi((prevPoi) => ({
                      ...prevPoi,
                      buildingName: e.target.value,
                    }))
                  }
                />
                <TextField
                  id="buildingDescription"
                  label="Building Description"
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={poi.buildingDescription}
                  onChange={(e) =>
                    setPoi((prevPoi) => ({
                      ...prevPoi,
                      buildingDescription: e.target.value,
                    }))
                  }
                />

                <Button
                  disabled
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
                  middleMan();
                  handleError();
                }}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ width: "50%", mx: "auto", mt: 3 }}
              >
                Submit
              </Button>
            </Box>
          </>
        );
      }}
    </BuildingsContext.Consumer>
  );
}

export default EditorWindow;
