import React, {useContext, useState, useEffect} from "react";
import {TransactionContext} from "../context/TransactionContext";
import axios from "axios";
import { ETHprice } from "../utils/constants";

const Inputs = ( {currentId} ) => {
    const [inputData, setinputData] = useState({ amount: "", name: "", message: "", donationId: "" });
    const [AmountUSD, setAmountUSD] = useState(0);
    const [USDvalue, setUSDvalue] = useState([]);
    const CriptoAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    const {
        currentAccount,
        sendTransaction,
        isLoading
    } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        inputData.donationId = currentId.toString(); 
        const {amount, name, message, donationId} = inputData;
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
            setAmountUSD((InputValue*USDvalue).toFixed(2));
        }else if (name === "amount"){
            setAmountUSD(0);
        }
    }

    useEffect(() => {
        axios
            .get(
                CriptoAPI
            )
            .then(res => {
                setUSDvalue(res.data[0].current_price);
            })
            .catch(error => console.log(error));
    }, );

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
