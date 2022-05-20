import React, {useEffect, useState, useContext} from 'react'
import Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { TransactionContext } from '../context/TransactionContext'
import Pagination from './Pagination'

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
    <div className='paddinglista' >
          <div className="grid">
      {currentDonation.map((val) => {
        return (
          <div className='grid-item'>
          <div  key={val.id} onClick={() => {
            navigate(`/${val.id}`)
          }}>
            <h2 className='desc'>{val.ime_donacija}</h2>
            {val.slika != null && <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}
            height="250px" width="250px"/>}
            <p className='prazno'></p>
            <p className='desc2'>
              {val.opis_donacija}
            </p>
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

export default ListAciveDonations
