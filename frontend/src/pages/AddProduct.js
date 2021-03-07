import { Grid, TextField, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../assets/logo512.png";
import "./AddProduct.css";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function AddProduct(props) {
  // Files to upload
  const [imageFile, setImageFile] = React.useState(null);
  const [modelFiles, setModelFiles] = React.useState({
    glb: null,
    usdz: null,
  });

  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const priceRef = React.useRef();
  const quantityRef = React.useRef();
  const tagsRef = React.useRef();

  React.useEffect(() => {
    console.log("Current files: ", imageFile, modelFiles);
  }, [imageFile, modelFiles]);

  // Handle file change
  const handleFileChange = (event, type) => {
    console.log(event, type);
    event.persist();

    // Add the files to the state
    if (type === "image") {
      setImageFile(event.target.files[0]);
    } else if (type === "models") {
      Array.from(event.target.files).forEach((file) => {
        if (file.name.endsWith(".glb")) {
          console.log("Match");
          setModelFiles((prev) => ({ ...prev, glb: file }));
        } else if (file.name.endsWith(".usdz")) {
          setModelFiles((prev) => ({ ...prev, usdz: file }));
        }
      });
    }
  };

  const handleAdd = () => {
    console.log("Add files");

    // Create the form data and send it
    const productData = new FormData();
    productData.append("name", nameRef.current.value);
    productData.append("description", descriptionRef.current.value);
    productData.append("price", priceRef.current.value);
    productData.append("quantity", quantityRef.current.value);
    productData.append("tags", tagsRef.current.value);

    // Display the key/value pairs
    for (var pair of productData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // Append the files
    if (imageFile) {
      productData.append("imageFile", imageFile);
    }

    if (modelFiles.glb) {
      productData.append("glbFile", modelFiles.glb);
    }

    if (modelFiles.usdz) {
      productData.append("usdzFile", modelFiles.usdz);
    }

    // Send a POST fetch request with the data
    fetch(
      "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/products",
      {
        method: "POST",
        body: productData,
      }
    )
      .then(() => alert("Added product"))
      .catch(() => alert("An error occurred"));
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" style={{ background: "#1976D2" }}>
          <Toolbar>
            <img
              src={Logo}
              alt="logo"
              style={{ maxHeight: "30px", paddingRight: "15px" }}
            />
            <Typography component="h3">Google ARMarket</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div
        className="decoration-div"
        style={{ textAlign: "center", marginBottom: "-250px" }}
      >
        <div className="inner-decoration">
          <p style={{ fontSize: "x-large" }}>Add your product to the market!</p>
        </div>
      </div>
      <div className="paper-container">
        <div className="add-container">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {/* <Grid item xs={12}>
          <Typography variant="h3">Add Product</Typography>
        </Grid>

        <Grid item xs={12}>
          Add a product to your business:
        </Grid> */}

            <Grid item xs={12}>
              <TextField
                label="Product Name"
                required
                id="product-name"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={nameRef}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Product Description"
                required
                id="product-description"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={descriptionRef}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Price"
                required
                id="product-price"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={priceRef}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Quantity"
                required
                id="product-quantity"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={quantityRef}
              />
            </Grid>

            <Typography>
              Enter tags for your product, separated with commas (i.e. chair,
              furniture):
            </Typography>
            <Grid item xs={12}>
              <TextField
                label="Product Tags"
                required
                id="product-tags"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={tagsRef}
              />
            </Grid>

            <Typography>Upload an image of your product:</Typography>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="image-file"
                type="file"
                onChange={(event) => handleFileChange(event, "image")}
                hidden
              />
              <label htmlFor="image-file">
                <Button
                  variant="contained"
                  className="primary"
                  startIcon={<PhotoCamera />}
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
            </Grid>

            <Typography>
              Upload the .GLB/.USDZ 3D models for your product:
            </Typography>
            <Grid item xs={12}>
              <input
                accept=".glb,.usdz"
                id="model-file"
                type="file"
                multiple
                onChange={(event) => handleFileChange(event, "models")}
                hidden
              />
              <label htmlFor="model-file">
                <Button
                  variant="contained"
                  className="primary"
                  startIcon={<CloudUploadIcon />}
                  component="span"
                >
                  Upload Models
                </Button>
              </label>
            </Grid>

            <Grid item xs={12}>
              <Button
                id="add-product"
                variant="contained"
                className="secondary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
