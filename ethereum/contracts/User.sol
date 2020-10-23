pragma solidity ^0.4.17;

contract UserFactory {
    mapping(uint256 => string) public name;
    mapping(address => uint256) public aadharToUser;
    mapping(uint256 => address[]) public userToAadhar;
    mapping(uint256 => address[]) public investments;
    mapping(uint256 => address[]) public loans;

    function validateUser(uint256 aadhar, string memory userName) public {
        address user = msg.sender;
        name[aadhar] = userName;
        aadharToUser[user] = aadhar;
        userToAadhar[aadhar].push(user);
    }

    function checkValidity(address user) public view returns (bool) {
        return aadharToUser[user] > 0;
    }

    function addUserLoan(address currUser, address loan) public {
      loans[aadharToUser[currUser]].push(loan);
    }

    function addUserInvestment(address currUser, address investment) public {
      investments[aadharToUser[currUser]].push(investment);
    }

    function getUserLoans(address currUser) public view returns (address[]) {
        return loans[aadharToUser[currUser]];
    }

    function getUserInvestments(address currUser)
        public
        view
        returns (address[])
    {
        return investments[aadharToUser[currUser]];
    }

    function getUserSummary(address currUser) public view returns (string memory, address[], address[]) {
      return (
        name[aadharToUser[currUser]],
        loans[aadharToUser[currUser]],
        investments[aadharToUser[currUser]]
       );
    }
}

