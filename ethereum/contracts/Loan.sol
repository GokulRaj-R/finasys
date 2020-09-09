pragma solidity ^0.4.17;
import "./Auction.sol";

contract LoanFactory {
    address[] deployedLoans;

    function createLoan(
        string description,
        uint256 amount,
        uint256 duration,
        uint256 currentTime,
        address auctionFactory, 
        address[] documentsAddresses
    ) public {
        address newLoan = new Loan(
            description,
            amount,
            duration,
            currentTime,
            msg.sender,
            auctionFactory, 
            documentsAddresses
        );
        deployedLoans.push(newLoan);
    }

    function getDeployedLoans() public view returns (address[]) {
        return deployedLoans;
    }
}

contract Loan {
    address public borrower;
    address public auctionFactory;
    string public description;
    uint256 public principalAmount;
    uint256 public currentAmount;
    uint256 public startOn;
    uint256 public duration;
    uint256 public extended;
    mapping(address => uint256) public lenders;
    address[] public lendersArray;
    address[] public documents;
    uint256 public yesVotes;
    uint256 public noVotes;
    mapping(address => bool) public voteBy;
    bool public isActive;
    uint public totalAmount;

    constructor(
        string memory title,
        uint256 amount,
        uint256 t,
        uint256 currentTime,
        address borrowerAddress,
        address auctionFactoryAddress,
        address[] documentsAddresses
    ) public {
        borrower = borrowerAddress;
        description = title;
        principalAmount = amount;
        duration = t;
        isActive = true;
        noVotes = 0;
        yesVotes = 0;
        startOn = currentTime;
        auctionFactory = auctionFactoryAddress;
        documents = documentsAddresses;
    }

    modifier isLender() {
        require(lenders[msg.sender] != 0);
        _;
    }
    modifier isBorrower() {
        require(borrower == msg.sender);
        _;
    }
    modifier isNotBorrower() {
        require(borrower != msg.sender);
        _;
    }

    function addVote(bool want, uint256 extendTime) public isLender {
        voteBy[msg.sender] = want;
        if (want) yesVotes += lenders[msg.sender];
        else noVotes += lenders[msg.sender];

        if (yesVotes * 2 > principalAmount) {
            AuctionFactory auction = AuctionFactory(auctionFactory);
            auction.createAuction(address(this), 10000, 100);
            isActive = false;
        } else if (noVotes * 2 >= principalAmount) {
            extendLoan(extendTime);
        }
    }

    function extendLoan(uint256 extendTime) public {
        extended = extendTime;
    }

    function addLenders() public payable isNotBorrower {
        if(lenders[msg.sender]==0)
            lendersArray.push(msg.sender);
        lenders[msg.sender] = lenders[msg.sender] + msg.value;
    }

    //borrower, description, principalAmount, currentAmount, startOn, duration, extended, yesVotes, noVotes, isActive
    function getLoanSummary()
        public
        returns (
            address,
            string,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            address[], 
            address[]
        )
    {
        return (
            borrower,
            description,
            principalAmount,
            currentAmount,
            startOn,
            duration,
            extended,
            yesVotes,
            noVotes,
            isActive, 
            lendersArray, 
            documents
        );
    }

    function repay(uint256 remainingAmount) public payable isBorrower {
        currentAmount = remainingAmount;
        totalAmount = totalAmount + msg.value;
        if (remainingAmount == principalAmount) {
            isActive = false;
            distributeAmount(totalAmount);
        }
    }

    function getDocuments() public view returns(address[]) {
        return documents;
    }

    function distributeAmount(uint amountToDistribute) public {
        for(uint index = 0; index < lendersArray.length; index++){
            uint amt = amountToDistribute * lenders[lendersArray[index]];
            amt = amt / principalAmount;
            lendersArray[index].transfer(amt);
        }
    }
}
