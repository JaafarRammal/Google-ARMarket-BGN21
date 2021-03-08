import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 220,
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
  const product = props.product;
  const names = ["Jaafar Rammal", "Jennifer Smith"];
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {product.product_tags[0]}
        </Typography>
        <Typography variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {names[product.quantity % 2]}
        </Typography>
        <Typography variant="body2" component="p">
          {product.description}
        </Typography>
        <div style={{ height: "200px", width: "100%", padding: "10px 0px" }}>
          <img
            src={product.image_link}
            style={{ maxHeight: "150px", width: "100%", objectFit: "contain" }}
            alt="robot"
          ></img>
        </div>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/products/${props.p_id}`}
          variant="contained"
          className="primary"
        >
          Explore
        </Button>
        <div style={{ textAlign: "right", width: "40%" }}>
          <h3>£{product.price}</h3>
        </div>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
