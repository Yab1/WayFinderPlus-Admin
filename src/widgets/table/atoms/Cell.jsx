import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
}));

function Cell() {
  const headerNames = [
    "Building No.",
    "Building Category",
    "Name of Building",
    "Building Description",
    "Creation Date",
    "",
  ];
  const renderCells = headerNames.map((header) => (
    <StyledTableCell key={header} align="left">
      {header}
    </StyledTableCell>
  ));

  return renderCells;
}

Cell.displayName = "/src/widgets/table/atoms/Cell.jsx";

export default Cell;
