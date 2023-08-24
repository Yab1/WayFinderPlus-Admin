import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Components
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// MUI Colors
import { grey } from "@mui/material/colors";

const drawerWidth = 65;

function Tool({ icon, activeTab, handleTabs }) {
  const navigate = useNavigate();
  return (
    <Tooltip title={icon.title} placement="right" disableInteractive>
      <IconButton
        disableRipple
        component="button"
        id={icon.key}
        onClick={() => {
          navigate(icon.path);
          handleTabs(icon.key);
        }}
        sx={{
          justifyContent: "flex-start",
          color: grey[50],
          width: drawerWidth,
          marginLeft: 3,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          transition: "background 600ms linear,color 250ms linear",
          "&:hover": {
            color: grey[900],
          },
          ...(activeTab === icon.key
            ? { bgcolor: "#ffffff", color: grey[900] }
            : ""),
          "&:focus": {
            bgcolor: "#ffffff",
            color: grey[900],
          },
        }}
      >
        {icon.iconMUI}
      </IconButton>
    </Tooltip>
  );
}

Tool.prototype = {
  icon: PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
  }),
};

export default Tool;
