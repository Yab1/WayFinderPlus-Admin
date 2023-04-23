import { BuildingsContext } from "../contexts/BuildingsContext";
import Row from "../shared/row";

// MUI Components
import StyledCard from "../shared/card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Dataset() {
  return (
    <BuildingsContext.Consumer>
      {context => {
        const { buildings, deleteData } = context;
        return (
          <StyledCard>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Building Number</TableCell>
                    <TableCell align="right">Building Category</TableCell>
                    <TableCell align="right">Building Name</TableCell>
                    <TableCell align="right">Building Description</TableCell>
                    <TableCell align="right">created_at</TableCell>
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
