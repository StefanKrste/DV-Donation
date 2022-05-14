import React from 'react'
import Axios  from 'axios'
import { useState, useContext, useEffect } from 'react'
import { TransactionContext } from '../context/TransactionContext'

function MyDonations() {
    const [donationList, setDonationList] = useState([])

    const {
        currentAccount,
      } = useContext(TransactionContext);

    useEffect( () => {
        Axios.get(`http://localhost:3001/donation/getMyDonations/${currentAccount}`).then((response) => {
          setDonationList(response.data)
        })
      }, [])

  return (
    <div>
        {donationList.map((val) => {
        return (
          <div key={val.id}>
            <h2>{val.ime_donacija}</h2>
            {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}/>}
            <p style={{width: '50ch', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
              {val.opis_donacija}
            </p>
            {<p><b>
                Status: {val.potvrda_admin == 1 ? "Confirmed" : "Waiting for confirmation"}
                </b></p>}
          </div>
        ) 
      })}

    </div>
  )
}

export default MyDonations