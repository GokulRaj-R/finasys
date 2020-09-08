pragma solidity ^0.5.17;

contract User {
    address[] public loans;
    address[] public investments;

    function getAllLoans() public view returns (address[] memory) {
        return loans;
    }

    function getAllInvestments() public view returns (address[] memory) {
        return investments;
    }
}
