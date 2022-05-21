import React, {useContext, useState, useEffect} from "react";

import {TransactionContext} from "../context/TransactionContext";
import Pagination from "./Pagination";

const ListElement = ({addressTo, addressFrom, timestamp, message, name, amount, donationId}) => {
    return (
        <div>
            <hr></hr>
            <p className="text" style={{fontSize: '20px'}}><b>{name}</b></p>
            <p className="text2" style={{color: '#208B44'}}><b>{amount} ETH</b></p>
            <p className="text2">{message}</p>
            {/* <p className="text">Address: {addressFrom}</p> */}
            <p>{timestamp}</p>
        </div>
    );
};

const List = ({goal, currentId}) => {
    const {transactions, getAllTransactions} = useContext(TransactionContext);
    const filterTransactions = transactions.reverse().filter(transaction => transaction.donationId === currentId);
    const Status = (filterTransactions.reduce((total, currentValue) => total + currentValue.amount, 0)).toFixed(4);

    useEffect(() => {
        getAllTransactions();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 3;

    const indexOfLastDonation = currentPage * donationsPerPage;
    const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
    const transactionList = filterTransactions.slice(indexOfFirstDonation, indexOfLastDonation);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scroll({
            top: 0,
            left: 1000,
            behavior: "instant",
        });
    };

    return (
        <div>
            <h2 className="fw-lighter" onClick={getAllTransactions}>Оur goal: {Status}/{goal} ETH</h2>
            <h3 className="fw-lighter">All transactions</h3>

            {transactionList.map((transaction, i) => (
                <ListElement key={i} {...transaction} />
            ))}

            <div style={{float: 'right', marginRight: '15px'}}>
                <Pagination donationsPerPage={donationsPerPage} totalDonations={filterTransactions.length}
                            paginate={paginate}/>
            </div>
        </div>
    );
}

export default List;
