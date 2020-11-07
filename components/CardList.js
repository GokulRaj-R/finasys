import React from 'react';
import Card from './Card';
import Card2 from './Card2';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});

export default function App({ cards, type }) {
  const classes = useStyles();
  const renderLoans = () => {
    const items = cards.map((card, id) => {
      return (
        <Grid key={id} item xs={12} sm={6} md={4}>
          {type == '0' && <Card card={card} />}
          {type == '1' && <Card2 card={card} />}
        </Grid>
      );
    });
    return items;
  };

  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      {renderLoans()}
    </Grid>
  );
}
