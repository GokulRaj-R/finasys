pragma solidity ^0.4.17;

// import loan contract

contract Loan {
    address borrower;
    string description;
    uint principalAmount;
    uint currentAmount;
    uint duration;
    uint lastPayedOn;
    uint extended;
    mapping(address=>uint) lenders;
    uint yesVotes;
    uint noVotes;
    mapping(address=>bool) voteBy;
    bool isactive;
    function addVote(address lender, bool want) public{
        
    }
    
    function callAuctionFactory() {
        
    }
    function addLenders(){
        
    }
    function repay(uint amt){
        
    }

}



contract AuctionFactory {
    address[] deployedAuctions;
    
    // Decide who creates this new auction (suggestion: make loan contract create new Auction, !!!avoid recursive import!!!)
    function createAuction(address newAuctionItem, uint auctionExpiryDate, uint minimumBidValue) public {
        address newAuction = new Auction(newAuctionItem, auctionExpiryDate, minimumBidValue);
        deployedAuctions.push(newAuction);
    }
    
    function getDeployedAuctions() public view returns (address[]) {
        return deployedAuctions;
    }
}

contract Auction {
    
    uint public expiryDate;
    uint public currentBid;
    uint public minimumBid;
    bool public isActive;
    address public loanAddress;
    address public currentBidder;
    // Create new loan instance
    
    function Auction(address newAuctionItem, uint auctionExpiryDate, uint minimumBidValue) public {
        isActive = true;
        minimumBid = minimumBidValue;
        expiryDate = auctionExpiryDate;
        loanAddress = newAuctionItem;
        // make loan instance point to actual loan
    }
    
    function bid(uint date) public payable {
        require(msg.value > currentBid && msg.value > minimumBid && date < expiryDate && isActive);
        if (currentBid > 0) currentBidder.transfer(currentBid);
        currentBid = msg.value;
        currentBidder = msg.sender;
    }
    
        function auctionSummary() public view returns (uint, uint, uint, address, address, bool) {
        return (
            expiryDate,
            currentBid,
            minimumBid,
            loanAddress,
            currentBidder,
            isActive
        );
    }
    
    function finalizeAuction() public {
        //Retrieve list of lenders from loan contract 
        //Distribute according to their contribution
        isActive = false;
    }
}
