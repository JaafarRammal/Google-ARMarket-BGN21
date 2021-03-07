import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import React from "react";

function AddProduct() {
  return (
    <Paper square>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Add Product</Typography>
        </Grid>

        <Grid item xs={12}>
          Add a product to your business:
        </Grid>

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
          <input accept="image/*" id="image-file" type="file" hidden />
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

        <Typography>Upload the .GLB 3D model of your product:</Typography>
        <Grid item xs={12}>
          <input accept=".glb" id="model-file" type="file" hidden />
          <label htmlFor="model-file">
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload Model
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
            ADD
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddProduct;
