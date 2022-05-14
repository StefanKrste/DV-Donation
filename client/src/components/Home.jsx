import { useContext } from "react";
import React from 'react'
import { TransactionContext } from "../context/TransactionContext";
import ListAciveDonations from "./ListActiveDonations";
import ListAllDonations from "./ListAllDonations";
import { Link, Outlet } from "react-router-dom";


function Home() {
    // const AdminId = 0x59b035bdd806594541650ce9b8798019c127cbb1;

    // const {
    //     currentAccount,
    //   } = useContext(TransactionContext);


  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/myDonations">My donations</Link>
      <Link to="/addDonation">Add donation</Link>
      
      <Outlet/>
      {/* {window.location.href == "http://localhost:3000/" && 
      <>
      {console.log("sara")}
      {AdminId == currentAccount ? <ListAllDonations/> : <ListAciveDonations/>}
      </>
      } */}

     
    </div>
  )
}

export default Home
