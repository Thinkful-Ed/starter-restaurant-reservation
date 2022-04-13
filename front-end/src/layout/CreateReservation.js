import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import ReservationFormPage from "./ReservationFormPage"
import {createReservation} from "../utils/api"
import ErrorAlert from "./ErrorAlert"

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
    const [reservationsError, setReservationsError] = useState(null);

    const handleCreateReservationSubmission = (event) => {
        event.preventDefault()
        setReservationsError(null)
        createReservation(formData).then(() => history.push("/dashboard")).catch(setReservationsError)        
    }

    return (
        <div>
            <h1>New Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <ReservationFormPage 
                onSubmit={handleCreateReservationSubmission}
                onCancel={() => history.goBack()}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    )
}