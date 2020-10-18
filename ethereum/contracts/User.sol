pragma solidity ^0.4.17;

contract UserFactory {
    address[] public deployedUsers;
    mapping(address => uint256) aadharToUser;
    mapping(uint256 => address[]) userToAadhar;

    function createUser() public returns (address) {
        address user = new User();
        deployedUsers.push(user);
        return user;
    }

    function validateUser(address user, uint256 aadhar) public {
        aadharToUser[user] = aadhar;
        userToAadhar[aadhar].push(user);
    }

    function checkValidity(address user) public view returns (bool) {
        return aadharToUser[user] > 0;
    }

    function addUserLoan(address currUser, address loan) public {
        User user = User(currUser);
        user.addLoan(loan);
    }

    function addUserInvestment(address currUser, address investment) public {
        User user = User(currUser);
        user.addInvestment(investment);
    }

    function getUserLoans(address currUser) public view returns (address[]) {
        User user = User(currUser);
        return user.getAllLoans();
    }

    function getUserInvestments(address currUser)
        public
        view
        returns (address[])
    {
        User user = User(currUser);
        return user.getAllInvestments();
    }
}

contract User {
    address[] public loans;
    address[] public investments;

    function addLoan(address loan) public {
        loans.push(loan);
    }

    function addInvestment(address investment) public {
        investments.push(investment);
    }

    function getAllLoans() public view returns (address[] memory) {
        return loans;
    }

    function getAllInvestments() public view returns (address[] memory) {
        return investments;
    }
}
