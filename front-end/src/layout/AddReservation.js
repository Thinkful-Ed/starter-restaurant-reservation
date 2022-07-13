import React, {useState} from "react"
import Form from "./Form"

function AddReservation(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleFirstNameChange = (event)=> setFirstName(event.target.value)
    const handleLastNameChange = (event)=> setLastName(event.target.value)

    const handleSubmit = async (event)=>{
        event.preventDefault()
    }

    return (
        <>
            <Form />
        </>
    )
}

export default AddReservation