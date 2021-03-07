import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProductCard from "./Card";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./Styles";
import "./Products.css";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoAlbum from "@material-ui/icons/PhotoAlbum";
import Add from "@material-ui/icons/Add";
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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
      <AppBar position="fixed" style={{ background: "#1976D2" }}>
        <Toolbar>
        <Typography className={classes.title}><h3>Google ARMarket</h3></Typography>
          
          <label htmlFor="icon-button-file">
            <IconButton
              style={{ color: "white" }}
              aria-label="upload picture"
              component="span"
            >
              <PhotoAlbum />
            </IconButton>
          </label>
          <IconButton
            style={{ color: "white" }}
            component="span"
            onClick={() => {
              const link = window.location.origin + "/add";
              console.log(link);
              window.location = link;
            }}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      {/* Decoration container like Firebase one */}
      <div className="decoration-div">
        {/* <h3>Google Marketplace</h3> */}
        <p style={{fontSize: "x-large"}}>A virtual marketplace for everyone</p>
        <p style={{fontSize: "small"}}>Connect and support small businesses through our immersive shopping experience</p>
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
          </div>
          <div style={{ paddingRight: "5px" }} />
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
      </div>
      <div style={{ flexGrow: 1, overflow: "hidden"}}>
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
