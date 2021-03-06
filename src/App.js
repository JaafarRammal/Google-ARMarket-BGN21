import React from "react";
import "./App.css";
import ARPage from "./pages/ARPage";
import Camera from "./utilities/Camera";

function App() {
  return (
    <div className="App">
      <Camera />
      <ARPage />
    </div>
  );
}

export default App;
