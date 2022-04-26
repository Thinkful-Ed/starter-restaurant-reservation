import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import ErrorAlert from "./ErrorAlert"
const moment = require("moment")
const { createReservation } = require("../utils/api")

export default function NewReservation() {

    const history = useHistory()

    const [inputValid, setInputValid] = useState({
        first_name: false,
        last_name: false,
        mobile_number: false,
        reservation_date: false,
        reservation_time: false,
        people: false,
    })

    const initialFormData = {
        first_name: "Reggie",
        last_name: "Farnquist",
        mobile_number: "517-555-5555",
        reservation_date: "2022-03-28",
        reservation_time: "12:00",
        people: 4,
    }

    const [formData, setFormData] = useState({ ...initialFormData })
    const [error, setError] = useState(null)

    const handleChange = ({ target }) => {
        /**
         * add logic/switch to handle validation based on target
         */
        //console.log("target ID", target.id)
        /* switch (target.id) {
            case "first_name":
                if (target.first_name === "") {
                    setInputValid(() => inputValid.first_name = false)
                }
            case "last_name":
                if (target.last_name === "") {
                    setInputValid(inputValid.last_name = false)
                }
        } */

        //setInputValid({ ...inputValid, [target.name]: !target.value })
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
        /* switch (event.target.id) {
            case "first_name":
                if (event.target.first_name === "") {
                    setInputValid(inputValid.first_name = false)
                }
            case "last_name":
                if (event.target.last_name === "") {
                    setInputValid(inputValid.last_name = false)
                }
        } */
        const abortController = new AbortController()
        const newReservation = { ...formData }
        const response = await createReservation(newReservation, abortController.signal)
        if (response.message) {
            setError(response)
            return
        }
        history.push(`/dashboard/?date=${formData.reservation_date}`)
    }

    function handleCancel() {
        history.go(-1)
    }

    return (
        <form className="new-res-form needs-validation" onSubmit={handleSubmit}>
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
                { inputValid.first_name ? <div className="text-danger">First name is required.</div> : null }
            </div>
            <div className="form-group">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                    id="last_name"
                    className="form-control"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                />
                { inputValid.last_name ? <div className="text-danger">Last name is required.</div> : null }
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
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
                <label htmlFor="reservation_date" className="form-label">Date</label>
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
               <label htmlFor="reservation_time" className="form-label">Time</label>
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
                <label htmlFor="people" className="form-label">Party Size</label>
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
            <label htmlFor="submit" className="form-label">
                <button
                    type="submit"
                    id="submit"
                    name="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </label>
            <label htmlFor="reset" className="form-label">
                <button
                    type="reset"
                    id="reset"
                    name="reset"
                    onClick={handleReset}
                    className="btn btn-primary"
                >
                    Reset
                </button>
            </label>
            <label htmlFor="cancel" className="form-label">
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

/**
 * a way to keep track of sessions (manually or express.sessions) req.session property
 * (req.session.user)
 * 
 * bcrypt library (will encode passwords)
 * 
 */