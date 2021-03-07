import "@google/model-viewer";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Products from "./pages/products/Products";

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
    <Router>
      <Switch>
        <Route exact path="/add">
          <AddProduct />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:productId" component={Product} />
        <Route render={() => <Redirect to="/products" />} />
      </Switch>
    </Router>
  );
}

export default App;
