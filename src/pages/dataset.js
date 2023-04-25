import { BuildingsContext } from "../contexts/BuildingsContext";
import Row from "../shared/row";

// MUI Components
import { styled } from "@mui/material/styles";
import StyledCard from "../shared/card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Dataset() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.MuiTableCell-head`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }));

  return (
    <BuildingsContext.Consumer>
      {context => {
        const { buildings, deleteData } = context;
        return (
          <StyledCard start={true}>
            <TableContainer component={Paper}>
              <Table aria-label="buildings dataset table">
                <TableHead sx={{ bg: "primary.main" }}>
                  <TableRow>
                    <StyledTableCell align="left">
                      Building Number
                    </StyledTableCell>
                    <StyledTableCell align="left">Category</StyledTableCell>
                    <StyledTableCell align="left">
                      Building Name
                    </StyledTableCell>
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell align="left">Created at</StyledTableCell>
                    <StyledTableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buildings &&
                    buildings.map(building => (
                      <Row
                        key={building.id}
                        building={building}
                        deleteData={deleteData}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledCard>
        );
      }}
    </BuildingsContext.Consumer>
  );
}
