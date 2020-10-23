import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserFactory from "../../ethereum/instances/userFactory";
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

const headStyle = {
  paddingTop: "50px",
  textAlign: "center",
  fontFamily: "Georgia",
  fontWeight: "100",
  fontSize: "3rem",
  margin: "0",
  color: "#454545",
};

const subheadStyle = {
  textAlign: "center",
  fontFamily: "Georgia",
  fontWeight: "100",
  fontSize: "20px",
  color: "#5c5c5c",
};

const showUser = () => {
  const [investments, setInvestments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [name, setName] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const classes = useStyles();
  const router = useRouter();

  const getUserSummary = async (userAddress) => {
    const userFactory = UserFactory();
    const summary = await userFactory.methods
      .getUserSummary(userAddress)
      .call();

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
    window.title = "User - Finasys";
    if (router.query.userAddress) {
      getUserSummary(router.query.userAddress);
    }
  }, [router.query.userAddress]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Layout>
      <Grid container justify="center">
        <Grid item xs={12}>
          <p style={headStyle}>{`Welcome ${name}!`}</p>
        </Grid>
        <Grid item xs={12}>
          <p style={subheadStyle}>
            Thanks for connecting, you can access your personal loans and
            investments here.
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
            <CardList cards={tabIndex ? investments : loans} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default showUser;
