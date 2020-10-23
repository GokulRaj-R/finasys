import web3 from "../web3";
import documentFactorySOL from "../build/Document.solDocumentFactory.json";

const documentFactory = () => {
  return new web3.eth.Contract(
    JSON.parse(documentFactorySOL.interface),
    "0x7fE9Ea603909de51a2E61B195c1D9e13E74d82a7"
  );
};

export default documentFactory;
