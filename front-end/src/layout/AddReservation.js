import React, {useState} from "react"
import Form from "./Form"

function AddReservation(){
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [mobileNumber, setMobileNumber] = useState("")
    // const [date, setDate] = useState("")
    // const [time, setTime] = useState("")
    // const [numPeople, setNumPeople] = useState(1)
    const [reservationForm, setReservationForm] = useState(initialFormState)
    const handleChange = ({ target }) =>{
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
        })
    }

    // const handleFirstNameChange = (event)=> setFirstName(event.target.value)
    // const handleLastNameChange = (event)=> setLastName(event.target.value)
    // const handleMobileNumberChange = (event)=> setMobileNumber(event.target.value)

    const handleSubmit = async (event)=>{
        event.preventDefault()
    }

    // console.log(firstName)
    // console.log(lastName)
    // console.log(mobileNumber)
    console.log(reservationForm.first_name)
    return (
        <>
            <Form 
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                reservationForm = {reservationForm}
/>
        </>
    )
}

export default AddReservation