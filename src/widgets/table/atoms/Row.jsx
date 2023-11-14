import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markDataForDeletion } from "@/redux/slices";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  color: grey[500],
};

function Row() {
  const { data, dataToDelete } = useSelector((state) => state.buildingData);
  const dispatch = useDispatch();

  const renderRow =
    data &&
    data.map(
      ({
        id,
        buildingNumber,
        buildingCategory,
        buildingName,
        buildingDescription,
        created_at,
      }) => (
        <StyledTableRow key={id} sx={{ "& > *": { pt: 0 } }}>
          <TableCell align="left" width="10%" sx={{ fontSize: 12 }}>
            {buildingNumber}
          </TableCell>
          <TableCell align="left" width="14%" sx={{ fontSize: 12 }}>
            {buildingCategory}
          </TableCell>
          <TableCell
            align="left"
            sx={
              (buildingName === "unnamed"
                ? style
                : { textTransform: "capitalize" },
              { fontSize: 12 })
            }
            width="15%"
          >
            {buildingName}
          </TableCell>

          <TableCell
            align="left"
            width="45%"
            sx={buildingDescription === "No Data" ? style : { fontSize: 12 }}
          >
            {buildingDescription}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: 12 }}>
            {created_at}
          </TableCell>
          <TableCell>
            <IconButton
              aria-label="delete the current row"
              size="small"
              onClick={() => dispatch(markDataForDeletion(id))}
            >
              <DeleteOutlineIcon
                sx={{
                  "&:hover": { color: "error.main" },
                  color:
                    dataToDelete && dataToDelete.id === id ? "error.main" : "",
                }}
              />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      )
    );

  return <Fragment>{renderRow}</Fragment>;
}

Row.displayName = "/src/widgets/table/atoms/Row.jsx";

export default Row;
