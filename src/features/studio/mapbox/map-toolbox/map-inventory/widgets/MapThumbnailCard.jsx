import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccessTime,
  MoreVert,
  Edit,
  Delete,
  FileCopy,
  GifBoxTwoTone,
} from "@mui/icons-material";
import { blueGrey, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setAccountAnchorEl } from "@/redux/slices";

function MapThumbnailCard() {
  const { accountAnchorEl } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const options = [
    {
      name: "Edit",
      icon: <Edit fontSize="small" />,
      action: () => console.log("Clicked"),
    },
    {
      name: "Delete",
      icon: <Delete fontSize="small" />,
      action: () => console.log("Clicked"),
    },
    {
      name: "Duplicate",
      icon: <FileCopy fontSize="small" />,
      action: () => console.log("Clicked"),
    },
  ];

  const renderOptions = options.map(({ name, icon, action }) => (
    <MenuItem
      key={name}
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        color: grey[700],
      }}
      onClick={action}
    >
      {icon}
      {name}
    </MenuItem>
  ));

  return (
    <Card raised>
      <CardActionArea sx={{ display: "flex", height: "fit-content" }}>
        <CardMedia
          component="img"
          sx={{ width: "10%" }}
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Live from space album cover"
        />

        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="div" variant="subtitle1">
              Adama Science and Technology University
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <AccessTime sx={{ fontSize: 20, color: blueGrey[700] }} />
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
              >
                Edited 7 hours ago
              </Typography>
            </Box>
          </Box>

          <Box
            aria-haspopup="true"
            onClick={(event) =>
              dispatch(setAccountAnchorEl(event.currentTarget))
            }
            aria-expanded={Boolean(accountAnchorEl) ? "true" : undefined}
          >
            <MoreVert />
          </Box>

          <Menu
            anchorEl={accountAnchorEl}
            open={Boolean(accountAnchorEl)}
            onClose={() => dispatch(setAccountAnchorEl(null))}
            onClick={() => dispatch(setAccountAnchorEl(null))}
          >
            {renderOptions}
          </Menu>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MapThumbnailCard.displayName =
  "/src/features/studio/widgets/MapThumbnailCard.jsx";

export default MapThumbnailCard;
