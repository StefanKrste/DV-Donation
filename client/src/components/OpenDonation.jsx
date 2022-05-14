import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios'
import Inputs from './Inputs'
import List from './List'


function OpenDonation() {
  const [donation, setDonation] = useState([])

  const {id} = useParams()

  useEffect( () => {
    Axios.get(`http://localhost:3001/donation/getDonation/${id}`).then((response) => {
      setDonation(response.data)
      
    })
  }, [])

  return (
    <div>
      {donation.map((val) => {
        return(
          <div key={val.id}>
          <h1>{val.ime_donacija}</h1>
          {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`} />}
          <p>{val.opis_donacija}</p>
          <p>{val.email}</p>

          <Inputs/>
          <List goal={val.goal}/>

          </div>
        )
      })}
      

    </div>
  )
}

export default OpenDonation