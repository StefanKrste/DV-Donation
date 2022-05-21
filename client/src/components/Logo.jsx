import React, {useContext} from 'react';
import {TransactionContext} from "../context/TransactionContext";
import {Link, Outlet} from "react-router-dom";
///https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links cards
const Logo = () => {

    const {
        currentAccount,
        connectWallet,
    } = useContext(TransactionContext);

    return (

        <div style={{textAlign: 'center', margin: '1%'}}>
            {<img src="../src/eth.png" height={50} width={50}/>}
            <Link to="/" className='linkNavBar'>Home</Link>
            {currentAccount && <Link to="/myDonations" className='linkNavBar'>My donations</Link>}
            {currentAccount && <Link to="/addDonation" className='linkNavBar'>Add donation</Link>}
            {!currentAccount ? (<button type="button" className="btn btn-secondary"
                                        onClick={connectWallet}>Connect with MetaMask</button>)
                : (<label className='user'>User: {currentAccount}</label>)}
            <hr style={{color: 'white'}}></hr>
            <Outlet/>

        </div>


    );
}

export default Logo;
