import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PhotoAlbum from "@material-ui/icons/PhotoAlbum";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../assets/logo512.png";
import ProductCard from "./Card";
import "./Products.css";
import { useStyles } from "./Styles";

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

function Products(props) {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" className="primary">
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
      {/* Decoration container like Firebase one */}
      <div className="decoration-div" style={{ marginBottom: "-80px" }}>
        <div className="inner-decoration">
          <p style={{ fontSize: "x-large" }}>
            A virtual marketplace for everyone
          </p>
          <p style={{ fontSize: "small" }}>
            Connect with and support small businesses through our immersive
            shopping experience
          </p>
          <br />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {/* <label htmlFor="icon-button-file"> */}
            <Button
              variant="contained"
              className="primary"
              style={{ position: "absolute" }}
            >
              Go
            </Button>
          </div>
          <div style={{ height: "10px" }} />
          <Button
            htmlFor="icon-button-file"
            variant="contained"
            className="primary"
            style={{
              marginBottom: "13px",
              padding: "6px 16px",
              marginRight: "13px",
            }}
            startIcon={<PhotoAlbum />}
          >
            Search by image
          </Button>
          <Button
            className="secondary"
            variant="contained"
            style={{ marginBottom: "13px", padding: "6px 16px" }}
            onClick={() => {
              const link = window.location.origin + "/add";
              console.log(link);
              window.location = link;
            }}
          >
            Add your own product
          </Button>

          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div style={{ flexGrow: 1, overflow: "hidden", paddingTop: "10px" }}>
        <Grid container spacing={3} className="products-list">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
            <Grid item xs>
              <ProductCard></ProductCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Products;
