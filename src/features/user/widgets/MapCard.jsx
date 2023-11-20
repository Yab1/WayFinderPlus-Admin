import { Card, CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Images } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectMap } from "@/redux/slices";

function MapCard() {
  const { maps } = useSelector((state) => state.firebase);
  const dispatch = useDispatch();

  const renderMaps = maps.map((map) => (
    <Card
      key={map.id}
      sx={{
        minWidth: 280,
      }}
      onClick={() => dispatch(selectMap(map))}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={map.pictureURL}
          alt={`A map of ${map.name}`}
        />
      </CardActionArea>
    </Card>
  ));

  return renderMaps;
}

MapCard.displayName = "/src/features/user/widgets/MapCard.jsx";

export default MapCard;
