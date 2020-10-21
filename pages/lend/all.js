import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CardList from "../../components/CardList";
import Loan from "../../ethereum/instances/loan";
import LoanFactory from "../../ethereum/instances/loanFactory";

const loanIndex = ({ loans }) => {
  // const renderLoan = () => {
  //   const items = loans.map((address) => {
  //     return {
  //       header: address,
  //       description: (
  //         <Link route={`/campaigns/${address}`}>
  //           <a>View Campaign</a>
  //         </Link>
  //       ),
  //       fluid: true,
  //     };
  //   });
  //   return <Card.Group items={items} />;
  // };
  console.log(loans);
  return (
    <Layout>
      <h1>Active loans</h1>
      <CardList />
      {/* {renderLoan()} */}
    </Layout>
  );
};

export async function getStaticProps() {
  const loanFactory = LoanFactory();
  const loanAddresses = await loanFactory.methods.getDeployedLoans().call();

  const loans = await Promise.all(
    loanAddresses.map(async (loanAddress) => {
      const loan = Loan(loanAddress);
      const summary = await loan.methods.getLoanSummary().call();
      console.log(summary);
      return {
        borrower: summary[0],
        description: summary[1],
      };
    })
  );
  return { props: { loans } };
}

export default loanIndex;
