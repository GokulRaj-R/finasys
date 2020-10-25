import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

import LoanFactory from '../ethereum/instances/loanFactory';
import web3 from '../ethereum/web3';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: '1em',
  },
  textField: {
    color: 'white',
    width: '24em',
  },
}));

const newLoan = () => {
  const styles = useStyles();
  const [loanAddress, setLoanAddress] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { register, handleSubmit, control } = useForm();

  const createLoan = async (
    title,
    time,
    amount,
    duration,
    description,
    documents,
    type
  ) => {
    const loanFactory = LoanFactory();

    try {
      const accounts = await web3.eth.getAccounts();

      await loanFactory.methods
        .createLoan(title, description, amount, duration, time, type, documents)
        .send({ from: accounts[0] });

      const addresses = await loanFactory.methods.getDeployedLoans().call();

      setLoanAddress(addresses.slice(-1)[0]);
    } catch (err) {
      console.log('Error!', err);
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    const {
      title,
      time,
      amount,
      duration,
      description,
      documents,
      type,
    } = data;
    const documentAddresses = documents.split(',');
    const loanType = type === 'fixed';

    createLoan(
      title,
      time,
      amount,
      duration,
      description,
      documentAddresses,
      loanType
    );
  };
  return (
    <Fragment>
      <h1 style={{ paddingBottom: '5px' }}>Apply for a new loan</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.root}>
          <Grid container spacing={2}>
            <Grid
              container
              justify="center"
              spacing={2}
              style={{ margin: '1px' }}
            >
              <Grid item name="title">
                <TextField
                  id="filled-basic"
                  label="Title"
                  name="title"
                  className={styles.textField}
                  variant="filled"
                  inputRef={register({ required: true })}
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Current Time"
                  className={styles.textField}
                  type="number"
                  variant="filled"
                  inputRef={register({ required: true })}
                  name="time"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={2}
              style={{ margin: '1px' }}
            >
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Amount"
                  className={styles.textField}
                  type="number"
                  variant="filled"
                  inputRef={register({ required: true })}
                  name="amount"
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  label="Duration"
                  type="number"
                  className={styles.textField}
                  variant="filled"
                  inputRef={register({ required: true })}
                  name="duration"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Grid item xs>
              <TextField
                id="filled-basic"
                label="Description"
                type="text"
                style={{ width: '49em' }}
                variant="filled"
                inputRef={register({ required: true })}
                name="description"
                color="secondary"
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="filled-basic"
                label="Add documents' addresses separated by comma"
                type="text"
                style={{ width: '49em' }}
                variant="filled"
                inputRef={register({ required: true })}
                name="documents"
                color="secondary"
              />
            </Grid>
          </Grid>
        </div>
        <section>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type of loan</FormLabel>
            <Controller
              as={
                <RadioGroup
                  aria-label="type"
                  row
                  style={{ margin: '2px' }}
                  value={''}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="running"
                    control={<Radio />}
                    label="Running"
                  />
                  <FormControlLabel
                    value="fixed"
                    control={<Radio />}
                    label="Fixed"
                  />
                </RadioGroup>
              }
              name="type"
              control={control}
            />
          </FormControl>
        </section>
        <Button variant="contained" type="submit" color="secondary">
          Submit
        </Button>
      </form>
      {loanAddress.length > 0 && (
        <p> Address of created loan : {loanAddress} </p>
      )}
    </Fragment>
  );
};

export default newLoan;
