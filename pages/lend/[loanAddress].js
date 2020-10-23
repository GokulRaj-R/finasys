import { Button, CardActions, Grid, makeStyles, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, withStyles } from "@material-ui/core";
import React from "react";
import Layout from "../../components/Layout";
import {StarIcon} from '@material-ui/core/Icon';
import Swal from "sweetalert2";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const useStyles = makeStyles({
    root:{
      margin: '2em',
    },
    header:{
      fontColor: "#fff",
      margin: "0",
      fontWeight: "700",
      fontSize: "0.9em"
    },
    details:{
      margin: "0",
      fontSize: "0.8em", 
    }, 
    horizontal_line: {
      margin: "0.05em",
    },
    title: {
      fontSize: "1.5em",
      fontWeight: "600",
      margin: "0"
    }, 
    address_details: {
      fontSize: "0.8em", 
      letterSpacing: "1.25px",
      margin: "0",
    },
    sub_heading: {
      fontSize: "1em",
      fontWeight: "600",
      textAlign: "center",
    }, 
    description: {
      textAlign: "justify",
    }, 
    document_name: {
      fontSize: "0.8em",
      margin: "0.25em",
      display: "flex",
      alignItems: "center",
      textTransform: "ellipses",
    }, 
    copy_icon: {
      width: "0.7em", 
      height: "0.7em",
      marginLeft: "5px",
      cursor: "pointer"
    }, 
    form: {
      display: "flex",
      justifyContent: "center",
    },
    vote_button_wrapper: {
      display: 'flex',
      justifyContent: 'center',
    }
  })

const showLoan = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories };
  }
  
  const rows = [
    createData('Principal Amount', 159, 6.0, 24, 4.0),
    createData('Interest Rate', 237, 9.0, 37, 4.3),
    createData('Remaining Amount', 262, 16.0, 24, 6.0),
    createData('Requested On', 305, 3.7, 67, 4.3),
    createData('Duration', 356, 16.0, 49, 3.9),
  ];
  const styles = useStyles();
  return (
    <Layout>
      <Grid container 
      style={{padding: "1.5em 0em"}}
      >

<Grid item xs={2}>
          <Paper style={{padding:"1em", margin:"0 2em"}}>
            <div className={styles.row}> 
              <p className={styles.header}>Principal Amount</p>
              <p className={styles.details}> 100000</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}>Remaining Amount</p>
              <p className={styles.details}> 100000</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}>Interest Rate</p>
              <p className={styles.details}> 100000</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}> Started On</p>
              <p className={styles.details}> 100000</p>
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}>Duration</p>
              <p className={styles.details}> 100000</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7} >
          <Paper style={{padding: "1em 2em"}}>
          <p className={styles.title}> My First Loan</p>
          <p className={styles.description}>
            
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including 
            versions of Lorem Ipsum.
          </p>
          
            <p className={styles.sub_heading}>Lend Money</p>
            <form className={styles.form}>

              <Grid xs={6} container justify="space-between" >
                    <Grid  item xs={6} >
                      <TextField type="Number"  justify="center"   inputProps={{min: 0, style: { textAlign: 'center' }}}/>
                    </Grid>
                    <Grid item xs={6} justify="center" align="center" style={{display: 'flex'}}>
                      <Button variant="contained" color="primary" endIcon={<SendIcon />}>Lend</Button>
                    </Grid>
              </Grid>
            </form>
            <p className={styles.sub_heading}>Agree To Extend the Loan?</p>
            <Grid container xs={12} justify="center" >
  <Grid item xs={2} className={styles.vote_button_wrapper}><Button variant="contained" color="primary"  startIcon={<CheckCircleIcon />}>Yes</Button> </Grid>
  <Grid item xs={2} className={styles.vote_button_wrapper}justify="center"><Button startIcon={<CancelIcon />} variant="contained" color="secondary" >No</Button> </Grid>
            </Grid>
            </Paper>
        </Grid>

        <Grid item xs={3}>
          
          <Paper style={{padding:"1em", margin:"0 2em"}}>
              <p className={styles.header}>Borrower</p>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                Toast.fire({
                  icon: "success",
                  title: "Copied to clipboard",
                });
                navigator.clipboard.writeText('0xABc6421e0cd25a9Ff83692E3CFF36566f38aE1aE');
              }}
            >
              Copy address
            </Button>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}>Mortgage</p>
              <p className={styles.document_name}> My Building Building Building  <FileCopyIcon className={styles.copy_icon}/></p>

              <div className={styles.document}>
              <Typography>My Building</Typography>
                <Grid container>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        Toast.fire({
                          icon: "success",
                          title: "Copied to clipboard",
                        });
                        navigator.clipboard.writeText('0xABc6421e0cd25a9Ff83692E3CFF36566f38aE1aE');
                      }}
                    >
                      copy address
                    </Button>
                    <Typography> 10000</Typography>
                  </Grid>
                <p className={styles.document_name}> My Building</p>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default showLoan;
