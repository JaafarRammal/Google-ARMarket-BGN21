import "@google/model-viewer";
import React from "react";

const ARPage = () => {
  return (
    <div>
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
        ar
        ar-scale="auto"
        ar-modes="scene-viewer webxr quick-look"
      >
        <button
          slot="ar-button"
          // style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; "
        >
          View in your space
        </button>
      </model-viewer>
    </div>
  );
};

export default ARPage;
