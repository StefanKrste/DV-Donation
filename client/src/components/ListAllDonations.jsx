import React, {useEffect, useState, useContext} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import {TransactionContext} from '../context/TransactionContext'
import Pagination from './Pagination'

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
        <div>
            <div className="grid">
                {showDialogWindow && <ConfirmDialog
                    showDialog={showDialogWindow} title={"Delete a donation?"}
                    description={"Are you sure you want to delete this task?"}
                    cancelDialog={cancelDialog}
                    confirmDialog={confirmDialog}/>}
                {currentDonation.map((val) => {
                    return (
                        <div className='grid-item' key={val.id}>
                            <div>
                                <div onClick={() => {
                                    {
                                        currentAccount && navigate(`/${val.id}`)
                                    }
                                }}>
                                    <h2 className='desc'>{val.ime_donacija}</h2>
                                    {val.slika != null &&
                                    <img alt='Embedded Image' src={`data:image;base64,${val.slika}`}
                                         height="250px" width="250px"/>}
                                    <p className='desc2 mt-3'>
                                        {val.opis_donacija}</p>
                                </div>
                                <div>
                                    {val.potvrda_admin == 0 && <button
                                        onClick={() => {
                                            addDonation(val.id)
                                        }} className='button'>Add donation</button>}
                                    <button className='button pt-15' onClick={() => {
                                        setShowDialogWindow(true)
                                        setDeleteDonationId(val.id)
                                    }}>Delete donation
                                    </button>
                                    <p className='prazno'></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination donationsPerPage={donationsPerPage} totalDonations={donationList.length}
                        paginate={paginate}/>
        </div>
    )
}

export default ListAllDonations
