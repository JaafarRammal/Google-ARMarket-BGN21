import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProductCard from "./Card";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./Styles";
import "./Products.css";
// import Shop1 from "../../assets/images/shop1.png";
// import Shop2 from "../../assets/images/shop2.png";
import Grid from "@material-ui/core/Grid";

function Products(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" style={{ background: "#1976D2" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <h3>Google Marketplace</h3>
          </Typography>
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
        </Toolbar>
      </AppBar>
      {/* Decoration container like Firebase one */}
      <div className="decoration-div">
        <h1>A marketplace for everyone</h1>
      </div>
      <Grid container spacing={3} className="products-list">
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard></ProductCard>
        </Grid>
      </Grid>
    </>
  );
}

export default Products;
