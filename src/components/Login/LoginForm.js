import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

//MUI Components
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

//MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        const { currentUser, userInput, errorMsg, handleChange, login } =
          context;
        const handleError = () => {
          setEmailError(false);
          setPassError(false);
          if (errorMsg === "wrong-password") {
            setPassError(!passError);
          } else if (errorMsg !== "") {
            setEmailError(!emailError);
            setPassError(!passError);
          }
        };
        return (
          <Dialog
            open={true}
            className="visuals"
            sx={{ position: "absolute", zIndex: "tooltip" }}
          >
            <DialogTitle sx={{ mx: "auto", pb: 0 }}>Admin Login</DialogTitle>
            <DialogContent
              sx={{
                width: { md: 400 },
              }}
            >
              {!currentUser && errorMsg !== "" && (
                <DialogContentText
                  variant="body2"
                  color="error"
                  sx={{
                    position: "relative",
                    top: 18,
                    right: "5%",
                    textAlign: "end",
                  }}
                >
                  {errorMsg}
                </DialogContentText>
              )}
              <DialogActions>
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <TextField
                    error={emailError}
                    id="email"
                    label="Email"
                    type="text"
                    value={userInput.email}
                    onChange={handleChange}
                    sx={{
                      mt: 1,
                    }}
                  />
                  <FormControl variant="outlined">
                    <InputLabel
                      error={passError}
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={passError}
                      id="password"
                      value={userInput.password}
                      onChange={(e) => handleChange(e)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handlePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff color={passError ? "error" : ""} />
                            ) : (
                              <Visibility color={passError ? "error" : ""} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Stack
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      sx={{ width: 50 }}
                      onClick={() => {
                        handleError();
                        login();
                      }}
                    >
                      Login
                    </Button>
                    <Button onClick={() => navigate(-1)}>
                      <DialogContentText id="alert-dialog-description">
                        Not an Admin?
                      </DialogContentText>
                    </Button>
                  </Stack>
                </Stack>
              </DialogActions>
            </DialogContent>
          </Dialog>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default LoginForm;
