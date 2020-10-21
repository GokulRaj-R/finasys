import web3 from "../web3";
import UserSOL from "../build/User.solUser.json";
const user = (address) => {
  return new web3.eth.Contract(JSON.parse(UserSOL.interface), address);
};

export default user;
