import React, {useContext, useState, useEffect} from "react";

import { TransactionContext } from "../context/TransactionContext";
import { donationAddress } from "../utils/constants";

const ListElement = ({ addressTo,addressFrom, timestamp, message, name, amount, donationId}) => {
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

const List = ( {goal, currentId} ) => {
    const { transactions, getAllTransactions } = useContext(TransactionContext);
    const filterTransactions = transactions.reverse().filter(transaction => transaction.donationId===currentId);
    const Status = (filterTransactions.reduce((total, currentValue) => total + currentValue.amount, 0)).toFixed(4);

    useEffect(() => {
        getAllTransactions();
    }, []);

    return (
        <div>
            <p onClick={getAllTransactions}>Оur goal: {Status}/{goal} ETH</p>
            <p>All transactions</p>
            {filterTransactions.map((transaction, i) => (
                <ListElement key={i} {...transaction} />
            ))}
        </div>
    );
}

export default List;
