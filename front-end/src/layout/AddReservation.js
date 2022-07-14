import React, {useState} from "react"
import { useHistory } from "react-router"
import { createReservations } from "../utils/api"
import Form from "./Form"

function AddReservation(){

    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [reservationForm, setReservationForm] = useState(initialFormState)
    const handleChange = ({ target }) =>{
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
        })
    }


    const handleSubmit = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
        try{
            // I don't understand how to do this part where you save the information upon clicking submit
            // const data = await 
            const newReservation = await createReservations(reservationForm, ac.signal)
            setReservationForm(newReservation)
            history.push(`/dashboard?date=${newReservation.date}`)
        }catch(error){
            // setResError(error) // state update happens here if error
            //re-render so alert box pops up if error not empty
            console.log(error)
        }
        return () => ac.abort()
    }

    


    // console.log(reservationForm.first_name)
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