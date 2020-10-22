import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CardList from "../../components/CardList";
import Auction from "../../ethereum/instances/auction";
import AuctionFactory from "../../ethereum/instances/auctionFactory";

const auctionIndex = () => {
  const [auctions, setAuctions] = useState([]);

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

  useEffect(() => {
    getAuctions();
  }, []);

  return (
    <Layout>
      <h1>Active Auctions</h1>
      <CardList cards={auctions} />
    </Layout>
  );
};

export default auctionIndex;
