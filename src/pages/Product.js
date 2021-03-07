import "@google/model-viewer";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Astronaut from "../assets/3DModels/astronaut.glb";
import AstronautIOS from "../assets/3DModels/astronaut.usdz";
import "./ARView.css";

const useStyles = makeStyles({
  arButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderOutline: "black",
    borderRadius: "5px",
    position: "absolute",
    top: "16px",
    right: "16px",
  },
});

const ARView = () => {
  const classes = useStyles();

  return (
    <div class="imgbox">
      <model-viewer
        class="center-fit"
        // src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        src={Astronaut}
        alt="Astronaut - replace this with the releveant info"
        // auto-rotate
        camera-controls
        ar
        ar-scale="auto"
        ar-modes="scene-viewer webxr quick-look"
        ios-src={AstronautIOS}
        // TODO: Use the image of the product as the poster when the model is loading
      >
        <button className={classes.arButton} slot="ar-button">
          View in AR
        </button>
      </model-viewer>
    </div>
  );
};

function Product(props) {
  return (
    <div>
      <p>Got product ID: {props.match.params.productId}</p>

      <div>
        <ARView />
      </div>
    </div>
  );
}

export default Product;
