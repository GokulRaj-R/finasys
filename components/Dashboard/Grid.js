import React from 'react';
import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Card from './Card';

import auction from '../../assets/images/auction.jpg';
import newDoc from '../../assets/images/newDoc.png';
import newLoan from '../../assets/images/newLoan.png';
import showAllLoans from '../../assets/images/showAllLoans.png';
import verify from '../../assets/images/verify.png';
import profile from '../../assets/images/profile.png';

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
          style={{ marginBottom: '3px' }}
        >
          <Grid item xs={4}>
            <Card
              img={showAllLoans}
              topic="Show all loans"
              text="Display all of your borrowed loans"
              linkTo="/lend/all"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={auction}
              topic="Show all auctions"
              text="Display all the auctions"
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
              linkTo="/loan/new"
            />
          </Grid>
          <Grid item xs={4}>
            <Card
              img={newDoc}
              text="Submit a new asset"
              topic="Add new document"
              linkTo="/loan/new"
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
