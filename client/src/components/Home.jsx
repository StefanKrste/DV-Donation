import {useContext} from "react";
import React from 'react'
import {TransactionContext} from "../context/TransactionContext";
import {ListAciveDonations, ListAllDonations} from ".";

function Home() {
    const AdminId = 0x59b035bdd806594541650ce9b8798019c127cbb1;

    const {
        currentAccount,
    } = useContext(TransactionContext);


    return (
        <div>
            {AdminId == currentAccount ? <ListAllDonations/> : <ListAciveDonations/>}
        </div>
    )
}

export default Home
