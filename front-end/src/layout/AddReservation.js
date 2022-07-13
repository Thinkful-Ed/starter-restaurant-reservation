import React, {useState} from "react"
import Form from "./Form"

function AddReservation(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [numPeople, setNumPeople] = useState(1)

    const handleFirstNameChange = (event)=> setFirstName(event.target.value)
    const handleLastNameChange = (event)=> setLastName(event.target.value)
    const handleMobileNumberChange = (event)=> setMobileNumber(event.target.value)

    const handleSubmit = async (event)=>{
        event.preventDefault()
    }

    console.log(firstName)
    console.log(lastName)
    console.log(mobileNumber)
    return (
        <>
            <Form 
            handleSubmit = {handleSubmit}
            handleFirstNameChange = {handleFirstNameChange} 
            handleLastNameChange = {handleLastNameChange}
            handleMobileNumberChange = {handleMobileNumberChange}
            firstName={firstName} 
            lastName={lastName}
            mobileNumber={mobileNumber}/>
        </>
    )
}

export default AddReservation