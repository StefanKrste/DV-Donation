import React, {useEffect, useState, useContext} from 'react'
import Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { TransactionContext } from '../context/TransactionContext'

function ListAciveDonations() {
  const [donationList, setDonationList] = useState([])

  useEffect( () => {
    Axios.get("http://localhost:3001/donation/getActive").then((response) => {
      setDonationList(response.data)
    })
  }, [])

  const navigate = useNavigate()

  const {
    currentAccount,
  } = useContext(TransactionContext);
   
  return (
    <div>
      {donationList.map((val) => {
        return (
          <div key={val.id} onClick={() => {
            {currentAccount && navigate(`/${val.id}`)}
          }}>
            <h2>{val.ime_donacija}</h2>
            {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}/>}
            <p style={{width: '50ch', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
              {val.opis_donacija}
            </p>
          </div>
        ) 
      })}

    </div>
  )
}

export default ListAciveDonations
