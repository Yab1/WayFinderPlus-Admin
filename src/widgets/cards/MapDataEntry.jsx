import { Fragment, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { object, string, number, mixed } from "yup";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledTextField,
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
} from "@/widgets/atoms";
import { useSelector, useDispatch } from "react-redux";
import { fileReader, selectBuildingType, uploadImage } from "@/slices";

function MapDataEntry() {
  const inputRef = useRef(null);
  const { coordinates, selectedBuildingType } = useSelector(
    (state) => state.buildingData
  );
  const { selectedFile, image, url, uploadStatus, uploadedProcess } =
    useSelector((state) => state.bucket);
  const dispatch = useDispatch();

  const validationSchema = object({
    // buildingNumber: number()
    //   .required("Building Number is required")
    //   .typeError("Building Number must be a valid number"),
  });

  const formik = useFormik({
    initialValues: {
      imageUrl: url,
      coordinates: coordinates,
      buildingNumber: "",
      buildingName: "",
      buildingCategory: selectedBuildingType,
      buildingDescription: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(uploadImage());
      if (uploadStatus === "succeeded" && values.imageUrl) {
        console.log(values);
      }
    },
  });

  useEffect(() => {
    console.log(uploadedProcess + "% done");
  }, [uploadedProcess]);

  useEffect(() => {
    console.log(url);
  }, [url]);

  useEffect(() => {
    console.log(uploadStatus);
  }, [uploadStatus]);

  return (
    <Fragment>
      {selectedBuildingType ? (
        <Box
          component="div"
          sx={{
            backgroundColor: "black",
            zIndex: "drawer",
            height: "100%",
            width: 350,
            pt: 2,
            px: 5,
          }}
        >
          <IconButton
            aria-label="close editor window"
            size="small"
            sx={{ mr: "auto", float: "right" }}
            onClick={() => dispatch(selectBuildingType(null))}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>

          <form className="data-entry-form" onSubmit={formik.handleSubmit}>
            <ImageButton
              focusRipple
              style={{
                width: "40%",
              }}
              onClick={() => inputRef.current.click()}
            >
              <ImageSrc
                style={{
                  backgroundImage: `url(${selectedFile})`,
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Add image
                  <input
                    ref={inputRef}
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    id="image"
                    onChange={(e) => dispatch(fileReader(e.target.files[0]))}
                  />
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
            <StyledTextField
              fullWidth
              // required
              id="buildingNumber"
              type="number"
              variant="standard"
              label="Enter Building Number"
              margin="normal"
              value={formik.values.buildingNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.buildingNumber &&
                Boolean(formik.errors.buildingNumber)
              }
              helperText={
                formik.touched.buildingNumber && formik.errors.buildingNumber
              }
            />

            <StyledTextField
              fullWidth
              id="buildingName"
              type="text"
              variant="standard"
              label="Enter Building Name"
            />

            <StyledTextField
              fullWidth
              multiline
              maxRows={5}
              id="buildingDescription"
              type="text"
              variant="standard"
              label="Enter Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <LoadingButton
              variant="outlined"
              loadingPosition="end"
              type="submit"
              // loading={uploadStatus === "uploading" ? true : false}
              onClick={() => uploadImage()}
              endIcon={<SendIcon />}
              sx={{ py: 1, px: 3 }}
            >
              <span>Submit</span>
            </LoadingButton>
          </form>
        </Box>
      ) : null}
    </Fragment>
  );
}

MapDataEntry.displayName = "/src/widgets/cards/MapDataEntry.jsx";

export default MapDataEntry;
