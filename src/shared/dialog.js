import { useContext, useState, forwardRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PropTypes from "prop-types";

// MUI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Popup({ open, building, handleClose, deleteData, handleMarkerClick }) {
  const { logged } = useContext(AuthContext);
  const [snackOpen, setSnackOpen] = useState(false);
  const [error, setError] = useState({
    location: false,
    number: false,
    category: false,
    type: false,
  });
  const [snack, setSnack] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          Are you sure you want to delete a building with:-
          <List dense={true}>
            <ListItem>
              <ListItemText>
                Building Number: {building.buildingNumber}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Building Category: {building.buildingCategory}
              </ListItemText>
            </ListItem>
            {building.buildingName !== "unnamed" && (
              <ListItem>
                <ListItemText>
                  Building Name: {building.buildingName}
                </ListItemText>
              </ListItem>
            )}
            <ListItem>
              <ListItemText>Created at: {building.created_at}</ListItemText>
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mr: "auto", color: "error.light" }}
          onClick={() => {
            if (logged) {
              deleteData(building.id, logged);
              handleMarkerClick();
            } else {
              setSnackOpen(!snackOpen);
            }
          }}
        >
          Delete
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      <Snackbar
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
      </Snackbar>
    </Dialog>
  );
}

Popup.prototypes = {
  open: PropTypes.bool.isRequired,
  building: PropTypes.object,
  handleClose: PropTypes.func,
  deleteData: PropTypes.func,
  handleMarkerClick: PropTypes.func,
};
Popup.defaultProps = {
  open: false,
  building: null,
  handleClose: () => {},
  deleteData: () => {},
  handleMarkerClick: () => {},
};

export default Popup;
