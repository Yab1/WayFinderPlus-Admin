// MUI Components
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  return (
    <Box
      sx={{
        position: "absolute",
        mx: "5%",
        top: 5,
        display: "flex",
        justifyContent: { sm: "flex-start", md: "center" },
        alignItems: "flex-end",
        width: "90%",
      }}
    >
      <SearchIcon
        sx={{ color: "action.active", mr: 1, my: 0.5, transform: "" }}
      />
      <TextField
        placeholder="Search..."
        variant="standard"
        sx={{ width: { md: 300 } }}
      />
    </Box>
  );
}
