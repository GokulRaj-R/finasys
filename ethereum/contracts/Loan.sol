pragma solidity ^0.5.17;
import './ABDKMath64x64.sol';

contract LoanFactory {
   address[] deployedLoans;
    
    function createLoan(string description, uint amount, uint duration, uint currentTime) public {
        address newLoan = new Loan(description, amount, duration, currentTime, msg.sender);
        deployedLoans.push(newLoan);
    }
    
    function getDeployedLoans() public view returns (address[]) {
        return deployedLoans;
    }
}

contract Loan {
    address public borrower;
    string public description;
    uint public principalAmount;
    uint public currentAmount;
    uint public startOn;
    uint public duration;
    uint public extended;
    mapping(address=>uint) public lenders;
    uint public totalLenders;
    uint public yesVotes;
    mapping(address=>bool) public voteBy;
    bool isActive;
    
    constructor(string memory title, uint amount, uint t, address borrowerAddress) public{
        borrower=borrowerAddress;
        description = title;
        principalAmount = amount;
        duration = t;
        isActive = true;
        totalLenders = 0;
    }
    
    
    modifier isLender(){
        require(lenders[msg.sender]!=0);
        _;
    }
    modifier isBorrower(){
        require(borrower==msg.sender);
        _;
    }
 
    function addVote(bool want) public isLender{
        voteBy[msg.sender]=want;
        yesVotes++;
        // if(yesVotes*2>=totalLenders)
        //     callAuctionFactory();
    }
   
    function addLenders(uint amt) public{
        lenders[msg.sender]=amt;
        totalLenders++;
    }
    function pow (int128 x, int128 n)
        public pure returns (int128 r) {
        r = ABDKMath64x64.fromUInt (1);
        while (n > 0) {
            if (n % 2 == 1) {
            r = ABDKMath64x64.mul (r, x);
            n -= 1;
            } else {
            x = ABDKMath64x64.mul (x, x);
            n /= 2;
            }
        }
    }
    function repay(uint amt, uint currentTime) public payable{
        uint monthSeconds = 2629746;
        uint time =currentTime - startOn;
        int128 n = ABDKMath64x64.divu(time+monthSeconds-1, monthSeconds);
        uint actualPrincipal = principalAmount - currentAmount ;
        uint ratio = 5;
        uint cIAmount = ABDKMath64x64.mulu (
                        pow (
                        ABDKMath64x64.add (
                            ABDKMath64x64.fromUInt (1), 
                            ABDKMath64x64.divu (
                            ratio,
                            10**2)),
                        n),
                        actualPrincipal);
        uint interest = cIAmount - actualPrincipal;
        amt = amt - interest;
        currentAmount = currentAmount + amt;
        if(currentAmount == principalAmount)
            isActive = false;
    }

}
