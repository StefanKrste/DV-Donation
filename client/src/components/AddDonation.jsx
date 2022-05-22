import React, {useState, useContext} from "react"
import Axios from 'axios'
import {TransactionContext} from "../context/TransactionContext"

const AddDonation = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [goal, setGoal] = useState('')
    const [image, setImage] = useState()
    const [labelText, setLabelText] = useState('')

    const {
        currentAccount,
    } = useContext(TransactionContext);

    const submitFunc = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append("donationName", name)
        data.append("donationDesc", description)
        data.append("email", email)
        data.append("donationGoal", goal)
        data.append("address", currentAccount)
        data.append("image", image)

        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }

        Axios.post('http://localhost:3001/donation/insert', data, config).then((response) => {
            response.data == "Success" ?
                setLabelText("You have successfully added the donation!") :
                setLabelText("Something went wrong. Pleaste try again!")
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setName("")
            setDescription("")
            setEmail("")
            setGoal("")
            event.target.image.value = null
            setImage()
        })
    }

    return (
        <div style={{marginTop: '5%', marginLeft: '35%'}} className='gallery2'>
            <form onSubmit={submitFunc}>
                <div className="desc"><h2>Create your donation</h2></div>

                <div className="donacija">
                    <label>Name of donation</label>
                    <div><input className='forma' type='text' name="name" required
                                value={name} onChange={(e) =>
                        setName(e.target.value)}/>
                    </div>
                </div>

                <div className="donacija">
                    <label>Description of the donation</label>
                    <div>
                        <textarea rows="5" name="description" className='textArea ' cols="56" required
                               value={description} onChange={(e) =>
                            setDescription(e.target.value)}/>
                    </div>
                </div>

                <div className="donacija">
                    <label>E-mail address for contact</label>
                    <div>
                        <input className='forma' type="email" name="email" required
                               value={email} onChange={(e) =>
                            setEmail(e.target.value)}/>
                    </div>
                </div>

                <div className="donacija">
                    <label>Goal in ETH</label>
                    <div>
                        <input className='forma' type="number" name="goal" required
                               value={goal} onChange={(e) =>
                            setGoal(e.target.value)}/>
                    </div>
                </div>

                <div className="donacija">
                    <label>Upload image</label>
                    <input className="form-control forma" style={{margin: '2px'}} type="file" accept="image/*" name="image" required
                           onChange={(e) => {
                               const image = e.target.files[0]
                               setImage(image)
                           }}/>
                </div>

                <button style={{marginTop: '30px'}} className="btn btn-secondary" type="submit">Submit donation</button>
            </form>

            <label style={{color: 'green'}} className='m-3'><b>{labelText}</b></label>
        </div>
    )
}

export default AddDonation
