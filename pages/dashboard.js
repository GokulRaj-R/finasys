import React from 'react';
import Layout from '../components/Layout';
import Grid from '../components/Dashboard/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  divStyle: {
    backgroundImage: `url(${'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'})`,
    position: 'relative',
    marginTop: '0%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '10em',
    '& h2': {
      color: '#663399',
      position: 'relative',
      zIndex: '2',
    },
  },
  content: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridStyle: {
    margin: '0px',
    height: 'auto',
    width: 'auto',
    display: 'flex',
    paddingTop: '5vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
}));

const Dashboard = () => {
  const styles = useStyles();

  return (
    <Layout>
      <div className={styles.divStyle}>
        <h2>Finasys</h2>
      </div>
      <div className={styles.content}>
        <h1>Dashboard</h1>
        <h> Functionalities: </h>
      </div>
      <div className={styles.gridStyle}>
        <Grid />
      </div>
    </Layout>
  );
};

export default Dashboard;
