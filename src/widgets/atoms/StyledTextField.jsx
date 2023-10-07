import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)`
  & label {
    color: #424242;
  }
  & label.Mui-focused {
    color: #616161;
  }
  & .MuiInputBase-root {
    color: white;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #616161;
  }
  & .MuiInput-underline:before {
    border-bottom-color: #424242;
  }
  &:hover .MuiInput-underline:before {
    border-bottom-color: #757575;
  }
`;

export default StyledTextField;
