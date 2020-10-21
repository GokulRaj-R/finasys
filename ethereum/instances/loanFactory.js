import web3 from "../web3";
import loanFactorySOL from "../build/Loan.solLoanFactory.json";

const loanFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(loanFactorySOL.interface),
    "0xC70B0F886fD43f1FD39061F6c7A5f99783d274E6"
  );
};

export default loanFactory;
