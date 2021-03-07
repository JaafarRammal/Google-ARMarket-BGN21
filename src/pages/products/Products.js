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

function Products(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" style={{ background: "#1976D2" }}>
        <Toolbar>
          <Typography className={classes.title}></Typography>
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
              const link = window.location.origin + "/add"
              console.log(link)
              window.location = link
            }
            }
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Decoration container like Firebase one */}
      <div className="decoration-div">
        <h3>Google Marketplace</h3>
        <h1>A marketplace for everyone</h1>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={2} className="products-list">
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
