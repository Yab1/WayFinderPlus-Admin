import { useState } from "react";
import PropTypes from "prop-types";
// import { authentication } from "../../functions/authentication.js";
import { authentication } from "../../firebase/connection";

//MUI Components
import InputField from "../../shared/InputField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

//MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginForm({ handleLog }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    id === "Email"
      ? setUser(prevUser => ({
          ...prevUser,
          email: value,
        }))
      : setUser(prevUser => ({
          ...prevUser,
          password: value,
        }));
  };
  const handleSubmit = e => {
    handleLog();
    authentication(user);

    // setUser({ email: "", password: "" })
  };

  const inputs = [{ label: "Email", type: "text", value: user.email, key: 1 }];
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
        {inputs.map(input => (
          <InputField
            input={input}
            key={input.key}
            handleChange={e => handleChange(e)}
          />
        ))}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            value={user.password}
            onChange={e => handleChange(e)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePasswordVisibility}
                  // onMouseDown={() => console.log("mouse down")}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ px: 3, mx: "auto" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </DialogContent>
    </Dialog>
  );
}

LoginForm.prototype = {
  handleLog: PropTypes.func.isRequired,
};

export default LoginForm;

{
  /* <Stack
  direction="row"
  spacing={12}
  // justifyContent="center"
  alignItems="center"
>
  <FormGroup>
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label="Remember Me"
    />
  </FormGroup>
  <Link href="#" underline="none" sx={{ fontSize: 13 }}>
    Forgot Password
  </Link>
</Stack> */
}
