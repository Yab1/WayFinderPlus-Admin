import { Fragment, useEffect } from "react";
import { object, string } from "yup";
import { Box } from "@mui/material";
import {
  DrawControl,
  DrawerOpener,
  MapConfig,
} from "@/features/studio/mapbox/componnets/controls";
import { Map, Form } from "@/features/studio/mapbox/componnets/widgets";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCompundConfig,
  createCompound,
  toggleDrawer,
} from "@/redux/slices";
import {
  calculateCenter,
  createBoundingBox,
} from "@/features/studio/mapbox/functions";

function MapDefinition() {
  const { compundConfig } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  const onUpdate = (e) => {
    const coordinates = e.features[0].geometry.coordinates[0];

    const center = calculateCenter(coordinates);
    const boundary = createBoundingBox(coordinates);

    dispatch(
      createCompound({
        longitude: center[0],
        latitude: center[1],
        bounds: boundary,
      })
    );

    dispatch(toggleDrawer(true));
  };

  const onDelete = () => {
    dispatch(resetCompundConfig());
    dispatch(toggleDrawer(false));
  };

  const formFields = [
    {
      id: "name",
      type: "text",
      label: "Enter Name",
      required: true,
      multiline: false,
      maxRows: 0,
    },
    {
      id: "description",
      type: "text",
      label: "Enter Description",
      required: false,
      multiline: true,
      maxRows: 5,
    },
  ];

  const validationSchema = object().shape({
    name: string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters")
      .max(50, "Name must not exceed 50 characters"),
    description: string().max(
      150,
      "Description must not exceed 150 characters"
    ),
  });

  useEffect(() => {
    const button = document.querySelector(".mapbox-gl-draw_polygon");
    if (button) button.disabled = Boolean(compundConfig.bounds);
  }, [compundConfig]);

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <DrawerOpener />

        <Form
          initialValues={{ name: "", description: "" }}
          formFields={formFields}
          validationSchema={validationSchema}
        />

        <Map>
          <DrawControl
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <MapConfig />
        </Map>
      </Box>
    </Fragment>
  );
}

MapDefinition.displayName =
  "/src/features/studio/map-toolbox/map-definition/MapDefinition.jsx";

export default MapDefinition;
