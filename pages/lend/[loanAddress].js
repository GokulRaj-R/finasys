import { Button, CardActions, Grid, InputAdornment, makeStyles, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Loan from "../../ethereum/instances/loan";
import documentFactory from '../../ethereum/instances/documentFactory';
import web3 from "../../ethereum/web3";
import { triggerAlert } from "../../alert/getAlert";
import Router from 'next/router';

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
      fontSize: "0.9em",
      marginRight: "0.5em"
    },
    details:{
      margin: "0",
      fontSize: "0.9em", 
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
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }, 
    copy_icon: {
      width: "0.7em", 
      height: "0.7em",
      // marginLeft: "5px",
      cursor: "pointer"
    }, 
    form: {
      display: "flex",
      justifyContent: "center",
    },
    vote_button_wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    document_wrappup: {
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center",
    },
    document_price: {
      minWidth: "8em",
      textAlign: "right",
      fontSize: "0.8em",
      color: "green",
      marginLeft: "auto",
      // justifySelf: "flex-end"
    }
  })

const showLoan = ({loanAddress, loanDetails, documents}) => {
  // console.log(props.loanAddress, props, props.loanDetails);
  const styles = useStyles();
  const d = new Date();
  // console.log(d.getTime());
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    return await web3.eth.getAccounts();
  };

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
    document.title = 'Loan - Finasys';
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState(0);
  const handleRepay = async () =>{
    setIsLoading(true);
    const loanContract = Loan(loanAddress);
    await loanContract.methods.repay(loanDetails[4]).send({value: web3.utils.toWei(val, 'ether'), from : accounts[0]});
    setIsLoading(false);
  }
  const changeValue= e => {
    const {value} = e.target;
    setVal(value);
  }
  const convertToEther = nwei => {
    // console.log(nwei, nwei.toString());
    return web3.utils.fromWei(nwei.toString(), 'ether');
  }
  const convertToWei = nether => {
    return web3.utils.toWei(nether, 'ether');
  }
  const handleInvest = async() => {
    if(convertToWei(val)>loanDetails[4]){
      triggerAlert({icon: 'error', title: 'Check Paying Value'});
      return ;
    }
    setIsLoading(true);
    const loanContract = Loan(loanAddress);
    await loanContract.methods.addLenders().send({value: web3.utils.toWei(val, 'ether'), from : accounts[0]});
    setIsLoading(false);

  Router.reload(window.location.pathname);
  }
  const castVote = async(vote) => {
    setIsLoading(true);
    const loanContract = Loan(loanAddress);
    await loanContract.methods.addVote(vote, '1000').send({from : accounts[0]});
    setIsLoading(false);
  }
  return (
    <Layout>
      <Grid container 
      style={{padding: "1.5em 0em"}}
      >
      <Grid item xs={3}>
        <Paper style={{padding:"1em", margin:"0 2em"}}>
          <div className={styles.row}> 
            <p className={styles.header}>Principal Amount</p>
            <p className={styles.details}> {convertToEther(loanDetails[3])} ether</p>
          </div>
          <hr styles={styles.horizontal_line} />
          <div className={styles.row}> 
            <p className={styles.header}>Remaining Amount</p>
            <p className={styles.details}> {convertToEther(loanDetails[3]-loanDetails[4])} ether</p>
          </div>
          <hr styles={styles.horizontal_line} />
          <div className={styles.row}> 
            <p className={styles.header}>Interest Rate</p>
            <p className={styles.details}> 2%</p>
          </div>
          <hr styles={styles.horizontal_line} />
          <div className={styles.row}> 
            <p className={styles.header}> Started On</p>
            <p className={styles.details}> 5th Nov 2020</p>
          </div>
          <hr styles={styles.horizontal_line} />
          <div className={styles.row}> 
            <p className={styles.header}>Duration</p>
            <p className={styles.details}> 2 Months</p>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={6} >
        <Paper style={{padding: "1em 2em"}}>
          <p className={styles.title}> {loanDetails[1]}</p>
          <p className={styles.description}>
            {loanDetails[2]}
          </p>
          {
            accounts[0]!==loanDetails[0] ?
            // startsOn + duration
            d.getTime()<loanDetails[5]+loanDetails[6] ?
            (
              <>
                <p className={styles.sub_heading}>Lend Money</p>
                  <form className={styles.form}>
                    <Grid  container justify="center" >
                          <Grid  item xs={3} >
                            <TextField type="Number"  justify="center" 
                            // value={val}
                            onChange={changeValue}
                            disabled={isLoading}
                            InputProps={{
                              endAdornment: <InputAdornment position="start">Ether</InputAdornment>,
                            }}
                              inputProps={{min: 0,max: convertToEther(loanDetails[4]), style: { textAlign: 'center' }}}/>
                          </Grid>
                          <Grid item xs={3} container justify="center" align="center" >
                            <Button onClick={handleInvest} disabled={isLoading} variant="contained" color="primary" endIcon={<SendIcon />}>Lend</Button>
                          </Grid>
                    </Grid>
                  </form>  
               </>
            ) : <>
                <p className={styles.sub_heading}>Agree To Extend the Loan?</p>
                <Grid container  justify="center" >
                  <Grid item xs={2} className={styles.vote_button_wrapper}>
                    <Button onClick={()=>castVote(false)} variant="contained" color="primary"  startIcon={<CheckCircleIcon />}>Yes</Button>
                  </Grid>
                  <Grid item xs={2} className={styles.vote_button_wrapper}>
                    <Button onClick={()=>castVote(true)} startIcon={<CancelIcon />} variant="contained" color="secondary" >No</Button> 
                  </Grid>
                </Grid>
            </>
              :<>
                <p className={styles.sub_heading}>Repay</p>
                  <form className={styles.form}>
                    <Grid  container justify="center" >
                      <Grid  item xs={3} >
                        <TextField type="Number"  justify="center" 
                        disabled={isLoading}
                        InputProps={{
                          endAdornment: <InputAdornment position="start">Ether</InputAdornment>,
                        }}
                          inputProps={{min: 0, max: loanDetails[4], style: { textAlign: 'center' }}}/>
                        </Grid>
                        <Grid item xs={3} container justify="center" align="center" >
                          <Button onClick={handleRepay} variant="contained" color="primary" disabled={isLoading} endIcon={<SendIcon />}>Repay</Button>
                        </Grid>
                      </Grid>
            </form>  
           </>
          }
          </Paper>
        </Grid>

        <Grid item xs={3}>
          
          <Paper style={{padding:"1em", margin:"0 2em"}}>
          <div className={styles.document_wrappup}>
              <span className={styles.header}>Borrower</span>
              <FileCopyIcon 
                   className={styles.copy_icon}
                   onClick={() => {
                    triggerAlert({icon: 'success', title: 'Copied to clipboard'})
                    navigator.clipboard.writeText(loanDetails[0]);
                  }}
                />
            </div>
            <hr styles={styles.horizontal_line} />
            <div className={styles.row}> 
              <p className={styles.header}>Mortgage</p>
              {
                documents.map((document, ind)=>(
                  <div className={styles.document_wrappup} key={ind}>
                <span className={styles.document_name}> {document.description} </span>
                <FileCopyIcon 
                   className={styles.copy_icon}
                   onClick={() => {
                    Toast.fire({
                      icon: "success",
                      title: "Copied to clipboard",
                    });
                    navigator.clipboard.writeText(document.value);
                  }}
                />
                <span className={styles.document_price}>{`${document.value} ether`}</span>

              </div>
                ))
              }
              

            </div>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

showLoan.getInitialProps = async(props) => {
  const loanAddress = props.query.loanAddress;
  const loanContract = Loan(loanAddress);
  const loanDetails = await loanContract?.methods?.getLoanSummary()?.call(); 
  const documentFactoryContract = documentFactory();
  const documents = await Promise.all(
    loanDetails[10].map(async(documentAddress)=>{
      const documentDetails = await documentFactoryContract?.methods?.getDocumentSummary(documentAddress)?.call();
      return {description: documentDetails[3], value: documentDetails[2]};
    })
  )
    //borrower, title, description, principalAmount, currentAmount, startOn, duration, yesVotes, noVotes, isActive, documents
  return {
    loanAddress,
    loanDetails,
    documents,
  };
}

export default showLoan;
