import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";

const StyledInputLabel = styled(InputLabel)`
  color: #424242; // Text color
  &.Mui-focused {
    color: #616161; // Text color when focused
  }
`;

export default StyledInputLabel;
