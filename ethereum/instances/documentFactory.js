import web3 from "../web3";
import documentFactorySOL from "../build/Document.solDocumentFactory.json";

const documentFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(documentFactorySOL.interface),
    "0x86637094753Ae1E7D2Fe522EC1a2BfeceE8fA772"
  );
};

export default documentFactory;
