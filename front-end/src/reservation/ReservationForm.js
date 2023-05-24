import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({initialFormState, apiHandler}) {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    //sets form data to initial state passed in so it can be used for edit and new
    useEffect(()=>{
        setFormData(initialFormState)
    },[initialFormState])

    //updates form STATE when values are changed
    function changeHandler(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    //calls API to submit the reservation to our server
    async function submitHandler(event) {
        event.preventDefault()
        try {
            formData.people = Number(formData.people)
            await apiHandler(formData)
            history.push(`/dashboard/?date=${formData.reservation_date}`)
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    console.log(formData)
    return <div>
        <form onSubmit={submitHandler}>
            <div>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            </div>
            <div>
                <label htmlFor="first_name">
                    First Name
                </label>
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="last_name">
                    Last Name
                </label>
                <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="mobile_number">
                    Mobile Number
                </label>
                <input type="text" id="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="reservation_date">
                    Reservation Date
                </label>
                <input type="date" id="reservation_date" name="reservation_date" value={formData.reservation_date} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="reservation_time">
                    Reservation Time
                </label>
                <input type="time" id="reservation_time" name="reservation_time" value={formData.reservation_time} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="people">
                    Party Size
                </label>
                <input type="number" id="people" name="people" value={formData.people} onChange={changeHandler}/>
            </div>
            <div>
                <button type="button" onClick={()=> history.goBack()} className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
}

export default ReservationForm