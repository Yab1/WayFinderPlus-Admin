import { Fragment, useEffect } from "react";
import { object, string } from "yup";
import { Box } from "@mui/material";
import {
  DrawControl,
  DrawerOpener,
} from "@/features/studio/mapbox/componnets/controls";
import { Map, Form } from "@/features/studio/mapbox/componnets/widgets";
import { useDispatch, useSelector } from "react-redux";
import { setBounds, toggleDrawer } from "@/redux/slices";

function MapDefinition() {
  const { newBounds } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  const onUpdate = (e) => {
    const coordinates = e.features[0].geometry.coordinates[0];

    const newBounds = [coordinates[3], coordinates[1]].map((item) => [
      Number(item[0].toFixed(1)),
      Number(item[1].toFixed(1)),
    ]);

    dispatch(setBounds([newBounds]));
    dispatch(toggleDrawer(true));
  };

  const onDelete = () => {
    dispatch(setBounds(null));
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
    if (button) button.disabled = Boolean(newBounds);
  }, [newBounds]);

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
        </Map>
      </Box>
    </Fragment>
  );
}

MapDefinition.displayName =
  "/src/features/studio/map-toolbox/map-definition/MapDefinition.jsx";

export default MapDefinition;
