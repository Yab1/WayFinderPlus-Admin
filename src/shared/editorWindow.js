import { useState } from "react";
import { MapContext } from "../contexts/MapContext";
import categories from "../utils/categories";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// MUI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

function EditorWindow({ poi, handlePoi, marker }) {
  const [error, setError] = useState({ number: false, category: false });

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
    <MapContext.Consumer>
      {(context) => {
        const { addData } = context;
        const middleMan = () => {
          if (poi.geoHash && poi.buildingNumber && poi.buildingCategory) {
            addData(poi);
            if (marker) {
              marker.remove();
            }
            handlePoi({
              geoHash: "",
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
                  error={error.number}
                  required
                  fullWidth
                  variant="standard"
                  id="buildingNumber"
                  type="number"
                  label="Building Number"
                  value={poi.buildingNumber}
                  onChange={(e) =>
                    handlePoi((prevPoi) => ({
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
                    handlePoi((prevPoi) => ({
                      ...prevPoi,
                      buildingCategory: e.target.value,
                    }))
                  }
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
    </MapContext.Consumer>
  );
}

export default EditorWindow;
