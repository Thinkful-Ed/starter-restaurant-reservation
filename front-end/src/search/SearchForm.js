import React, { useState, useEffect } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import formatPhoneNumber from "../utils/formatPhoneNumber"
import { listReservations } from "../utils/api"
import ReservationCard from "../reservations/ReservationCard"

export default function SearchForm() {
    const [mobileNumber, setMobileNumber] = useState("")
    const [errors, setErrors] = useState(null)
    const [reservations, setReservations] = useState("")
    const [reservationsDisplay, setReservationsDisplay] = useState("")

    useEffect(() => {
        const abortController = new AbortController()
        setErrors(null)
        async function listMatchingReservations() {
            try {
                if (reservations.length) {
                    setReservationsDisplay(
                        reservations.map((reservation, index) => {
                            return (
                                <div key={index}>
                                    <ReservationCard reservation={reservation} />
                                </div>
                            )
                        })
                    )
                } else if (reservations !== "") {
                    setReservationsDisplay(
                        <div className="alert alert-info">No reservations found</div>
                    )
                }
            } catch (error) {
                setErrors(error)
            }
        }
        listMatchingReservations()
        return () => abortController.abort()
    }, [reservations])

    function loadReservations() {
        const abortController = new AbortController()
        setErrors(null)
        listReservations({ mobile_number: mobileNumber }, abortController.signal)
            .then(setReservations)
            .catch(setErrors)
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
            <ErrorAlert error={errors} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        name="mobile_number"
                        type="text"
                        id="mobile_number"
                        placeholder="Enter a customer's phone number"
                        style={{ width: 275 }}
                        required={true}
                        value={mobileNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <div>
                <ErrorAlert error={errors} />
                {reservationsDisplay}
            </div>
        </div>
    )
}