import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const spacing = 2;
  const classes = useStyles();

  let cards = [];

  for (let i = 0; i < 8; i++) {
    cards.push(
      <Grid key={i} item>
        <Card
          img="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
          topic="Topic"
          text="This is just some random text to fill in the space and show my awesomeness."
        />
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {cards}
        </Grid>
      </Grid>
    </Grid>
  );
}
