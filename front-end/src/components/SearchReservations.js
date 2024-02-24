import React, { useState } from 'react';
import { listReservationsByPhoneNumber } from '../utils/api'; 

function SearchReservations() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [reservations, setReservations] = useState([]);
    const [searchError, setSearchError] = useState(null);

    const handleInputChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSearchError(null);
        try {
            const foundReservations = await listReservationsByPhoneNumber(phoneNumber);
            setReservations(foundReservations);
        } catch (error) {
            console.error(error);
            setSearchError(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="mobile_number"
                    placeholder="Enter a customer's phone number"
                    onChange={handleInputChange}
                    value={phoneNumber}
                />
                <button type="submit">Find</button>
            </form>

            {searchError && <div>Error: {searchError.message}</div>}

            {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                    <div key={index} className="reservation-card">
                        <p>First Name: {reservation.first_name}</p>
                        <p>Last Name: {reservation.last_name}</p>
                        <p>Mobile Number: {reservation.mobile_number}</p>
                        <p>Date of Reservation: {reservation.reservation_date}</p>
                        <p>Time of Reservation: {reservation.reservation_time}</p>
                        <p>Number of People: {reservation.people}</p>
                        <p>Status: {reservation.status}</p>
                    </div>
                ))
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
}

export default SearchReservations;
