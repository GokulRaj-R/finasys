import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import UserFactory from '../../ethereum/instances/userFactory';
import Loan from '../../ethereum/instances/loan';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardList from '../../components/CardList';
import { useRouter } from 'next/router';
import web3 from '../../ethereum/web3';

const useStyles = makeStyles({
  base: {
    textAlign: 'center',
  },
});

const headStyle = {
  paddingTop: '50px',
  textAlign: 'center',
  fontFamily: 'Georgia',
  fontWeight: '100',
  fontSize: '3rem',
  margin: '0',
  color: '#454545',
};

const subheadStyle = {
  textAlign: 'center',
  fontFamily: 'Georgia',
  fontWeight: '100',
  fontSize: '20px',
  color: '#5c5c5c',
};

const showUser = () => {
  const [isValid, setIsValid] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [name, setName] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [newName, setNewName] = useState('');
  const [id, setId] = useState();

  const documents = [
    {
      address: '0x5be300195834a4c9ecf824838ae786834775b05b',
      valuation: 1000,
      description: 'First document',
    },
    {
      address: '0x6ed5ab366a38807de68be44ada35f93c63a759ff',
      valuation: 2000,
      description: 'Second document',
    },
    {
      address: '0xb6309e6038b87cef84bf2e609fc81a7a24894bfb',
      valuation: 3000,
      description: 'Third document',
    },
  ];
  const classes = useStyles();
  const router = useRouter();

  const getUserSummary = async (userAddress) => {
    const userFactory = UserFactory();
    let summary;
    try {
      const validUser = await userFactory.methods
        .checkValidity(router.query.userAddress)
        .call();
      if (!validUser) throw 'invalid';
      summary = await userFactory.methods.getUserSummary(userAddress).call();
    } catch (err) {
      console.log(err);
      setIsValid(false);
      setTabIndex(3);
      return;
    }

    setName(summary[0]);
    const loanAddresses = summary[1];
    const investmentAddresses = summary[2];

    const allInvestments = await Promise.all(
      investmentAddresses.map(async (investmentAddress) => {
        const loan = Loan(investmentAddress);
        const summary = await loan.methods.getLoanSummary().call();
        return {
          title: summary[1],
          address: investmentAddress,
          borrower: summary[0],
          description: summary[2],
          type: Math.random() > 0.5 ? 1 : 0,
        };
      })
    );
    setInvestments(allInvestments);

    const allLoans = await Promise.all(
      loanAddresses.map(async (loanAddress) => {
        const loan = Loan(loanAddress);
        const summary = await loan.methods.getLoanSummary().call();
        return {
          title: summary[1],
          address: loanAddress,
          borrower: summary[0],
          description: summary[2],
          type: Math.random() > 0.5 ? 1 : 0,
        };
      })
    );
    setLoans(allLoans);
  };

  useEffect(() => {
    window.title = 'User - Finasys';
    if (router.query.userAddress) {
      getUserSummary(router.query.userAddress);
    }
  }, [router.query.userAddress]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onAadharChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userFactory = UserFactory();
    const accounts = await web3.eth.getAccounts();

    await userFactory.methods
      .validateUser(parseInt(id, 10), newName)
      .send({ from: accounts[0] });

    await getUserSummary(router.query.userAddress);
    setTabIndex(0);
    setIsValid(true);
  };

  return (
    <Layout>
      <Grid container justify="center">
        <Grid item xs={12}>
          <p style={headStyle}>{`Welcome ${name}!`}</p>
        </Grid>
        <Grid item xs={12}>
          <p style={subheadStyle}>
            {isValid
              ? 'Thanks for connecting, you can access your personal loans, investments, and submitted documents here.'
              : 'Please verify yourself to continue using the service.'}
          </p>
        </Grid>
        <Grid
          container
          justify="center"
          className={`${classes.base}`}
          item
          xs={12}
        >
          <Tabs
            style={{ paddingTop: '50px' }}
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab disabled={!isValid} label="Loans" />
            <Tab disabled={!isValid} label="Investments" />
            <Tab disabled={!isValid} label="Documents" />
            <Tab disabled={isValid} label="Verify Yourself" />
          </Tabs>
          <Grid
            style={{ paddingTop: '50px' }}
            className={`${classes.base}`}
            item
            xs={12}
          >
            {isValid ? (
              // <CardList cards={tabIndex ? investments : loans} type/>
              <>
                {tabIndex == 0 && <CardList cards={loans} type="0" />}
                {tabIndex == 1 && <CardList cards={investments} type="0" />}
                {tabIndex == 2 && <CardList cards={documents} type="1" />}
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container justify="center">
                  <Grid
                    style={{
                      marginLeft: '20%',
                      marginRight: '20%',
                      marginBottom: '50px',
                    }}
                    xs={12}
                    item
                  >
                    <TextField
                      fullWidth
                      onChange={onNameChange}
                      id="filled-basic"
                      label="Name"
                      variant="filled"
                    />
                  </Grid>
                  <Grid
                    style={{
                      marginLeft: '20%',
                      marginRight: '20%',
                      marginBottom: '50px',
                    }}
                    xs={12}
                    item
                  >
                    <TextField
                      fullWidth
                      onChange={onAadharChange}
                      id="filled-basic"
                      label="Aadhar Id"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button type="submit" variant="outlined" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default showUser;
