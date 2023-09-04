import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationRow from "../reservations/ReservationRow";
import ErrorAlert from "../layout/ErrorAlert";

export default function SearchReservation() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    function handleChange({target}) {
        setMobileNumber(target.value)
    }
    const handleFind = async (event) => {
        event.preventDefault();

        if (!mobileNumber) {
            setError("Please enter a mobile number.");
            return;
        }
        const abortController = new AbortController();

        try {
            const response = await listReservations({ mobile_number: mobileNumber}, abortController.signal);
            setReservations(response);
            setError(null);
            setSearched(true);
        } catch (error) {
            console.error("There was an error:", error);
            setError("An error occurred while fetching reservations");
            setSearched(false);
        }
        return () => abortController.abort();
    }

    const searchResults = () => {
        if (searched) {
            if (reservations.length === 0) {
                return <h4>No reservations found</h4>
            } else {
                return reservations.map((reservation) => (
                    <ReservationRow
                    key={reservation.reservation_id}
                    reservation={reservation}
                    />
                ))
            }
        }
        return null;

    }

    return (
        <div>
            <h2>Find Your Reservation</h2>
            <form onSubmit={handleFind}>
                <label>Mobile Number:</label>
                <input
                    name="mobile_number"
                    id="mobile_number"
                    type="tel"
                    placeholder="Enter a customer's phone number"
                    onChange={handleChange}
                    value={mobileNumber}
                />
                <button type="submit">Find</button>
                <ErrorAlert error={error} />
            </form>
            {searchResults()}
        </div>
    );
}