import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { categories } from "@/constants";
import { grey } from "@mui/material/colors";
import { selectBuildingType } from "@/slices";

function CategoriesCard() {
  const { coordinates, selectedBuildingType } = useSelector(
    (state) => state.buildingData
  );
  const dispatch = useDispatch();

  const renderCategories = categories.map(({ key, value }) => (
    <Typography
      key={key}
      component="span"
      variant="body2"
      sx={{
        color: grey[800],
        textTransform: "capitalize",
        cursor: "pointer",
        paddingLeft: 1,
        borderLeft: selectedBuildingType === value ? 1 : 0,
        "&:hover": {
          borderLeft: 1,
        },
      }}
      onClick={() => dispatch(selectBuildingType(value))}
    >
      {value}
    </Typography>
  ));

  return (
    <Fragment>
      {Boolean(coordinates) ? (
        <Box
          component="div"
          sx={{
            zIndex: "drawer",
            height: 420,
            width: "fit-content",
            ml: "auto",
            mt: 8,
            mb: 5,
            mr: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // boxShadow: 3,
            // borderRadius: "16px",
            // display: "grid",
          }}
        >
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: "bold" }}
          >
            Select Type
          </Typography>

          {renderCategories}
        </Box>
      ) : null}
    </Fragment>
  );
}

CategoriesCard.displayName = "/src/widgets/cards/CategoriesCard.jsx";

export default CategoriesCard;
