import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import ErrorAlert from "./ErrorAlert"
const { listReservations, createReservation } = require("../utils/api")

export default function NewReservation() {

    const history = useHistory()

    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({ ...initialFormData })
    const [error, setError] = useState(null)

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const handleReset = () => {
        setFormData({ ...initialFormData })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        const newReservation = { ...formData }
        const response = await createReservation(newReservation, abortController.signal)
        console.log(response)
        if (response.message) {
            setError(response)
            return
        }
        history.push("/")
    }

    function handleCancel() {
        history.go(-1)
    }

    return (
        <form className="new-res-form" onSubmit={handleSubmit}>
            <h1>New Reservation</h1>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                    id="first_name"
                    className="form-control"
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={formData.first_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    id="last_name"
                    className="form-control"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input 
                    id="mobile_number"
                    className="form-control"
                    type="text"
                    name="mobile_number"
                    onChange={handleChange}
                    value={formData.mobile_number}
                />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">Date</label>
                <input 
                    id="reservation_date"
                    className="form-control"
                    type="date"
                    name="reservation_date"
                    onChange={handleChange}
                    value={formData.reservation_date}
                />
            </div>
            <div className="form-group">
               <label htmlFor="reservation_time">Time</label>
               <input
                    id="reservation_time"
                    className="form-control"
                    type="time"
                    name="reservation_time"
                    onChange={handleChange}
                    value={formData.reservation_time}
                />
            </div>
            <div className="form-group">
                <label htmlFor="people">Party Size</label>
                <input 
                    id="people"
                    className="form-control"
                    type="number"
                    name="people"
                    onChange={handleChange}
                    value={formData.people}
                />
            </div>
            <ErrorAlert error={error} />
            <label htmlFor="submit">
                <input 
                    type="submit"
                    id="submit"
                    name="submit"
                    className="btn btn-primary"
                />
            </label>
            <label htmlFor="reset">
                <input 
                    type="reset"
                    id="reset"
                    name="reset"
                    onClick={handleReset}
                    className="btn btn-primary"
                />
            </label>
            <label htmlFor="cancel">
                <button
                    type="button"
                    id="cancel"
                    name="cancel"
                    onClick={handleCancel}
                    className="btn btn-primary"
                >
                    Cancel
                </button>
            </label>
        </form>
    )

}