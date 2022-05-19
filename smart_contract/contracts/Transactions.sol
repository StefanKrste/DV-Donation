// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message,
     uint256 timestamp, string name, string donationId);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string name;
        string donationId;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message,
     string memory name, string memory donationId) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, name, donationId));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, name, donationId);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
