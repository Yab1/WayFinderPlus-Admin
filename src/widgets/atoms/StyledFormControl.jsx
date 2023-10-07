import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

const StyledFormControl = styled(FormControl)`
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

export default StyledFormControl;
