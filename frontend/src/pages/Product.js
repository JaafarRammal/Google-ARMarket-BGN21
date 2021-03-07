import "@google/model-viewer";
import React from "react";
import Map from "./Map";
import "./ARView.css";

import { Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import Logo from "../assets/logo512.png";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const ARView = () => {
  return (
    <div class="imgbox">
      <model-viewer
        className="center-fit"
        style={{ width: "80vw", height: "50vh", maxWidth: "500px" }}
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="Astronaut - replace this with the releveant info"
        // auto-rotate
        camera-controls
        ar
        ar-scale="auto"
        ar-modes="webxr scene-viewer quick-look"
        ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz"
        // TODO: Use the image of the product as the poster when the model is loading
      >
        <Button
          className="secondary"
          slot="ar-button"
          style={{ position: "absolute", bottom: 0, left: 0 }}
        >
          View in AR
        </Button>
      </model-viewer>
    </div>
  );
};

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

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

function Product(props) {
  const prod = {
    title: "Robot",
    description: "A carefully crafted and well designed robot for your desk",
    price: 80,
    seller: "Jaafar Rammal",
  };

  return (
    <div>
      {/* App bar */}
      <ElevationScroll {...props}>
        <AppBar position="fixed" style={{ background: "#1976D2" }}>
          <Toolbar>
            <img
              src={Logo}
              alt="logo"
              style={{ maxHeight: "30px", paddingRight: "15px" }}
            />
            <Typography>
              <h3>Google ARMarket</h3>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Main view view */}
      <div style={{ marginTop: "50px", padding: "80px 20px" }}>
        {/* <p>Got product ID: {props.match.params.productId}</p> */}
        <Grid container spacing={3}>
          {/* Product details */}
          <Grid item xs>
            <Card className="details-wrapper">
              <CardContent>
                <h1>Product details</h1>
                <br />
                <h2>{prod.title}</h2>
                <br />
                <p>{prod.description}</p>
                <br />
                <p>
                  <b>Seller: </b>
                  {prod.seller}
                </p>
                <br />
                <p>
                  <b>Price: </b>£{prod.price}
                </p>
                <br />
                <Button className="primary">Add to cart</Button>
              </CardContent>
            </Card>
          </Grid>
          {/* AR view wrapper */}
          <Grid item xs>
            <Card className="ar-wrapper">
              <CardContent>
                <h3>3D Viewer</h3>
                <ARView />
              </CardContent>
            </Card>
          </Grid>
          {/* Map details */}
          <Grid item xs>
            <Card className="ar-wrapper">
              <CardContent>
                <Map location={location} zoomLevel={17} />
                <Button className="primary" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`)}>Open in Google Maps</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Product;
