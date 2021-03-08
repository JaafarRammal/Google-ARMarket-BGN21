import "@google/model-viewer";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../assets/logo512.png";
import { getProduct } from "../services/searchQuery";
import "./ARView.css";
import Map from "./Map";

const ARView = (props) => {
  return (
    <div className="imgbox">
      <model-viewer
        className="center-fit"
        style={{ width: "80vw", height: "60vh", maxWidth: "500px" }}
        src={props.glb}
        alt="Astronaut - replace this with the releveant info"
        // auto-rotate
        camera-controls
        ar
        ar-scale="auto"
        ar-modes="webxr scene-viewer quick-look"
        ios-src={props.usdz}
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
  address: "Google Office",
  lat: 51.53336432624241,
  lng: -0.12600320186901312,
};

function Product(props) {
  const id = props.match.params.productId;
  const [fetched, setFetched] = React.useState(false);
  const [product, setProduct] = React.useState({});

  const names = ["Jaafar Rammal", "Jennifer Smith"];

  const stories = [
    "Hi, my name is Jaafar! I'm a X year old student from London and really enjoy crafting things in my spare time. I started this business 6 months ago with the aim of sharing my passion with others. I appreciate all the support!",
    "Hello everyone, I'm Jennifer. I'm 30 years old and recently got into crafting - I began my business a year ago but because of the pandemic I've found it hard to get customers. This platform really helps me to bring my products to you, so have a look around and see what takes your fancy!",
  ];

  const images = [
    "https://avatars1.githubusercontent.com/u/45538723?s=400&u=542948751a05f4b1039828fe53f99a1a5e15468f&v=4",
    "https://cdn.discordapp.com/attachments/817730471173029889/818315139907452958/unknown.png",
  ];

  React.useEffect(() => {
    if (!fetched) {
      // fetch from the api..
      // set products when received
      console.log("fetching product", id);
      getProduct(id).then((data) => {
        setProduct(data);
        console.log(product);
        setFetched(true);
      });
    }
  }, [fetched, id, product]);

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
            <Typography component="h3">Google ARMarket</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Main view view */}
      {fetched && (
        <div style={{ marginTop: "50px", padding: "80px 20px" }}>
          {/* <p>Got product ID: {props.match.params.productId}</p> */}
          <Grid container spacing={3}>
            {/* Product details */}
            <Grid item md>
              <Card className="details-wrapper">
                <CardContent>
                  <h1>Product details</h1>
                  <br />
                  <h2>{product.name}</h2>
                  <br />
                  <p>{product.description}</p>
                  <br />
                  <p>
                    <b>Seller: </b>
                    {names[product.quantity % 2]}
                  </p>
                  <br />
                  <p>
                    <b>Tags: </b>
                    {product.product_tags.toString()}
                  </p>
                  <br />
                  <p>
                    <b>Quantity: </b>
                    {product.quantity}
                  </p>
                  <br />
                  <p>
                    <b>Price: </b>£{product.price}
                  </p>
                  <br />
                  <Button
                    className="primary"
                    onClick={() => alert("Added to cart!")}
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* AR view wrapper */}
            <Grid item md>
              <Card className="ar-wrapper">
                <CardContent>
                  <h3>3D Viewer</h3>
                  <ARView
                    glb={product.models.glb_link}
                    usdz={product.models.usdz_link}
                  />
                </CardContent>
              </Card>
            </Grid>
            {/* Map details */}
            <Grid item md>
              <Card className="details-wrapper ">
                <CardContent>
                  <h3>Seller story</h3>
                  <br />
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                      src={images[product.quantity % 2]}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "fill",
                        borderRadius: "50%",
                        padding: "0px 5%",
                      }}
                      alt=""
                    />
                  </div>
                  <br />
                  <div style={{ textAlign: "justify" }}>
                    <br />
                    {stories[product.quantity % 2]}
                  </div>
                  <br />
                  <h3>Seller location</h3>
                  <br />
                  <Map location={location} zoomLevel={17} />
                  <Button
                    className="primary"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
                      )
                    }
                  >
                    Open in Google Maps
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Product;
