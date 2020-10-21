import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import loanFactory from "../../ethereum/instances/loanFactory";

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
      <div>
        <h3>Open Loans</h3>
        {/* {renderLoan()} */}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const lFactory = loanFactory();
  const loans = await lFactory.methods.getDeployedLoans().call();
  return { props: { loans } };
}

export default loanIndex;
