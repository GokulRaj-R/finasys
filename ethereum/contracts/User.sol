pragma solidity ^0.4.17;

contract UserFactory {
    address[] public deployedUsers;
    mapping(address => uint256) aadharToUser;
    mapping(uint256 => address[]) userToAadhar;

    function createUser(address[] loans, address[] investments) public returns(address) {
        address User = new User(loans, investments);
        deployedUsers.push(User);
        return User;
    }

    function validateUser(address user, uint256 aadhar) {
        aadharToUser[user] = aadhar;
        userToAadhar[aadhar].push(user);
    }

    function checkValidity(address user) public view returns (bool) {
        return aadharToUser[user] > 0;
    }

    function getUserLoans(address currUser) public view returns (address[]) {
        User user = new User(currUser);
        return user.getAllLoans();
    }

    function getUserInvestments(address currUser) public view returns (address[]) {
        User user = new User(currUser);
        return user.getAllInvestments();
    }
}

contract User {
    address[] public loans;
    address[] public investments;

    constructor(address[] _loans, address[] _investments) {
        loans = _loans;
        investments = _investments;
    }

    function addLoan(address loan) public view {
        loans.push(loan);
    }

    function addInvestment(address investment) public view {
        investment.push(investment);
    }

    function getAllLoans() public view returns (address[] memory) {
        return loans;
    }

    function getAllInvestments() public view returns (address[] memory) {
        return investments;
    }
}