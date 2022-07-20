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
    const [errors, setErrors] = useState([])



    const handleChange = ({ target }) =>{
        console.log("target: ", target.value)
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
            
        })

        // console.log("today is: ", new Date())
        //pseudocode: try to get the date's day of the week as a number. 
        // if it's a 2 (aka tuesday), give an error
        // same with reserv_time: if target.name === "reservation_time" && target.value less/greater than?
        // give an error saying you cant do that
        
    }

    


    // console.log({...reservationForm})
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
        try{
        const newReservation = await createReservations({...reservationForm, people: Number(reservationForm.people)}, ac.signal)
        setReservationForm(initialFormState)
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
            // history.push(`/dashboard?date=${Date()}`)
        }catch(e){
        //     // setResError(error) // state update happens here if error
        //     //re-render so alert box pops up if error not empty
        setErrors([...errors, e])
        console.log(e)
        //     setErrors(error)
            
        }
        return () => ac.abort()
    }

    // const submit = async() => {
    //     const response = await createReservations({ message: "some data being sent"})
    //     console.log(response)
    // }


    // console.log(reservationForm.first_name)
    function noPastDate(){
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }
    

    return (
        <>
        {errors.length > 0 && (
            <div className = "alert alert-danger">
                <ul>
                {errors.map((error)=>{
                    return <li>{error.message} </li>
                        
                })}
                </ul>
            </div>
        )}
            <Form 
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                reservationForm = {reservationForm}
                noPastDate = {noPastDate}
                
                />
                {/* {errors.length > 0 &&  (
                    <div className = "alert alert-danger">
                        <ul>
                            {errors.map((error)=>(
                                <li>{error.message}</li>
                            ))}
                        </ul>
                </div>
                )} */}
        </>
    )
}

export default AddReservation