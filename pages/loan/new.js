import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import logoImage from '../../assets/icons/logo.png';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Newloan from '../../components/NewLoan';
import Newdocument from '../../components/NewDocument';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: '1em',
  },
  outer: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#2f2f36',
    height: '100vh',
    color: 'white',
    inner: {
      height: '100%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    '& h1': {
      paddingBottom: '10px',
      color: 'red',
    },
  },
  logo_container: {
    padding: '3em 0px 5em 0px',
    height: '100%',
    '& span': {
      fontSize: '3em',
      color: '#640b37',
      margin: '0 auto 0 0',
    },
    display: 'flex',
    textDecoration: 'none',
  },
  logo: {
    justifyContent: 'center',
    height: '4em',
    width: 'auto',
    margin: '0 0 0 auto',
  },
}));

const NewLoan = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const styles = useStyles();

  return (
    <div className={styles.outer}>
      <div className={styles.outer.inner}>
        <div className={styles.logo_container}>
          {' '}
          <img className={styles.logo} src={logoImage} />
          <span> Finasys </span>
        </div>
        <AppBar
          position="static"
          color="transparent"
          style={{ margin: 'auto', width: '49em' }}
        >
          <Tabs
            value={selectedTab}
            onChange={(e, val) => setSelectedTab(val)}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            centered
            aria-label="full width tabs example"
          >
            <Tab label="New Loan" />
            <Tab label="New Document" />
          </Tabs>
        </AppBar>
        {selectedTab == 0 && <Newloan />}
        {selectedTab == 1 && <Newdocument />}
      </div>
    </div>
  );
};

export default NewLoan;
