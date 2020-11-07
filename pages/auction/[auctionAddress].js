import {
  Button,
  CardActions,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { StarIcon } from '@material-ui/core/Icon';
import Swal from 'sweetalert2';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import Auction from '../../ethereum/instances/auction';
import Loan from '../../ethereum/instances/loan';
import documentFactory from '../../ethereum/instances/documentFactory';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const copyHelper = (text) => {
  Toast.fire({
    icon: 'success',
    title: 'Copied to clipboard',
  });
  navigator.clipboard.writeText(text);
};

const useStyles = makeStyles({
  root: {
    margin: '2em',
  },
  header: {
    fontColor: '#fff',
    margin: '0',
    fontWeight: '700',
    fontSize: '0.9em',
    marginRight: '0.5em',
  },
  details: {
    margin: '0',
    fontSize: '0.9em',
  },
  horizontal_line: {
    margin: '0.05em',
  },
  title: {
    fontSize: '1.5em',
    fontWeight: '600',
    margin: '0',
  },
  address_details: {
    fontSize: '0.8em',
    letterSpacing: '1.25px',
    margin: '0',
  },
  sub_heading: {
    fontSize: '1em',
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    textAlign: 'justify',
  },
  document_name: {
    fontSize: '0.8em',
    margin: '0.25em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  copy_icon: {
    width: '0.7em',
    height: '0.7em',
    // marginLeft: "5px",
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  vote_button_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  document_wrappup: {
    display: 'flex',
    // justifyContent: "space-between",
    alignItems: 'center',
  },
  document_price: {
    minWidth: '8em',
    textAlign: 'right',
    fontSize: '0.8em',
    color: 'green',
    marginLeft: 'auto',
    // justifySelf: "flex-end"
  },
});

const showLoan = ({ auctionDetails, loanDetails, documents }) => {
  // console.log(props.loanAddress, props, props.loanDetails);
  const styles = useStyles();
  const d = new Date();
  console.log(d.getTime());
  return (
    <Layout>
      <Grid container style={{ padding: '1.5em 0em' }}>
        <Grid item xs={3}>
          <Paper style={{ padding: '1em', margin: '0 2em' }}>
            <div className={styles.document_wrappup}>
              <span className={styles.header}>Borrower</span>
              <FileCopyIcon
                className={styles.copy_icon}
                onClick={() => {
                  Toast.fire({
                    icon: 'success',
                    title: 'Copied to clipboard',
                  });
                  navigator.clipboard.writeText(auctionDetails[4]);
                }}
              />
            </div>
            <hr />
            <div className={styles.row}>
              <p className={styles.header}>Current Bid</p>
              <p className={styles.details}> {auctionDetails[1]} wei</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}>
              <p className={styles.header}>Minimum Bid</p>
              <p className={styles.details}> {auctionDetails[2]}</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}>
              <p className={styles.header}> Expires on</p>
              <p className={styles.details}> 12th Nov 2020</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '1em 2em' }}>
            <p className={styles.title}> {loanDetails[1]}</p>
            <p className={styles.description}>{loanDetails[2]}</p>
            {d.getTime() > auctionDetails[0] ? (
              <>
                <p className={styles.sub_heading}>Bid For Mortgage</p>
                <form className={styles.form}>
                  <Grid container justify="center">
                    <Grid item xs={3}>
                      <TextField
                        type="Number"
                        justify="center"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              Ether
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                      />
                    </Grid>
                    <Grid item xs={3} container justify="center" align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                      >
                        Bid
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : (
              <>
                <p className={styles.sub_heading}>Finalize the Loan?</p>
                <Grid container justify="center">
                  <Grid item xs={2} className={styles.vote_button_wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckCircleIcon />}
                    >
                      Yes
                    </Button>{' '}
                  </Grid>
                  <Grid item xs={2} className={styles.vote_button_wrapper}>
                    <Button
                      startIcon={<CancelIcon />}
                      variant="contained"
                      color="secondary"
                    >
                      No
                    </Button>{' '}
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper style={{ padding: '1em', margin: '0 2em' }}>
            <div className={styles.document_wrappup}>
              <span className={styles.header}>Borrower</span>
              <FileCopyIcon
                className={styles.copy_icon}
                onClick={() => {
                  Toast.fire({
                    icon: 'success',
                    title: 'Copied to clipboard',
                  });
                  navigator.clipboard.writeText(loanDetails[0]);
                }}
              />
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}>
              <p className={styles.header}>Mortgage</p>
              {documents.map((document) => (
                <div className={styles.document_wrappup}>
                  <span className={styles.document_name}>
                    {' '}
                    {document.description}{' '}
                  </span>
                  <FileCopyIcon
                    className={styles.copy_icon}
                    onClick={() => {
                      Toast.fire({
                        icon: 'success',
                        title: 'Copied to clipboard',
                      });
                      navigator.clipboard.writeText(document.value);
                    }}
                  />
                  <span
                    className={styles.document_price}
                  >{`${document.value} ether`}</span>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

showLoan.getInitialProps = async (props) => {
  const auctionAddress = props.query.auctionAddress;
  const auctionContract = Auction(auctionAddress);
  const auctionDetails = await auctionContract?.methods
    ?.auctionSummary()
    .call();
  const loanAddress = auctionDetails[3];
  const loanContract = Loan(loanAddress);
  const loanDetails = await loanContract?.methods?.getLoanSummary()?.call();
  const documentFactoryContract = documentFactory();
  const documents = await Promise.all(
    loanDetails[10].map(async (documentAddress) => {
      const documentDetails = await documentFactoryContract.methods
        ?.getDocumentSummary(documentAddress)
        ?.call();
      return { description: documentDetails[3], value: documentDetails[2] };
    })
  );

  return { auctionDetails, loanDetails, documents };
};

export default showLoan;
