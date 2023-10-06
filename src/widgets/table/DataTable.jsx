import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Cell, Row } from "./atoms";

function DataTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
      <Table aria-label="table of buildings data">
        <TableHead sx={{ bg: "primary.main" }}>
          <TableRow>
            <Cell />
          </TableRow>
        </TableHead>
        <TableBody>
          <Row />
          {/* {buildingsData &&
            buildingsData.map((building) => (
              <Row
                key={building.id}
                building={building}
                deleteData={deleteData}
              />
            ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.displayName = "/src/widgets/table/DataTable.jsx";

export default DataTable;
