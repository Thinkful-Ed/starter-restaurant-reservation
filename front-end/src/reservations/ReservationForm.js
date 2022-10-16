import React, { useState } from "react"
import { useHistory }  from "react-router-dom"
import axios from "axios"
import formatPhoneNumber from "../utils/formatPhoneNumber"
import ErrorAlert from "../layout/ErrorAlert"

export default function ReservationForm() {
    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState(null)

    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.name !== "people") {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            })
        } else {
            setFormData({
                ...formData,
                people: parseInt(event.target.value),
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post(process.env.REACT_APP_API_BASE_URL + '/reservations', 
                { data: formData })
            history.push(`/dashboard?date=${formData.reservation_date}`)
        }
        catch (error) {
            setErrors(error.response.data.error)
        }
    }

    return (
        <div>
            <ErrorAlert error={errors} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        name="first_name"
                        type="text"
                        id="first_name"
                        placeholder="First Name"
                        required={true}
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        name="last_name"
                        type="text"
                        id="last_name"
                        placeholder="Last Name"
                        required={true}
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        name="mobile_number"
                        type="tel"
                        id="mobile_number"
                        placeholder="XXX-XXX-XXXX"
                        required={true}
                        minLength="12"
                        value={formData.mobile_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmFor="reservation_date">Date of Reservation:</label>
                    <input
                        name="reservation_date"
                        type="date"
                        id="reservation_date"
                        placeholder="YYYY-MM-DD"
                        required={true}
                        value={formData.reservation_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="reservation_time">Time of Reservation:</label>
                    <input
                        name="reservation_time"
                        type="time"
                        id="reservation_time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        required={true}
                        value={formData.reservation_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmFor="people">Number of People:</label>
                    <input
                        name="people"
                        type="number"
                        id="people"
                        min="1"
                        required={true}
                        value={formData.people}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => history.goBack()}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}
