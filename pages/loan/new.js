import React, { Fragment } from 'react';
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
  const [Value, setValue] = React.useState('');
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
        <p style={{ paddingBottom: '5px' }}>Apply for a new loan</p>
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
                name="Type"
                control={control}
              />
            </FormControl>
          </section>
          <Button variant="contained" type="submit" color="secondary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewLoan;
