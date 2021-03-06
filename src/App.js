import "@google/model-viewer";
import React from "react";
import "./App.css";
import ARPage from "./pages/ARPage";

// <div class="imgbox">
//   <model-viewer
//     class="center-fit"
//     src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
//     // src="./assets/table-football.glb"
//     alt="A 3D model of an astronaut"
//     // auto-rotate
//     camera-controls
//     ar
//     ar-scale="auto"
//     ar-modes="scene-viewer webxr quick-look"
//   >
//     <button slot="ar-button">View in Your Space</button>
//   </model-viewer>
// </div>

function App() {
  return (
    <div>
      <ARPage />
    </div>
  );
}

export default App;
