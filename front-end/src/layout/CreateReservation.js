import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import ReservationFormPage from "./ReservationFormPage"

export default function CreateReservation() {
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
    }

    const history = useHistory()

    const [formData, setFormData] = useState({...initialFormState})

    const handleCreateReservationSubmission = (event) => {
        event.preventDefault()
        //call create api with formdata, then navigate to dashboard page
        history.push("/dashboard")
    }
    return (
        <div>
            <h1>New Reservation</h1>
            <ReservationFormPage 
                onSubmit={handleCreateReservationSubmission}
                onCancel={() => history.goBack()}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    )
}