import PropTypes from "prop-types";

//MUI Components
import TextField from "@mui/material/TextField";

export default function InputField({
  input: { label, type, value, key },
  handleChange,
}) {
  return (
    type === "text" && (
      <TextField
        id={label}
        key={key}
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
      />
    )
  );
}

InputField.propTypes = {
  input: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};
