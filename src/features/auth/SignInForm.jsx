//Redux and Formik
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Formik
import { useFormik } from "formik";
import { object, string } from "yup";

//Components and Slices
import { getUserCredentials } from "./authSlice";
import { togglePasswordVisibility, toggleLoginSnackbar } from "@/redux/slices";
import { Alert } from "@/atoms";

//MUI Components
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import LoadingButton from "@mui/lab/LoadingButton";

//MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

function SignInForm() {
  const { status, error, isLogged } = useSelector((state) => state.auth);
  const { showPassword, loginSnackbar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  let isLoading = false;

  const validationSchema = object({
    email: string()
      .email("Invalid Email Format")
      .required("Email field is required"),
    password: string().required("Password field is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (status !== "pending") {
        dispatch(
          getUserCredentials({
            email: values.email,
            password: values.password,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (status === "failed") {
      dispatch(toggleLoginSnackbar({ open: true, message: error }));
    }
  }, [status]);

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={loginSnackbar.open}
        autoHideDuration={6000}
        sx={{ mt: 8 }}
        onClose={() =>
          dispatch(toggleLoginSnackbar({ open: false, message: "" }))
        }
      >
        <Alert severity={loginSnackbar.severity} sx={{ width: "100%" }}>
          {loginSnackbar.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={!isLogged}
        className="visuals"
        style={isLogged ? { display: "none" } : { display: "block" }}
        sx={{ position: "absolute", zIndex: "tooltip" }}
      >
        <DialogTitle sx={{ mx: "auto", pb: 0 }}>Admin Login</DialogTitle>
        <DialogContent
          sx={{
            width: { md: 400 },
          }}
        >
          <DialogActions>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                sx={{
                  mt: 1,
                  width: "100%",
                }}
              />

              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                sx={{ width: "100%", mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => dispatch(togglePasswordVisibility())}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                type="submit"
                loading={status === "loading"}
                loadingPosition="end"
                endIcon={<LoginIcon />}
                variant="contained"
                sx={{ width: 100 }}
              >
                <span>Login</span>
              </LoadingButton>
            </form>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

SignInForm.displayName = "/src/features/auth/SignInForm.tsx";

export default SignInForm;
