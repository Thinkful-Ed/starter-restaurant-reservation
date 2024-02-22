import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api"; 
import ErrorAlert from "../layout/ErrorAlert"; 

function Dashboard({ date }) {
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setReservationsError(null);

        listReservations({ date }, abortController.signal)
            .then(setReservations)
            .catch(setReservationsError);

        return () => abortController.abort();
    }, [date]); // Re-fetch reservations when the date changes

    return (
        <main>
            <h1>Dashboard</h1>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">Reservations for {date}</h4>
            </div>
            <ErrorAlert error={reservationsError} />
            {reservations.map((reservation, index) => (
                <div key={index} className="reservation-card">
                    <p>First Name: {reservation.first_name}</p>
                    <p>Last Name: {reservation.last_name}</p>
                    <p>Mobile Number: {reservation.mobile_number}</p>
                    <p>Date of Reservation: {reservation.reservation_date}</p>
                    <p>Time of Reservation: {reservation.reservation_time}</p>
                    <p>Number of People: {reservation.people}</p>
                    {/*  more reservation details if needed */}
                </div>
            ))}
        </main>
    );
}

export default Dashboard;
