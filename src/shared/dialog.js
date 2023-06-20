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

function Popup({ open, building, handleClose, deleteData, handleMarkerClick }) {
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
            deleteData(building.id);
            handleMarkerClick();
          }}
        >
          Delete
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
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
