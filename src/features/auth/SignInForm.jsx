import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";

// import { getUserCredentials } from "./authSlice";
import { togglePasswordVisibility, toggleLoginSnackbar } from "@/redux/slices";
import { Alert } from "@/atoms";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";

function SignInForm() {
  // const { status, error, isLogged } = useSelector((state) => state.auth);
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
      console.log(values);
    },
  });

  // useEffect(() => {
  //   if (status === "failed") {
  //     dispatch(toggleLoginSnackbar({ open: true, message: error }));
  //   }
  // }, [status]);

  return (
    <Box>
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
          error={formik.touched.password && Boolean(formik.errors.password)}
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
          // loading={status === "loading"}
          loadingPosition="end"
          endIcon={<Login />}
          variant="contained"
          sx={{ width: 100, bgcolor: blueGrey[800] }}
        >
          <span>Login</span>
        </LoadingButton>
      </form>
    </Box>
  );
}

SignInForm.displayName = "/src/features/auth/SignInForm.tsx";

export default SignInForm;
