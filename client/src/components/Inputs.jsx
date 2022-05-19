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
            let text = "Please install MetaMask!";
            if (confirm(text)) {
                window.open("https://metamask.io/download/");
            }
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
            <form onSubmit={handleSubmit}>
                <input placeholder="Amount of (ETH)" step="0.0001" name="amount" type="number" onChange={handleInputChange} required min="0.0001"/>
                <label name="amountUSD">${AmountUSD} USD</label>
                <input placeholder="Name or nickname" name="name" type="text" onChange={handleInputChange} required/>
                <input placeholder="Message of donation" name="message" type="text" onChange={handleInputChange} required/>
                {isLoading ? <label>Transaction is in process</label> : (
                    <button type="submit" >Send now</button>)}
            </form>
        </div>
    );
}

export default Inputs;
