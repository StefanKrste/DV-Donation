import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import OpenDonation from './OpenDonation'

function ListAllDonations() {
  const [donationList, setDonationList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/donation/getAll").then((response) => {
      setDonationList(response.data)
    })
  }, [])

  const deleteDonation = (donationId) => {
    Axios.delete(`http://localhost:3001/donation/delete/${donationId}`)
    setDonationList(donationList.filter((i) => i.id !== donationId))
  }

  const addDonation = (donationId) => {
    Axios.put("http://localhost:3001/donation/update", {
      donationId: donationId,
    })
    
    window.location.reload()
  }

  return (
    <div>
      {donationList.map((val) => {
        return (
          <div key={val.id}>
            <h2>{val.ime_donacija}</h2>
            {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`} />}
            <p style={{ width: '50ch', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {val.opis_donacija}</p>
            {val.potvrda_admin == 0 && <button
              onClick={() => { addDonation(val.id) }}>Add donation</button>}
            <button onClick={() => { deleteDonation(val.id) }}>Delete donation</button>
          </div>
        )
      })}

    </div>
  )
}

export default ListAllDonations