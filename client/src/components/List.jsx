import React, {useContext, useState, useEffect} from "react";

import { TransactionContext } from "../context/TransactionContext";
import { donationAddress, Goal } from "../utils/constants";

const ListElement = ({ addressTo,addressFrom, timestamp, message, name, amount}) => {
    return (
        <div>
            <hr></hr>
            <p>From: {name}</p>
            <p>From address: {addressFrom}</p>
            <p>Amount: {amount} ETH</p>
            <p>Message: {message}</p>
            <p>{timestamp}</p>
        </div>
    );
};

const List = () => {
    const { transactions, getAllTransactions } = useContext(TransactionContext);
    const filterTransactions = transactions.reverse().filter(transaction => transaction.addressTo===donationAddress);
    const Status = (filterTransactions.reduce((total, currentValue) => total + currentValue.amount, 0)).toFixed(4);

    useEffect(() => {
        getAllTransactions();
    }, []);

    return (
        <div>
            <p onClick={getAllTransactions}>Оur goal: {Status}/{Goal} ETH</p>
            <p>All transactions</p>
            {filterTransactions.map((transaction, i) => (
                <ListElement key={i} {...transaction} />
            ))}
        </div>
    );
}

export default List;
