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
  const getFileFromInput = (file) => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsBinaryString(file);
    });
  };

  const manageUploadedFile = (binary, file) => {
    console.log("File name: ", file.name);
    console.log("File size: ", binary.length);
  };

  // Handle file change
  const handleFileChange = (event) => {
    event.persist();

    Array.from(event.target.files).forEach((file) => {
      getFileFromInput(file)
        .then((binary) => {
          manageUploadedFile(binary, file);
        })
        .catch(function (err) {
          console.log(err);
          event.target.value = "";
        });
    });
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" style={{ background: "#1976D2" }}>
          <Toolbar>
            <Typography component="h3">Google Marketplace</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className="decoration-div" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "x-large" }}>Add your product to the market!</p>
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
              />
            </Grid>

            <Typography>Upload an image of your product:</Typography>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="image-file"
                type="file"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="image-file">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PhotoCamera />}
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
            </Grid>

            <Typography>
              Upload the .GLB/.USDZ 3D model of your product:
            </Typography>
            <Grid item xs={12}>
              <input
                accept=".glb,.usdz"
                id="model-file"
                type="file"
                multiple
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="model-file">
                <Button
                  variant="contained"
                  color="primary"
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
                color="primary"
                startIcon={<AddIcon />}
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
