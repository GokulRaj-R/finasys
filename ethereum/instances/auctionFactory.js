import web3 from "../web3";
import auctionFactorySOL from "../build/Auction.solAuctionFactory.json";

const auctionFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(auctionFactorySOL.interface),
    "0xe2fd5d9779c53dAf2ccac6629f3F8BCAda91387B"
  );
};

export default auctionFactory;
