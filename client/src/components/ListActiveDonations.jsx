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
    <div className='paddinglista' >
      {donationList.map((val) => {
        return (
          <div className='gallery' key={val.id} onClick={() => {
            {currentAccount && navigate(`/${val.id}`)}
          }}>
            <h2 className='desc'>{val.ime_donacija}</h2>
            {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}
            height="250px" width="250px"/>}
            <p className='prazno'></p>
            <p className='desc2'>
              {val.opis_donacija}
            </p>
          </div>
        ) 
      })}

    </div>
  )
}

export default ListAciveDonations
