import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SignInForm from "./SignInForm";
import { toggleSignInDialog } from "@/redux/slices";

function AuthDialog() {
  const { isAuthDialogOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={isAuthDialogOpen}
      onClick={() => dispatch(toggleSignInDialog())}
    >
      <DialogTitle sx={{ p: 3, pb: 5, bgcolor: blueGrey[900] }}>
        <Typography variant="h4" component="h1">
          Administrator Login
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: blueGrey[900] }}>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}

AuthDialog.displayName = "/src/features/auth/AuthDialog.jsx";

export default AuthDialog;
