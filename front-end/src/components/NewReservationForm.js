import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { createReservation } from '../utils/api';
import { today } from "../utils/date-time"; // Ensure this utility function is correctly imported
 
 
 
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
    const [formData, setFormData] = useState({ ...initialReservation }); // Using formData for form state management
    const [errors, setError] = useState([]); // To store any validation errors
 
    // Handler for form inputs
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
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
        const isValid = timeHandler(formData.reservation_date, formData.reservation_time);
        if (isValid) {
            const abortController = new AbortController();
            createReservation({
                ...formData,
                people: Number(formData.people) // Ensure 'people' is sent as a number
            }, abortController.signal)
            .then(() => {
                history.push(`/dashboard?date=${formData.reservation_date}`);
            })
            .catch((errors) => setError([...errors]));
            return () => abortController.abort();
        }
    };
 
    // Handler for the Cancel button
    const handleCancel = () => {
        history.goBack(); // Use history.goBack() to return to the previous page
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name:</label>
                <input
                    className="form-control"
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
 
            <div className="form-group">
                <label htmlFor="last_name">Last Name:</label>
                <input
                    className="form-control"
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
 
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number:</label>
                <input
                    className="form-control"
                    id="mobile_number"
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    required
                />
            </div>
 
            <div className="form-group">
                <label htmlFor="reservation_date">Date of Reservation:</label>
                <input
                    className="form-control"
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    value={formData.reservation_date}
                    onChange={handleChange}
                    required
                />
            </div>
 
            <div className="form-group">
                <label htmlFor="reservation_time">Time of Reservation:</label>
                <input
                    className="form-control"
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    value={formData.reservation_time}
                    onChange={handleChange}
                    required
                />
            </div>
 
            <div className="form-group">
                <label htmlFor="people">Number of People:</label>
                <input
                    className="form-control"
                    id="people"
                    type="number"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    min="1"
                    required
                />
            </div>
 
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>            
                </div>
 
            {/* Displaying errors */}
            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
 
}
 
export default NewReservationForm;