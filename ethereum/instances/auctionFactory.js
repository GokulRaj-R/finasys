import web3 from "../web3";
import auctionFactorySOL from "../build/Auction.solAuctionFactory.json";

const auctionFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(auctionFactorySOL.interface),
    "0x2a795006760192317dc8416520a4EF90211AFc63"
  );
};

export default auctionFactory;
