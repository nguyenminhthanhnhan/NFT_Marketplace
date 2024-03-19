// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TransferFunds {
    uint256 transactionCount;

    event TransferEvent(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferFundsStruck {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferFundsStruck[] transactions;

    function addDataToBlockchain(
        address receiver,
        uint256 amount,
        string memory message
    ) public {
        transactionCount += 1;

        transactions.push(
            TransferFundsStruck(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit TransferEvent(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp
        );
    }

    function transferFunds(
        address receiver,
        uint256 amount,
        string memory message
    ) external {
        transactions[transactionCount] = TransferFundsStruck(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp
        );
        transactionCount++;

        transactions.push(
            TransferFundsStruck(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit TransferEvent(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferFundsStruck[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getTransaction(
        uint256 index
    ) public view returns (TransferFundsStruck memory) {
        return transactions[index];
    }
}
