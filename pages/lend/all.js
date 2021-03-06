import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import Layout from "../../components/Layout";
import CardList from "../../components/CardList";
import Loan from "../../ethereum/instances/loan";
import LoanFactory from "../../ethereum/instances/loanFactory";
import { useRouter } from "next/router";
import loanBG from "../../assets/images/loanBG.jpg";

const loanIndex = () => {
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  const [findAddress, setFindAddress] = useState("");
  const getLoans = async () => {
    const loanFactory = LoanFactory();
    const loanAddresses = await loanFactory.methods.getDeployedLoans().call();

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
    document.title = "Loans - Finasys";
    getLoans();
  }, []);

  const handleChange = (event) => {
    setFindAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/lend/${findAddress}`);
  };

  const headStyle = {
    textAlign: "center",
    fontFamily: "Georgia",
    fontWeight: "100",
    fontSize: "1.75rem",
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

  return (
    <Layout>
      <Grid
        style={{
          paddingBottom: "80px",
          paddingTop: "100px",
          backgroundImage: `url(${loanBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: "50px",
        }}
        container
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <p style={headStyle}>
            Discover the best and brightest investment options at Finasys.
          </p>
        </Grid>
        <Grid item xs={12}>
          <p style={subheadStyle}>
            Browse through all loans or find a specific one.
          </p>
        </Grid>
        <Grid style={{ paddingRight: "40px" }} item xs={7} sm={7} md={7}>
          <form onSubmit={handleSubmit} fullwidth="true" autoComplete="off">
            <TextField
              onChange={handleChange}
              id="full-width-text-field"
              type="text"
              label="Loan Address"
              variant="outlined"
              display="inline"
              style={{ width: "100%" }}
              required
            />
          </form>
        </Grid>
        <Grid item>
          <Button
            disabled={!findAddress.length}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <CardList cards={loans} />
    </Layout>
  );
};

export default loanIndex;
