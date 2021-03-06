import "@google/model-viewer";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./ARPage.css";

const useStyles = makeStyles({
  arButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderOutline: "black",
    borderRadius: "5px",
    // border: "none",
    position: "absolute",
    top: "16px",
    right: "16px",
  },
});

const ARPage = () => {
  const classes = useStyles();

  return (
    <div class="imgbox">
      <model-viewer
        class="center-fit"
        // src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        src="./assets/Astronaut.glb"
        alt="A 3D model of an astronaut"
        // auto-rotate
        camera-controls
        ar
        ar-scale="auto"
        ar-modes="scene-viewer webxr quick-look"
      >
        <button className={classes.arButton} slot="ar-button">
          View in your space
        </button>
      </model-viewer>
    </div>
  );
};

export default ARPage;
