import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && (window.ethereum || window.web3)) {
  if (window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    window.ethereum.enable();
    web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/8a2169fa16fb4ed0b9021e87489f6242'
  );
  web3 = new Web3(provider);
}

export default web3;
