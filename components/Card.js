import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "../routes";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  head: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 10,
  },
  subtitleLeft: {
    fontSize: 13,
    fontWeight: 500,
  },
  subtitleRight: {
    fontSize: 10,
  },
  body: {},
  type: {
    color: "red",
    fontSize: 13,
  },
});

export default function ImgMediaCard({ card }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Loan Details"
          height="140"
          image={`https://picsum.photos/200/300?random=${Math.random()}`}
          title="Loan Description"
        />
        <CardContent>
          <Typography
            className={classes.head}
            gutterBottom
            variant="h6"
            component="h2"
            noWrap
          >
            {card.address}
          </Typography>
          <Typography
            className={classes.subtitleLeft}
            variant="h4"
            component="p"
            display="inline"
          >
            Address:&nbsp;
          </Typography>
          <Typography
            className={classes.subtitleRight}
            variant="body1"
            component="p"
            display="inline"
          >
            {card.address}
          </Typography>
          <Typography className={classes.body} variant="body2" component="p">
            {card.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          route={`/${card.type == -1 ? "auction" : "lend"}/${card.address}`}
        >
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
        {card.type != -1 ? (
          <Typography
            className={classes.type}
          >{`Type ${card.type}`}</Typography>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
}
