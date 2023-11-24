import { Fragment, useRef, useState } from "react";
import { useFormik } from "formik";
import { Alert, Snackbar, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Send } from "@mui/icons-material";
import {
  StyledTextField,
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
} from "@/widgets/atoms";
import { closeSnackbar, firestoreFailure } from "@/redux/slices";
import { blueGrey } from "@mui/material/colors";
import { Images } from "@/constants";
import Drawer from "./Drawer";
import { fileReader } from "@/functions";
import { useDispatch, useSelector } from "react-redux";

function Form({ initialValues, formFields, validationSchema }) {
  const {
    snackbarConfig: { open, message, vertical, horizontal, severity },
  } = useSelector((state) => state.firestore);
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState(Images.Thumbnail);
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      image: null,
      ...initialValues,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSuccess = (file, url) => {
    setImageURL(url);
    formik.setValues({ ...formik.values, image: file });
  };

  const handleFailure = (error) => {
    dispatch(firestoreFailure(error));
  };

  return (
    <Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert open variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      <Drawer>
        <form
          className="data-entry-form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <ImageButton
            focusRipple
            style={{
              width: "40%",
            }}
            onClick={() => inputRef.current.click()}
          >
            <ImageSrc
              style={{
                backgroundImage: `url(${imageURL})`,
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
                  onChange={(e) =>
                    fileReader(e.target.files[0], handleSuccess, handleFailure)
                  }
                />
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>

          {formFields.map((field) => (
            <StyledTextField
              fullWidth
              key={field.id}
              required={field.required}
              id={field.id}
              type={field.type}
              multiline={field.multiline}
              maxRows={field.maxRows}
              variant="standard"
              label={field.label}
              margin="normal"
              value={formik.values[field.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.id] && Boolean(formik.errors[field.id])
              }
              helperText={formik.touched[field.id] && formik.errors[field.id]}
            />
          ))}

          <LoadingButton
            variant="outlined"
            loadingPosition="end"
            type="submit"
            // loading={uploadStatus === "uploading" ? true : false}
            // onClick={() => ()}
            endIcon={<Send />}
            sx={{
              py: 1,
              px: 3,
              color: blueGrey[500],
              borderColor: blueGrey[500],
            }}
          >
            <span>Submit</span>
          </LoadingButton>
        </form>
      </Drawer>
    </Fragment>
  );
}

Form.displayName = "/src/features/studio/componnets/widgets/form/Form.jsx";

export default Form;
