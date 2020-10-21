import web3 from "../web3";
import AuctionSOL from "../build/Auction.solAuction.json";
const auction = (address) => {
  return new web3.eth.Contract(JSON.parse(AuctionSOL.interface), address);
};

export default auction;
