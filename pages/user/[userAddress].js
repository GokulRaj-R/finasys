import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import User from "../../ethereum/instances/user";
import Loan from "../../ethereum/instances/Loan";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardList from "../../components/CardList";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  base: {
    textAlign: "center",
  },
});

const showUser = () => {
  const [investments, setInvestments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const router = useRouter();

  const getInvestments = async (userAddress) => {
    const user = User(userAddress);
    const investmentAddresses = await user.methods.getAllInvestments().call();

    const allInvestments = await Promise.all(
      investmentAddresses.map(async (investmentAddress) => {
        const loan = Loan(investmentAddress);
        const summary = await loan.methods.getLoanSummary().call();
        return {
          address: investmentAddress,
          borrower: summary[0],
          description: summary[1],
          type: -1,
        };
      })
    );
    setInvestments(allInvestments);
  };

  const getLoans = async (userAddress) => {
    const user = User(userAddress);
    const loanAddresses = await user.methods.getAllLoans().call();

    const allLoans = await Promise.all(
      loanAddresses.map(async (loanAddress) => {
        const loan = Loan(loanAddress);
        const summary = await loan.methods.getLoanSummary().call();
        return {
          address: loanAddress,
          borrower: summary[0],
          description: summary[1],
          type: 0,
        };
      })
    );
    setLoans(allLoans);
  };

  useEffect(() => {
    window.title = "User - Finasys";
    if (router.query.userAddress) {
      // getInvestments(router.query.userAddress);
      // getLoans(router.query.userAddress);
    }
  }, [router.query.userAddress]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Layout>
      <Grid container justify="center">
        <Grid className={`${classes.base}`} item xs={12}>
          user details
        </Grid>
        <Grid
          container
          justify="center"
          className={`${classes.base}`}
          item
          xs={12}
        >
          <Tabs
            style={{ paddingTop: "50px" }}
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Loans" />
            <Tab label="Investments" />
          </Tabs>
          <Grid
            style={{ paddingTop: "50px" }}
            className={`${classes.base}`}
            item
            xs={12}
          >
            {/* <CardList cards={tabIndex ? investments : loans} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default showUser;
