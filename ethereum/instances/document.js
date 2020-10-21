import web3 from "../web3";
import DocumentSOL from "../build/Document.solDocument.json";
const document = (address) => {
  return new web3.eth.Contract(JSON.parse(DocumentSOL.interface), address);
};

export default document;
