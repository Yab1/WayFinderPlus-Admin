import { useState } from "react";

// MUI Components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// MUI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

function POIEditor() {
  const [poi, setPoi] = useState({
    buildingNumber: "",
    buildingCategory: "",
    buildingName: "",
    buildingDescription: "",
  });
  const [error, setError] = useState({ number: false, category: false });

  const category = [
    { value: "Cafeteria", key: 1 },
    { value: "Class Room", key: 2 },
    { value: "Dormitary", key: 3 },
    { value: "Laboratory", key: 4 },
    { value: "Library", key: 5 },
    { value: "Lounge", key: 6 },
    { value: "Office", key: 7 },
    { value: "Public Toilet", key: 8 },
    { value: "Others", key: 9 },
  ];
  const handleSubmit = () => {
    setError({ number: false, category: false });
    poi.buildingNumber === "" &&
      setError(prevError => ({ ...prevError, number: !prevError.number }));
    poi.buildingCategory === "" &&
      setError(prevError => ({ ...prevError, category: !prevError.category }));

    if (poi.buildingNumber && poi.buildingCategory) {
      console.log(poi);
      setPoi({
        buildingNumber: "",
        buildingCategory: "",
        buildingName: "",
        buildingDescription: "",
      });
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "91%",
        my: 5.5,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, color: "primary.main" }}>
        POI EDITOR
      </Typography>
      <form
        noValidate
        autoCorrect="off"
        style={{
          width: "30%",
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
            onChange={e =>
              setPoi(prevPoi => ({
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
            onChange={e =>
              setPoi(prevPoi => ({
                ...prevPoi,
                buildingCategory: e.target.value,
              }))
            }
          >
            {category.map(option => (
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
            onChange={e =>
              setPoi(prevPoi => ({
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
            onChange={e =>
              setPoi(prevPoi => ({
                ...prevPoi,
                buildingDescription: e.target.value,
              }))
            }
          />
          <Button
            variant="outlined"
            component="label"
            endIcon={<PhotoCamera />}
          >
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Stack>
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ width: "50%", mx: "auto", mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default POIEditor;
