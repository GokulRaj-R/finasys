import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Grid from '../components/Dashboard/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  divStyle: {
    backgroundImage: `url(${'https://img1.goodfon.com/original/1920x1080/1/1a/svet-cvet-pyatno-dymka-fon-oboi.jpg?d=1'})`,
    position: 'relative',
    marginTop: '0%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '15em',
    '& h2': {
      color: 'black',
      fontFamily: 'Georgia',
      position: 'relative',
      fontSize: '50px',
      fontWeight: '100',
    },
    '& h1': {
      color: 'black',
      fontFamily: 'Georgia',
      position: 'relative',
      fontSize: '30px',
      fontWeight: '100',
    },
  },
  content: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridStyle: {
    // margin: '0px',
    // height: 'auto',
    // width: 'auto',
    // display: 'flex',
    marginLeft: '6em',
    paddingTop: '5vh',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
}));

const Dashboard = () => {
  const styles = useStyles();

  useEffect(() => {
    document.title = 'Dashboard - Finasys';
  });

  return (
    <Layout>
      <div className={styles.divStyle}>
        <h2>Welcome to Finasys</h2>
        <h1> One-stop portal for all your banking needs! </h1>
      </div>
      {/* <div className={styles.content}>
        <h> Here's a list of all the things you can do,  </h>
      </div> */}
      <div className={styles.gridStyle}>
        <Grid />
      </div>
    </Layout>
  );
};

export default Dashboard;
