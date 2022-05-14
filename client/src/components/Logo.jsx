import React, { useContext} from 'react';
import {TransactionContext} from "../context/TransactionContext";
import { Link, Outlet } from "react-router-dom";

const Logo = () => {

    const {
        currentAccount,
        connectWallet,
    } = useContext(TransactionContext);

    return (
        <div>
            <img src="../src/eth.png" height={100} width={100}/>
            <Link to="/">Home</Link>
            {currentAccount && <Link to="/myDonations">My donations</Link>}
            {currentAccount && <Link to="/addDonation">Add donation</Link>}
            {!currentAccount ? (<button type="button" 
            onClick={connectWallet}>Connect with MetaMask</button>)
            : (<label>{currentAccount}</label>)}
            <Outlet/>
        </div>

       
    );
}

export default Logo;
