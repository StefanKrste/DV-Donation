import React from 'react'
import { TransactionContext } from "../context/TransactionContext";
import ListAciveDonations from "./ListActiveDonations";
import ListAllDonations from "./ListAllDonations";
import { useContext } from "react";
import Home from './Home';

function OpenDonation({ donation }) {

  const AdminId = 0x59b035bdd806594541650ce9b8798019c127cbb1;

    const {
        currentAccount,
      } = useContext(TransactionContext);
  return (
    <div>
      <Home/>
        {window.location.href == "http://localhost:3000/" && 
      <>
      {AdminId == currentAccount ? <ListAllDonations/> : <ListAciveDonations/>}
      </>
      }

    </div>
  )
}

export default OpenDonation