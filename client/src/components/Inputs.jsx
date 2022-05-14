import React, {useContext, useState} from "react";
import {TransactionContext} from "../context/TransactionContext";

import { ETHprice } from "../utils/constants";

const Inputs = () => {
    const [inputData, setinputData] = useState({ amount: "", name: "", message: "" });
    const [AmountUSD, setAmountUSD] = useState(0);

    const {
        currentAccount,
        sendTransaction,
        isLoading
    } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const {amount, name, message} = inputData;
        e.preventDefault();
        console.log(currentAccount)
        if(!currentAccount){
            alert("Please connect to MetaMask");
            return;
        }
        if (!amount || !name || !message){
            alert("Please fill in all the inputs");
            return;
        }else if (amount<=0){
            alert("Amount of ETH need to be positiv number");
            return;
        }
        sendTransaction(inputData);
    };

    const handleInputChange = (e) => {
        const InputValue=+e.target.value;
        const name=e.target.name;
        setinputData((prevState) => ({ ...prevState, [name]: e.target.value }));
        if (name === "amount" && InputValue) {
            setAmountUSD((InputValue*ETHprice).toFixed(2));
        }else if (name === "amount"){
            setAmountUSD(0);
        }
    }

    return (
        <div>
            <input placeholder="Amount of (ETH)" step="0.0001" name="amount" type="number" onChange={handleInputChange}/>
            <label name="amountUSD">${AmountUSD} USD</label>
            <input placeholder="Name or nickname" name="name" type="text" onChange={handleInputChange}/>
            <input placeholder="Message of donation" name="message" type="text" onChange={handleInputChange}/>
            {isLoading ? <label>Transaction is in process</label> : (
                <button type="button" onClick={handleSubmit}>Send now</button>)}
        </div>
    );
}

export default Inputs;
