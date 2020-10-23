import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import logoImage from '../../assets/icons/logo.png';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Newloan from '../../components/newLoan';

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    color: 'white',
    width: '24em',
  },
}));

const NewLoan = () => {
  const [Value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const styles = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
            // style={{ width: '60em' }}
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
        {selectedTab == 1 && (
          <Fragment>
            <h1>New Document</h1>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default NewLoan;
