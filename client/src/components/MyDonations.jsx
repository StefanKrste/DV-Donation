import React from 'react'
import Axios  from 'axios'
import { useState, useContext, useEffect } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'

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

      const deleteDonation = (donationId) => {
        Axios.delete(`http://localhost:3001/donation/delete/${donationId}`)
        setDonationList(donationList.filter((i) => i.id !== donationId))
      }

      const navigate = useNavigate()

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
          <div key={val.id}>
            <div  onClick={() => {
              {currentAccount && navigate(`/${val.id}`)}
            }}>
              <h2>{val.ime_donacija}</h2>
              {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}
              height="250px" width="250px"/>}
              <p style={{width: '50ch', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                {val.opis_donacija}
              </p>
              {<p><b>
                  Status: {val.potvrda_admin == 1 ? "Confirmed" : "Waiting for confirmation"}
                  </b></p>}
            </div>

            <div>      
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

export default MyDonations