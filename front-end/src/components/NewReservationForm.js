import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReservation } from '../utils/api';
import { today } from "../utils/date-time"; // Make sure to import the 'today' function

// Initial state for a new reservation
const initialReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: "", // Initially empty, will be converted to a number upon submission
    reservation_date: "",
    reservation_time: ""
};

// Utility function to get the day of the week from a date string
function getWeekDay(input) {
    const dateArray = input.split("-");
    const year = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1; // Month is 0-indexed in JavaScript Date
    const day = parseInt(dateArray[2], 10);
    const date = new Date(year, month, day);
    return date.getDay(); // 0 (Sunday) to 6 (Saturday)
}

function NewReservationForm() {
    const history = useHistory();
    const [reservation, setReservation] = useState({ ...initialReservation });
    const [errors, setError] = useState([]); // To store any validation errors

    // Handler for form inputs
    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.value,
        });
    };

    // Time and date validation handler
    const timeHandler = (dateInput, timeInput) => {
        const errors = [];
        const reservationDate = new Date(dateInput);
        const reservationTime = timeInput.split(":").map(Number);
        const reservationDateTime = new Date(reservationDate.getFullYear(), reservationDate.getMonth(), reservationDate.getDate(), reservationTime[0], reservationTime[1]);

        // Validation rules
        if (reservationDate < today()) {
            errors.push({ message: "Reservation date cannot be in the past." });
        }
        if (getWeekDay(dateInput) === 2) { // 2 corresponds to Tuesday
            errors.push({ message: "Restaurant is closed on Tuesdays." });
        }
        if (reservationDateTime.getHours() < 10 || (reservationDateTime.getHours() === 10 && reservationDateTime.getMinutes() < 30)) {
            errors.push({ message: "Reservation cannot be before 10:30 AM." });
        }
        if (reservationDateTime.getHours() > 21 || (reservationDateTime.getHours() === 21 && reservationDateTime.getMinutes() > 30)) {
            errors.push({ message: "Reservation cannot be after 9:30 PM." });
        }

        setError(errors);
        return errors.length === 0;
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = timeHandler(reservation.reservation_date, reservation.reservation_time);
        if (isValid) {
            const abortController = new AbortController();
            createReservation({
                ...reservation,
                people: Number(reservation.people) // Ensure 'people' is sent as a number
            }, abortController.signal)
            .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            })
            .catch((errors) => setError([...errors]));
            return () => abortController.abort();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* Display errors if any */}
        </form>
    );
}

export default NewReservationForm;
