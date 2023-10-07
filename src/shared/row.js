import { useState } from "react";
import Popup from "./dialog";

export default function Row({ building, id, deleteData }) {
  const [open, setOpen] = useState(false);

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
      {/* <TableCell
        align="left"
        sx={building.buildingDescription === "No Data" ? style : null}
      >
        {building.buildingDescription}
      </TableCell> */}
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
