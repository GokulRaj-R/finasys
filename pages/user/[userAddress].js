import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AuctionFactory from "../../ethereum/instances/auctionFactory";
import Auction from "../../ethereum/instances/auction";
import LoanFactory from "../../ethereum/instances/LoanFactory";
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
  const [auctions, setAuctions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  const getAuctions = async () => {
    const auctionFactory = AuctionFactory();
    const auctionAddresses = await auctionFactory.methods
      .getDeployedAuctions()
      .call();

    const allAuctions = await Promise.all(
      auctionAddresses.map(async (auctionAddress) => {
        const auction = Auction(auctionAddress);
        const summary = await auction.methods.auctionSummary().call();
        return {
          address: auctionAddress,
          borrower: summary[0],
          description: summary[1],
          type: -1,
        };
      })
    );
    setAuctions(allAuctions);
  };

  const getLoans = async () => {
    const loanFactory = LoanFactory();
    const loanAddresses = await loanFactory.methods.getDeployedLoans().call();

    const allLoans = await Promise.all(
      loanAddresses.map(async (loanAddress) => {
        const loan = Loan(loanAddress);
        const summary = await loan.methods.getLoanSummary().call();
        console.log(summary);
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
    getAuctions();
    getLoans();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    console.log(tabIndex);
  };

  const router = useRouter();
  console.log("address", router.query);
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
            auctions/loans
            <CardList cards={tabIndex ? auctions : loans} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default showUser;
