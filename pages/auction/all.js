import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import Layout from "../../components/Layout";
import CardList from "../../components/CardList";
import Auction from "../../ethereum/instances/auction";
import AuctionFactory from "../../ethereum/instances/auctionFactory";
import { Router } from "../../routes";
import auctionBG from "../../assets/images/auctionBG.jpeg";

const auctionIndex = () => {
  const [auctions, setAuctions] = useState([]);
  const [findAddress, setFindAddress] = useState("");

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

  const handleChange = (event) => {
    setFindAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Router.pushRoute(`/lend/${findAddress}`);
  };

  const headStyle = {
    textAlign: "center",
    fontFamily: "Georgia",
    fontWeight: "100",
    fontSize: "1.75rem",
    margin: "0",
  };

  const subheadStyle = {
    textAlign: "center",
    fontFamily: "Georgia",
    fontWeight: "100",
    fontSize: "20px",
  };

  return (
    <Layout>
      <Grid
        style={{
          paddingBottom: "80px",
          paddingTop: "100px",
          backgroundImage: `url(${auctionBG})`,
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
            Discover fascinating and affordable auction items at Finasys.
          </p>
        </Grid>
        <Grid item xs={12}>
          <p style={subheadStyle}>
            Browse through all of them or find a specific one.
          </p>
        </Grid>
        <Grid style={{ paddingRight: "40px" }} item xs={7} sm={7} md={7}>
          <form onSubmit={handleSubmit} fullwidth="true" autoComplete="off">
            <TextField
              onChange={handleChange}
              id="full-width-text-field"
              type="text"
              label="Auction Address"
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

      <CardList cards={auctions} />
    </Layout>
  );
};

export default auctionIndex;
