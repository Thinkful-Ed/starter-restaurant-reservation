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
    // const [errors, setErrors] = useState([])


    const handleChange = ({ target }) =>{
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
        })
    }


    console.log({...reservationForm})
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
        try{
        //     // const data = await 
        // console.log(reservationForm)
        const newReservation = await createReservations({...reservationForm, people: Number(reservationForm.people)}, ac.signal)
        // console.log("new Reservation: ", newReservation)
        console.log("new Reservation date: ", newReservation.reservation_date)
        setReservationForm(initialFormState)
        
            // console.log("newReservation: ", newReservation)
        //     setReservationForm(newReservation)
        //     // console.log("reservation form: ", reservationForm)
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
            // history.push(`/dashboard?date=${Date()}`)
        }catch(error){
        //     // setResError(error) // state update happens here if error
        //     //re-render so alert box pops up if error not empty
            console.log(error)
        //     setErrors(error)
            
        }
        return () => ac.abort()
    }

    // const submit = async() => {
    //     const response = await createReservations({ message: "some data being sent"})
    //     console.log(response)
    // }


    // console.log(reservationForm.first_name)
    return (
        <>
            <Form 
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                reservationForm = {reservationForm}
                />
                {/* {errors.length > 0 &&  (
                    <div className = "alert alert-danger">
                        <ul>
                            {errors.map((errMesssage)=>(
                                <li key={i}>{errMessage}</li>
                            ))}
                        </ul>
                </div>
                )} */}
        </>
    )
}

export default AddReservation