import web3 from "../web3";
import LoanSOL from "../build/Loan.solLoan.json";
const loan = (address) => {
  return new web3.eth.Contract(JSON.parse(LoanSOL.interface), address);
};

export default loan;
