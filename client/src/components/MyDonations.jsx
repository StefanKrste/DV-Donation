import React from 'react'
import Axios  from 'axios'
import { useState, useContext, useEffect } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import Pagination from './Pagination'

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

      const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 12;

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonation = donationList.slice(indexOfFirstDonation, indexOfLastDonation);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll({
      top: 0, 
      left: 1000,
      behavior: "instant",
     });
  };

  return (
    <div className="paddinglista">
    <div className="grid">
     
       {showDialogWindow && <ConfirmDialog 
      showDialog={showDialogWindow} title={"Delete a donation?"}
      description={"Are you sure you want to delete this task?"}
      cancelDialog={cancelDialog}
      confirmDialog={confirmDialog}/>}
        {currentDonation.map((val) => {
        return (
          
           <div className='grid-item'>
          <div    key={val.id}  >
            <div   onClick={() => {
              {currentAccount && navigate(`/${val.id}`)}
            }}>
              <h2 className='desc' >{val.ime_donacija}</h2>
              {val.slika != null && <img className='img' alt='Embedded Image' src={`data:image;base64,${val.slika}`}
              height="250px" width="250px"/>}
             <p className='prazno'></p>
              <p className='desc' >
                {val.opis_donacija}
              </p>
              {<p><b className='status'>
                  Status: {val.potvrda_admin == 1 ? "Confirmed" : "Waiting for confirmation"}
                  </b></p>}
             

            </div>
            <button  className='button' onClick={() => {
                 setShowDialogWindow(true) 
                 setDeleteDonationId(val.id)
              }}>Delete donation</button>
                           <p className='prazno'></p>

            </div>
           
            </div>
        
          
        ) 
      })}
      

    <Pagination donationsPerPage={donationsPerPage} totalDonations={donationList.length}
       paginate={paginate}/>

    </div>
    </div>
  )
}

export default MyDonations
