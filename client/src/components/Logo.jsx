import React, { useContext} from 'react';
import {TransactionContext} from "../context/TransactionContext";
import { Link, Outlet } from "react-router-dom";
///https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links cards
const Logo = () => {

    const {
        currentAccount,
        connectWallet,
    } = useContext(TransactionContext);

    return (
        
        <div style={{textAlign:'center'}}>
            <img src="../src/eth.png" height={100} width={100} />
            <Link to="/"  className='linkNavBar'>Home</Link>
            {currentAccount && <Link to="/myDonations" className='linkNavBar' >My donations</Link>}
            {currentAccount && <Link to="/addDonation" className='linkNavBar'>Add donation</Link>}
            {!currentAccount ? (<button type="button" 
            onClick={connectWallet} className='button-85'>Connect with MetaMask</button>)
            : (<label  style={{ color:'#b895fd'}}  >User:    {currentAccount}</label>)}
            <Outlet/>
        </div>
       
       
    );
}

export default Logo;
