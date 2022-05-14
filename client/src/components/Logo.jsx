import React, { useContext} from 'react';
import {TransactionContext} from "../context/TransactionContext";

const Logo = ( {clickAddDonation} ) => {

    const {
        currentAccount,
        connectWallet,
    } = useContext(TransactionContext);

    return (
        <div>
        <img src="../src/eth.png" height={100} width={100}/>
        {!currentAccount ? (<button type="button" 
            onClick={connectWallet}>
                Connect with MetaMask</button>)
            : (<label>{currentAccount}</label>)}
        </div>
    );
}

export default Logo;
