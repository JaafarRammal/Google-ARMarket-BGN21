import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import shop from "../assets/images/shop1.png";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "5px 5px 10px 5px",
    boxShadow: "4px 3px 8px 1px #969696",
    webkitBoxShadow: "4px 3px 8px 1px #969696",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProductCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Crafts
            </Typography>
            <Typography variant="h5" component="h2">
              Desk Robot
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Jaafar Rammal
            </Typography>
          </Grid>
          <Grid item xs={4} dir="rtl">
            <img src={shop} style={{ maxHeight: "80px" }} alt="robot"></img>
          </Grid>
        </Grid>
        <Typography variant="body2" component="p">
          Carefully crafted and well maintained robots for your desks
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/products/1`}
          variant="contained"
          className="primary"
        >
          View details
        </Button>
        <div style={{ textAlign: "right", width: "40%" }}>
          <h3>£80</h3>
        </div>
      </CardActions>
    </Card>
  );
}

export default ProductCard;