import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import { TransactionContext } from '../context/TransactionContext'

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

  const navigate = useNavigate()

  const {
    currentAccount,
  } = useContext(TransactionContext);

  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [deleteDonationId, setDeleteDonationId] = useState(0)

  const cancelDialog = () => {
    setShowDialogWindow(false)
    setDeleteDonationId(0)
  }

  const confirmDialog = () => {
    deleteDonation(deleteDonationId)
    setDeleteDonationId(0)
    setShowDialogWindow(false)
  }

  return (
    <div>
      {showDialogWindow && <ConfirmDialog 
      showDialog={showDialogWindow} title={"Delete a donation?"}
      description={"Are you sure you want to delete this task?"}
      cancelDialog={cancelDialog}
      confirmDialog={confirmDialog}/>}
      {donationList.map((val) => {
        return (
          <div key={val.id} >
            <div onClick={() => {
              {currentAccount && navigate(`/${val.id}`)}
            }}>
              <h2>{val.ime_donacija}</h2>
              {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`} />}
              <p style={{ width: '50ch', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {val.opis_donacija}</p>
              </div>

              <div>
              {val.potvrda_admin == 0 && <button
                onClick={() => { addDonation(val.id) }}>Add donation</button>}
              <button onClick={() => { 
              setShowDialogWindow(true) 
              setDeleteDonationId(val.id)
              }}>Delete donation</button>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default ListAllDonations