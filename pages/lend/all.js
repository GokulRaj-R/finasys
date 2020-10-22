import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CardList from "../../components/CardList";
import Loan from "../../ethereum/instances/loan";
import LoanFactory from "../../ethereum/instances/loanFactory";

const loanIndex = () => {
  const [loans, setLoans] = useState([]);

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
    getLoans();
  }, []);

  return (
    <Layout>
      <h1>Active loans</h1>
      <CardList cards={loans} />
    </Layout>
  );
};

export default loanIndex;
