import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import ReservationFormPage from "./ReservationFormPage"
import {createReservation} from "../utils/api"
import ErrorAlert from "./ErrorAlert"
import {isDateTuesday, isDateInPast} from "../utils/validateDate"
import InvalidDateErrors from "./InvalidDateErrors"

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
    const [dateErrors, setDateErrors] = useState(null)

    const handleCreateReservationSubmission = (event) => {
        event.preventDefault()
        setReservationsError(null)
        const tuesday = isDateTuesday(formData.reservation_date)
        const past = isDateInPast(formData)
        if(tuesday || past) {
            setDateErrors([tuesday ? tuesday : null, past ? past : null])
            return
        }
        setDateErrors(null)
        createReservation(formData).then(() => history.push(`/dashboard?date=${formData.reservation_date}`)).catch(setReservationsError)        
    }

    return (
        <div>
            <h1>New Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <InvalidDateErrors errors={dateErrors}/>
            <ReservationFormPage 
                onSubmit={handleCreateReservationSubmission}
                onCancel={() => history.goBack()}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    )
}