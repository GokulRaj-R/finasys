const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const DocumentFactory = require("./build/Document.solDocumentFactory.json");
const UserFactory = require("./build/User.solUserFactory.json");
const AuctionFactory = require("./build/Auction.solAuctionFactory.json");
const LoanFactory = require("./build/Loan.solLoanFactory.json");

const provider = new HDWalletProvider(
  "spider luxury dolphin thunder law injury annual media negative light shaft steel",
  "https://rinkeby.infura.io/v3/b35f31da16654d00a2cdbfa2bacbe71a"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from accounts", accounts[0]);

  console.log("Attempting to deploy from accounts", accounts[0]);
  const gasLimit = 3000000;
  // const userResult = await new web3.eth.Contract(JSON.parse(UserFactory.interface))
  //     .deploy({ data: UserFactory.bytecode})
  //     .send({ gas: gasLimit, from : accounts[0]});

  // console.log('User Factory Contract deployed to', userResult.options.address);

  // const documentResult = await new web3.eth.Contract(JSON.parse(DocumentFactory.interface))
  //     .deploy({ data: DocumentFactory.bytecode, arguments: [userResult.options.address]})
  //     .send({ gas: gasLimit, from : accounts[0]});

  // console.log('Document Factory Contract deployed to', documentResult.options.address);

  // const auctionResult = await new web3.eth.Contract(JSON.parse(AuctionFactory.interface))
  //     .deploy({ data: AuctionFactory.bytecode, arguments: [documentResult.options.address]})
  //     .send({ gas: gasLimit, from : accounts[0]});

  // console.log('Auction Factory Contract deployed to', auctionResult.options.address);

  const loanResult = await new web3.eth.Contract(
    JSON.parse(LoanFactory.interface)
  )
    .deploy({
      data: UserFactory.bytecode,
      arguments: ["0x02FA671Ab121f5F3A97cE72B737EB53d37F92763"],
    })
    .send({ gas: gasLimit, from: accounts[0] });

  console.log("Loan Factory Contract deployed to", loanResult.options.address);
};

deploy();
