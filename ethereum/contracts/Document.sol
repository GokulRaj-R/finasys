pragma solidity ^0.4.17;
import "./User.sol";

contract DocumentFactory {
    address[] public deployedDocuments;
    UserFactory userFactory;

    constructor(address userFactoryAddress) public {
        userFactory = UserFactory(userFactoryAddress);
    }

    function createDocument(uint256 val, string description)
        public
        returns (address)
    {
        address owner = msg.sender;
        require(userFactory.checkValidity(owner) == true, "Owner not verified");
        address document = new Document(owner, val, description);
        deployedDocuments.push(document);
        return document;
    }

    function checkDocumentValidity(address documentAddress, address owner)
        public
        view
        returns (bool)
    {
        Document document = Document(documentAddress);
        return document.owner() == owner;
    }

    function getDocumentSummary(address documentAddress)
        public
        view
        returns (
            address,
            address,
            uint256,
            string,
            bool
        )
    {
        Document document = Document(documentAddress);
        return document.getSummary();
    }

    function toggleDocumentLock(address documentAddress) public {
        Document document = Document(documentAddress);
        document.toggleLock();
    }

    function changeDocumentDescription(
        address documentAddress,
        string newDescription
    ) public {
        Document document = Document(documentAddress);
        document.changeDescription(newDescription);
    }

    function changeDocumentValue(address documentAddress, uint256 newValue)
        public
    {
        Document document = Document(documentAddress);
        document.changeValue(newValue);
    }

    function changeDocumentOwner(address documentAddress, address newOwner)
        public
    {
        Document document = Document(documentAddress);
        document.changeOwner(newOwner);
    }
}

contract Document {
    address public deployer;
    address public owner;
    uint256 public value;
    string public description;
    bool public isLocked;

    modifier restricted() {
        require(deployer == msg.sender);
        _;
    }

    constructor(
        address _owner,
        uint256 val,
        string desc
    ) public {
        deployer = msg.sender;
        owner = _owner;
        value = val;
        description = desc;
        isLocked = false;
    }

    function toggleLock() public restricted {
        isLocked = !isLocked;
    }

    function changeOwner(address newOwner) public restricted {
        owner = newOwner;
    }

    function changeDescription(string newDescription) public restricted {
        description = newDescription;
    }

    function changeValue(uint256 newValue) public restricted {
        value = newValue;
    }

    function getSummary()
        public
        view
        returns (
            address,
            address,
            uint256,
            string,
            bool
        )
    {
        return (deployer, owner, value, description, isLocked);
    }
}

