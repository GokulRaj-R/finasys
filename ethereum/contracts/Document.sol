pragma solidity ^0.4.17;

contract DocumentFactory {
    address[] public deployedDocuments;

    function createDocument(
        address owner,
        uint256 val,
        string description
    ) public returns (address) {
        address document = new Document(address(this), owner, val, description);
        deployedDocuments.push(document);
        return document;
    }

    function getDocumentSummary(address documentAddress)
        public
        view
        returns (
            address,
            address,
            uint256,
            string
        )
    {
        Document document = Document(documentAddress);
        return document.getSummary();
    }

    function toggleDocumentLock(address documentAddress) {
        Document document = Document(documentAddress);
        document.toggleLock();
    }

    function changeDocumentDescription(
        address documentAddress,
        string newDescription
    ) {
        Document document = Document(documentAddress);
        document.changeDescription(newDescription);
    }

    function changeDocumentValue(address documentAddress, uint256 newValue) {
        Document document = Document(documentAddress);
        document.changeValue(newValue);
    }

    function changeDocumentOwner(address documentAddress, address newOwner) {
        Document document = Document(documentAddress);
        document.changeOwner(newOwner);
    }
}

contract Document {
    address deployer;
    address owner;
    uint256 value;
    string description;
    bool isLocked;

    modifier restricted() {
        require(deployer == msg.sender);
        _;
    }

    function Document(
        address _deployer,
        address _owner,
        uint256 val,
        string desc
    ) public {
        deployer = _deployer;
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
            string
        )
    {
        return (deployer, owner, value, description);
    }
}
