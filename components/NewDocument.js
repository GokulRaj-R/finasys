import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import web3 from '../ethereum/web3';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import DocumentFactory from '../ethereum/instances/documentFactory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: '1em',
  },
  textField: {
    width: '24em',
  },
}));

const NewDocument = () => {
  const styles = useStyles();
  const [documentAddress, setDocumentAddress] = useState('');

  const { register, handleSubmit } = useForm();

  const createDocument = async (description, amount) => {
    const documentFactory = DocumentFactory();

    try {
      const accounts = await web3.eth.getAccounts();

      const address = await documentFactory.methods
        .createDocument(parseInt(amount, 10), description)
        .send({ from: accounts[0] });

      // const addresses = await documentFactory.methods
      //   .getDeployedDocuments()
      //   .call();

      // setDocumentAddress(addresses.slice(-1)[0]);
      console.log(address);
    } catch (err) {
      console.log('error!!', err);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    createDocument(data.description, data.amount);
  };

  return (
    <Fragment>
      <h1 style={{ paddingBottom: '5px' }}>New Document</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.root}>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                id="filled-basic"
                label="Valuation of the document"
                type="number"
                style={{ width: '49em' }}
                variant="filled"
                inputRef={register({ required: true })}
                name="amount"
                color="primary"
              />
            </Grid>
            <Grid item xs>
              <TextField
                color="primary"
                id="filled-multiline-static"
                multiline
                rows={3}
                label="Description of the document"
                type="text"
                style={{ width: '49em' }}
                variant="filled"
                inputRef={register({ required: true })}
                name="description"
                color="primary"
              />
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
      {documentAddress.length > 0 && (
        <p> Address of created document : {documentAddress} </p>
      )}
    </Fragment>
  );
};

export default NewDocument;
