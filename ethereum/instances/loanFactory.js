import web3 from "../web3";
import loanFactorySOL from "../build/Loan.solLoanFactory.json";

const loanFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(loanFactorySOL.interface),
    "0xc4199e9b24493b28DA6eE453374E392a0aC1B152"
  );
};

export default loanFactory;
