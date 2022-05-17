import React, {useState, useContext} from "react"
import Axios from 'axios'
import { TransactionContext } from "../context/TransactionContext"

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
            event.target.image.value=null
            setImage()
        })
        }

  return (
      <div>
        <form onSubmit={submitFunc}>
            <div>
                <label>Name of donation</label>
                <input type='text' name="name" required
                value={name} onChange={(e) => 
                setName(e.target.value)}/>
            </div>

            <div>
                <label>Description of the donation</label>
                <input type='text' name="description" required
                value={description} onChange={(e) => 
                    setDescription(e.target.value)}/>
            </div>

            <div>
                <label>E-mail address for contact</label>
                <input type="email" name="email"required
                value={email} onChange={(e) => 
                    setEmail(e.target.value)}/>
            </div>

            <div>
                <label>Goal in ETH</label>
                <input type="number" name="goal" required
                value={goal} onChange={(e) => 
                    setGoal(e.target.value)}/>
            </div>

            <div>
                <label>Upload image</label>
                <input type="file" accept="image/*" name="image" required
                onChange={(e) => {
                    const image = e.target.files[0]
                    setImage(image)
                    }}/>
            </div>

            <input type="submit" value="Submit donation"/>
        </form>

        <label>{labelText}</label>
      </div>
    
  )
}

export default AddDonation