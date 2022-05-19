import React, {useContext, useState, useEffect} from "react";

import { TransactionContext } from "../context/TransactionContext";
import { donationAddress } from "../utils/constants";
import Pagination from "./Pagination";

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

    const [currentPage, setCurrentPage] = useState(1);
    const donationsPerPage = 10;

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
            <p onClick={getAllTransactions}>Оur goal: {Status}/{goal} ETH</p>
            <p>All transactions</p>
            {transactionList.map((transaction, i) => (
                <ListElement key={i} {...transaction} />
            ))}

        <Pagination donationsPerPage={donationsPerPage} totalDonations={filterTransactions.length}
       paginate={paginate}/>
        </div>
    );
}

export default List;
