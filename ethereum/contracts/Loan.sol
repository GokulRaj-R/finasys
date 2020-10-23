pragma solidity ^0.4.17;
import "./Auction.sol";
import "./User.sol";

contract LoanFactory {
    address[] public deployedLoans;
    address public auctionFactoryAddress;
    address public userFactoryAddress;

    constructor(address auctionFactory, address userFactory) public {
        auctionFactoryAddress = auctionFactory;
        userFactoryAddress = userFactory;
    }

    function createLoan(
        string title,
        string description,
        uint256 amount,
        uint256 duration,
        uint256 currentTime,
        bool typeOfLoan,
        address[] documentsAddresses
    ) public {
        address newLoan = new Loan(
            title,
            description,
            amount,
            duration,
            currentTime,
            msg.sender,
            auctionFactoryAddress,
            userFactoryAddress,
            typeOfLoan,
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
    string public title;
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
    bool public loanType;
    uint256 public totalAmount;
    AuctionFactory auctionFactory;
    UserFactory userFactory;

    constructor(
        string memory loanTitle,
        string memory descrip,
        uint256 amount,
        uint256 t,
        uint256 currentTime,
        address borrowerAddress,
        address auctionFactoryAddress,
        address userFactoryAddress,
        bool typeOfLoan,
        address[] documentsAddresses
    ) public {
        borrower = borrowerAddress;
        title = loanTitle;
        description = descrip;
        principalAmount = amount;
        duration = t;
        isActive = true;
        noVotes = 0;
        yesVotes = 0;
        startOn = currentTime;
        loanType = typeOfLoan; // loanType=0, loan starts immediately
        documents = documentsAddresses;
        auctionFactory = AuctionFactory(auctionFactoryAddress);
        userFactory = UserFactory(userFactoryAddress);
        userFactory.addUserLoan(borrower, address(this));
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

    function() external payable {}

    function addVote(bool want, uint256 extendTime) public isLender {
        voteBy[msg.sender] = want;
        if (want) yesVotes += lenders[msg.sender];
        else noVotes += lenders[msg.sender];

        if (yesVotes * 2 > principalAmount) {
            auctionFactory.createAuction(address(this), 10000, 100);
            isActive = false;
        } else if (noVotes * 2 >= principalAmount) {
            extendLoan(extendTime);
        }
    }

    function extendLoan(uint256 extendTime) public {
        extended = extendTime;
    }

    function addLenders() public payable isNotBorrower {
        if (lenders[msg.sender] == 0) lendersArray.push(msg.sender);
        lenders[msg.sender] = lenders[msg.sender] + msg.value;
        currentAmount = currentAmount + msg.value;
        userFactory.addUserInvestment(msg.sender, address(this));

        if (!loanType) {
            borrower.transfer(msg.value);
        } else if (currentAmount == principalAmount) {
            uint256 totalBalance = address(this).balance;
            borrower.transfer(totalBalance);
        }
    }

    //borrower, title, description, principalAmount, currentAmount, startOn, duration, yesVotes, noVotes, isActive, documents
    function getLoanSummary()
        public
        view
        returns (
            address,
            string,
            string,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            address[]
        )
    {
        return (
            borrower,
            title,
            description,
            principalAmount,
            currentAmount,
            startOn,
            duration,
            yesVotes,
            noVotes,
            isActive,
            documents
        );
    }

    // remainingAmount should be calculated at frontend and it is equal to the amoung the user have to pay.
    function repay(uint256 remainingAmount) public payable isBorrower {
        currentAmount = remainingAmount;
        totalAmount = totalAmount + msg.value;
        if (remainingAmount == 0) {
            isActive = false;
            distributeAmount();
        }
    }

    function getDocuments() public view returns (address[]) {
        return documents;
    }

    function distributeAmount() public {
        uint256 sendAmount = address(this).balance;
        for (uint256 index = 0; index < lendersArray.length; index++) {
            uint256 amt = sendAmount * lenders[lendersArray[index]];
            amt = amt / principalAmount;
            lendersArray[index].transfer(amt);
        }
    }
}

