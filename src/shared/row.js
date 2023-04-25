import { useState } from "react";
import Popup from "./dialog";

// MUI Components, Colors and Icons
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";

export default function Row({ building, id, deleteData }) {
  const [open, setOpen] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const style = {
    color: grey[500],
  };

  const handleClose = () => setOpen(!open);
  return (
    <StyledTableRow sx={{ "& > *": { pt: 0 } }}>
      <TableCell align="left">{building.buildingNumber}</TableCell>
      <TableCell align="left">{building.buildingCategory}</TableCell>
      <TableCell
        align="left"
        sx={building.buildingName === "unnamed" ? style : null}
      >
        {building.buildingName}
      </TableCell>
      <TableCell
        align="left"
        sx={building.buildingDescription === "No Data" ? style : null}
      >
        {building.buildingDescription}
      </TableCell>
      <TableCell align="left">{building.created_at}</TableCell>
      <TableCell>
        <IconButton
          aria-label="delete row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          <DeleteOutlineIcon
            sx={{
              "&:hover": { color: "error.main" },
              color: open && "error.main",
            }}
          />
        </IconButton>
        <Popup
          open={open}
          building={building}
          handleClose={handleClose}
          deleteData={deleteData}
        ></Popup>
      </TableCell>
    </StyledTableRow>
  );
}
