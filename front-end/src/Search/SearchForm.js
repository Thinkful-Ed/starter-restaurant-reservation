import React, { useState, useEffect } from "react";
import { findReservations } from "../utils/api";

function SearchForm( {setReservations, setReservationsError} ) {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)

    const initialFormState = {
        mobile_number: ""
    }

    useEffect(()=>{
        setFormData(initialFormState)
    },[])

    function changeHandler(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function submitHandler(event) {
        event.preventDefault()
        try {
            const abortController = new AbortController()
            await findReservations(formData.mobile_number, abortController.signal)
                .then(setReservations)
                .catch(setReservationsError);
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return <div>
        <form onSubmit={submitHandler}>
            <label htmlFor="mobile_number">Mobile Number</label>
            <input type="text" id="mobile_number" name="mobile_number" placeholder="Enter a customer's phone number" value={formData.mobile_number} onChange={changeHandler}/>
            <button type="submit" className="btn btn-primary">Find</button>
        </form>
    </div>
}

export default SearchForm