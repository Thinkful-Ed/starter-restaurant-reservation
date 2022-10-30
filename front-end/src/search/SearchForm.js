import React, { useState, useEffect } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import formatPhoneNumber from "../utils/formatPhoneNumber"
import { listReservations } from "../utils/api"
import ReservationsList from "../reservations/ReservationsList"

// Define form for searching existing reservations on search page

export default function SearchForm() {
    const [mobileNumber, setMobileNumber] = useState("")
    const [error, setError] = useState(null)
    const [reservations, setReservations] = useState("")
    const [reservationsDisplay, setReservationsDisplay] = useState("")

    useEffect(() => {
        const abortController = new AbortController()
        setError(null)
        async function listMatchingReservations() {
            try {
                if (reservations.length) {
                    setReservationsDisplay(
                        <ReservationsList reservations={reservations} searchMode={true} />
                    )
                } else if (reservations !== "") {
                    setReservationsDisplay(
                        <div className="alert alert-info">No reservations found</div>
                    )
                }
            } catch (error) {
                setError(error)
            }
        }
        listMatchingReservations()
        return () => abortController.abort()
    }, [reservations])

    function loadReservations() {
        const abortController = new AbortController()
        setError(null)
        listReservations({ mobile_number: mobileNumber }, abortController.signal)
            .then(setReservations)
            .catch(setError)
        return () => abortController.abort()
    }

    const handleChange = (event) => {
        const formattedPhoneNumber = formatPhoneNumber(event.target.value)
        setMobileNumber(formattedPhoneNumber)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loadReservations()
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label className="sr-only" htmlFor="mobile_number">
                        Mobile Number
                    </label>
                    <input
                        name="mobile_number"
                        type="text"
                        id="mobile_number"
                        placeholder="Enter a customer's phone number"
                        className="form-control"
                        aria-label="mobile_number"
                        style={{ maxWidth: 300 }}
                        required={true}
                        value={mobileNumber}
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary mb-3">
                            <span className="oi oi-magnifying-glass mr-2" />
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <ErrorAlert error={error} />
                {reservationsDisplay}
            </div>
        </div>
    )
}