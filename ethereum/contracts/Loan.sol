pragma solidity ^0.4.17;
import './Auction.sol';

contract LoanFactory {
   address[] deployedLoans;
    
    function createLoan(string description, uint amount, uint duration, uint currentTime, address auctionFactory) public {
        address newLoan = new Loan(description, amount, duration, currentTime, msg.sender, auctionFactory);
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
    uint public principalAmount;
    uint public currentAmount;
    uint public startOn;
    uint public duration;
    uint public extended;
    mapping(address=>uint) public lenders;
    uint public yesVotes;
    uint public noVotes;
    mapping(address=>bool) public voteBy;
    bool isActive;
    constructor(string memory title, uint amount, uint t, uint currentTime, address borrowerAddress, address auctionFactoryAddress) public{
        borrower=borrowerAddress;
        description = title;
        principalAmount = amount;
        duration = t;
        isActive = true;
        noVotes = 0;
        startOn= currentTime;
        auctionFactory = auctionFactoryAddress;
    }

    modifier isLender() {
        require(lenders[msg.sender] != 0);
        _;
    }
    modifier isBorrower() {
        require(borrower == msg.sender);
        _;
    }
 
    function addVote(bool want, uint extendTime) public isLender{
        voteBy[msg.sender]=want;
        if(want)
            yesVotes+=lenders[msg.sender];
        else noVotes+=lenders[msg.sender];

        if(yesVotes*2>principalAmount){
            AuctionFactory auction = AuctionFactory(auctionFactory);
            auction.createAuction(address(this), 10000, 100);
            isActive = false;
        }
        else if(noVotes*2>=principalAmount){
            extendLoan(extendTime);
        }
    }
    
    function extendLoan(uint extendTime) public{
        extended=extendTime;
    }
    function addLenders() public payable{
        lenders[msg.sender]=msg.value;
    }
    //borrower, description, principalAmount, currentAmount, startOn, duration, extended, yesVotes, noVotes, isActive
    function getLoanSummary() public returns(address, string, uint, uint , uint, uint, uint, uint, uint, bool){
        return (
            borrower, description, principalAmount, currentAmount, startOn, duration, extended, yesVotes, noVotes, isActive
        );
    }
   
    function repay(uint remainingAmount) public payable{
        currentAmount = remainingAmount;
        if(remainingAmount == principalAmount)
            isActive = false;
        
        // uint monthSeconds = 2629746;
        // uint time =currentTime - startOn;
        // int128 n = ABDKMath64x64.divu(time+monthSeconds-1, monthSeconds);
        // uint actualPrincipal = principalAmount - currentAmount ;
        // uint ratio = 5;
        // uint cIAmount = ABDKMath64x64.mulu (
        //                 pow (
        //                 ABDKMath64x64.add (
        //                     ABDKMath64x64.fromUInt (1), 
        //                     ABDKMath64x64.divu (
        //                     ratio,
        //                     10**2)),
        //                 n),
        //                 actualPrincipal);
        // uint interest = cIAmount - actualPrincipal;
        // amt = amt - interest;
    }
}


//repay
//summary
//extend