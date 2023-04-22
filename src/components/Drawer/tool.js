import PropTypes from "prop-types";

// MUI Components
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

//MUI Icons
import EventIcon from "@mui/icons-material/Event";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import FeedIcon from "@mui/icons-material/Feed";

// MUI Colors
import { grey } from "@mui/material/colors";

const drawerWidth = 60;
const drawerHeight = "94%";

function Tool({ icon: { title, iconMUI, key } }) {
  // Functions
  const changeWindow = () => {
    console.log("clicked");
  };

  return (
    <Tooltip title={title} placement="right" disableInteractive>
      <IconButton
        key={key}
        onClick={changeWindow}
        sx={{
          justifyContent: "flex-start",
          color: grey[50],
          width: 65,
          // my: 1,
          marginLeft: 3,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          transition: "background 600ms linear,color 250ms linear",
          "&:hover": {
            bgcolor: "transparent",
            color: grey[900],
          },
          "&:focus": {
            bgcolor: "#ffffff",
            color: grey[900],
          },
        }}
      >
        {iconMUI}
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
