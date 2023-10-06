import { useSelector, useDispatch } from "react-redux";
import { markDataForDeletion } from "@/slices";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function DeleteConfirmationDialog() {
  const { dataToDelete } = useSelector((state) => state.buildingData);
  const dispatch = useDispatch();

  console.log(Boolean(dataToDelete));
  console.log(Object.keys(dataToDelete).length === 0);

  return (
    <Dialog open={Object.keys(dataToDelete).length > 0}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          Are you sure you want to delete a building with:-
          <List dense={true} sx={{ textTransform: "capitalize" }}>
            <ListItem>
              <ListItemText>
                Building Number:{" "}
                <Typography variant="paragraph" sx={{ color: "black" }}>
                  {dataToDelete.buildingNumber}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Building Category:{" "}
                <Typography variant="paragraph" sx={{ color: "black" }}>
                  {dataToDelete.buildingCategory}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Building Name:{" "}
                <Typography variant="paragraph" sx={{ color: "black" }}>
                  {dataToDelete.buildingName}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Created at:{" "}
                <Typography variant="paragraph" sx={{ color: "black" }}>
                  {dataToDelete.created_at}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: "auto", color: "error.light" }}>Delete</Button>
        <Button onClick={() => dispatch(markDataForDeletion())}>Close</Button>
      </DialogActions>
      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackOpen}
        autoHideDuration={6000}
        sx={{ marginBottom: "1.4em", marginLeft: "3.5em" }}
        onClose={() => setSnackOpen(!snackOpen)}
      >
        <Alert
          onClose={() => setSnackOpen(!snackOpen)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Sorry, only admins are allowed to delete data.
        </Alert>
      </Snackbar> */}
    </Dialog>
  );
}

DeleteConfirmationDialog.displayName =
  "/src/widgets/cards/DeleteConfirmationDialog.jsx";

export default DeleteConfirmationDialog;
