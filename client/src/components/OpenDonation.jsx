import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios'
import {Inputs,List} from ".";

function OpenDonation() {
  const [donation, setDonation] = useState([])

  const {id} = useParams()

  useEffect( () => {
    Axios.get(`http://localhost:3001/donation/getDonation/${id}`).then((response) => {
      setDonation(response.data)
    })
  }, [])

  return (
    <div >
   
      {donation.map((val) => {
        return(
          <div className='grid2'>
          <div className='gallery4' key={val.id}>
          <h1 className='desc2'>{val.ime_donacija}</h1>
         
          {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`} height="250px" width="250px" />}
          <p className='prazno'></p>
          <p >{val.opis_donacija}</p>
          <p>{val.email}</p>
        
          <Inputs currentId={val.id}/>
          </div>
          
          <div  className='gallery4'>
          <List goal={val.goal} currentId={val.id.toString()}/>
          </div>
          </div>
        
        )
      })}
    

    </div>
  )
}

export default OpenDonation
