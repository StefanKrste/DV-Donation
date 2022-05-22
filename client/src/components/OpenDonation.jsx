import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import {Inputs, List} from ".";

function OpenDonation() {
    const [donation, setDonation] = useState([])

    const {id} = useParams()

    useEffect(() => {
        Axios.get(`http://localhost:3001/donation/getDonation/${id}`).then((response) => {
            setDonation(response.data)
        })
    }, [])

    return (
        <div>

            {donation.map((val) => {
                return (
                    <div className='grid2' key={val.id}>
                        <div className='gallery4'>
                            <h1 className='desc2'>{val.ime_donacija}</h1>
                            {val.slika != null &&
                            <img alt='Embedded Image' src={`data:image;base64,${val.slika}`} height="250px"
                                 width="250px"/>}
                            <p style={{marginTop: '25px'}}>{val.opis_donacija}</p>
                            <p style={{color: 'brown'}}>Donation Addr: {val.adresa}</p>
                            <p>Contact: {val.email}</p>
                            <Inputs currentId={val.id} currentdonationAddress={val.adresa}/>
                        </div>
                        <div className='gallery4'>
                            <List goal={val.goal} currentId={val.id.toString()}/>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default OpenDonation
