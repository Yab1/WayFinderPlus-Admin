import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";

//MUI Components
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

//MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginForm({ handleLog }) {
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthContext.Consumer>
      {context => {
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
            <DialogContent
              sx={{
                width: 400,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ mx: "auto", mb: 2 }}>
                CNS-Admin-Login
              </Typography>
              {!currentUser && errorMsg !== "" && (
                <Typography
                  border={1}
                  variant="body2"
                  color="error"
                  sx={{
                    borderStyle: "dashed",
                    borderRadius: 2,
                    textAlign: "center",
                    p: 1,
                    mb: 3,
                    transition: "all 1000ms ease-in",
                  }}
                >
                  {errorMsg}
                </Typography>
              )}
              <TextField
                error={emailError}
                id="email"
                label="Email"
                type="text"
                value={userInput.email}
                onChange={handleChange}
                sx={{
                  bg: "none",
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
                  onChange={e => handleChange(e)}
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
              <Button
                variant="contained"
                sx={{ px: 3, mx: "auto" }}
                onClick={() => {
                  handleError();
                  login();
                }}
              >
                Login
              </Button>
            </DialogContent>
          </Dialog>
        );
      }}
    </AuthContext.Consumer>
  );
}

LoginForm.prototype = {
  handleLog: PropTypes.func.isRequired,
};

export default LoginForm;
