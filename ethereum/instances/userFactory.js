import web3 from "../web3";
import userFactorySOL from "../build/User.solUserFactory.json";

const userFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(userFactorySOL.interface),
    "0x862F08C490Db4B5D6288bc54B936D634a92FBdC3"
  );
};

export default userFactory;
