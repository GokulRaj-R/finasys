import React from 'react';
import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Card from './Card';

import {
  showAllLoans,
  newDoc,
  newLoan,
  profile,
  verify,
  auction,
} from '../../assets/dashboardImages';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid
          container
          justify="center"
          xs={12}
          spacing={3}
          style={{ marginBottom: '8px' }}
        >
          <Grid item xs={4}>
            <Card
              img={showAllLoans}
              topic="Show all loans"
              text="Display all of your active loans"
              linkTo="/lend/all"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={auction}
              topic="Show all auctions"
              text="Display all active auctioned items"
              linkTo="/auction/all"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={profile}
              text="Checkout all of your loans and investments"
              topic="User profile"
              linkTo="userProfile"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={3}
          style={{ marginBottom: '3px' }}
        >
          <Grid item xs={4}>
            <Card
              img={newLoan}
              topic="Apply for a new loan"
              text="In urgent need of money? Applying for a loan has never been this hassle free!"
              linkTo="/loan/0"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={newDoc}
              text="Submit a new asset"
              topic="Add new document"
              linkTo="/loan/1"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={verify}
              text="If you haven't verified yourself yet, what are you doing here?"
              topic="Verify yourself"
              linkTo="userProfile"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
