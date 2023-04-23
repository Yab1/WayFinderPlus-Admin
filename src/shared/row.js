import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Row({ building, deleteData }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
        <IconButton
          aria-label="delete row"
          size="small"
          onClick={() => deleteData(building.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">{building.buildingNumber}</TableCell>
      <TableCell align="right">{building.buildingCategory}</TableCell>
      <TableCell align="right">{building.buildingName}</TableCell>
      <TableCell align="right">{building.buildingDescription}</TableCell>
      <TableCell align="right">{building.created_at}</TableCell>
    </TableRow>
  );
}
