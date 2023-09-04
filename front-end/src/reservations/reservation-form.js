import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function ReservationForm({ loadDashboard, edit }) {
    const history = useHistory();
    const [error, setError] = useState(null);
    const { reservation_id } = useParams();
    const [reservationsError, setReservationsError] = useState(null);

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };

    useEffect(() => {
        if (edit) {
          if (!reservation_id) return null;
    
          loadReservations()
            .then((response) =>
              response.find(
                (reservation) =>
                  reservation.reservation_id === Number(reservation_id)
              )
            )
            .then(fillFields);
        }
    
        function fillFields(foundReservation) {
          if (!foundReservation || foundReservation.status !== "booked") {
            return <p>Only booked reservations can be edited.</p>;
          }
    
          const date = new Date(foundReservation.reservation_date);
          const dateString = `${date.getFullYear()}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    
          setFormData({
            first_name: foundReservation.first_name,
            last_name: foundReservation.last_name,
            mobile_number: foundReservation.mobile_number,
            reservation_date: dateString,
            reservation_time: foundReservation.reservation_time,
            people: foundReservation.people,
          });
        }
    
        async function loadReservations() {
          const abortController = new AbortController();
          return await listReservations(null, abortController.signal).catch(
            setReservationsError
          );
        }
      }, [edit, reservation_id]);


    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
        setFormData ({
            ...formData,
            [target.name]: target.value,
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submit button clicked!")

        const reservationDate = `${formData.reservation_date}T${formData.reservation_time}`
        const validationError = validReservationDate(reservationDate);

        if (validationError) {
            //console.error(error)
            setError(validationError)
        } else {

        const formDataWithNumber = {
            ...formData,
            people: parseInt(formData.people, 10) // Convert to base-10 integer
          };
        //make API call
        try {
            console.log("Submitted:", formDataWithNumber);
            await createReservation(formDataWithNumber);
            setFormData({ ...initialFormState });

            const reservationDate = formData.reservation_date;
            history.push(`/dashboard?date=${reservationDate}`);
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
        }
    }

    //helper function
    function validReservationDate(reservationDate) {
        const currentDate = new Date();
        const selectedDate = new Date(reservationDate);

       
        if (selectedDate.getDay() === 2 ) {
            console.log(selectedDate.getDay())
            return "The restaurant is closed on Tuesdays.";
        } 

        if (selectedDate < currentDate) {
            console.log(selectedDate.getDay())
            return "Reservation must be future date.";
        }

        const reservationHours = selectedDate.getHours();
        const reservationMinutes = selectedDate.getMinutes();
    
        if (
            reservationHours < 10 ||
            (reservationHours === 10 && reservationMinutes < 30)
        ) {
            return "Restaurant is not open until 10:30AM.";
        } else if (
            reservationHours > 22 ||
            (reservationHours === 22 && reservationMinutes >= 30)
        ) {
            return "Restaurant is closed after 10:30PM.";
        } else if (
            reservationHours > 21 ||
            (reservationHours === 21 && reservationMinutes > 30)
        ) {
            return "Reservation must be made at least an hour before closing (10:30PM).";
        }
    
        return;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label id="first_name">First Name:</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    value={formData.first_name}
                    required
                />
                <label>Last Name:</label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                    value={formData.last_name}
                    required
                />
                <label>Mobile Number:</label>
                <input
                    id="mobile_number"
                    name="mobile_number"
                    type="tel"
                    onChange={handleChange}
                    value={formData.mobile_number}
                    required
                />
                <label>Date of Reservation:</label>
                <input
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    onChange={handleChange}
                    value={formData.reservation_date}
                    required
                />
                <label>Time of Reservation:</label>
                <input
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    onChange={handleChange}
                    value={formData.reservation_time}
                    required
                />
                <label>Group Size:</label>
                <input
                    id="people"
                    name="people"
                    type="number"
                    onChange={handleChange}
                    value={formData.people}
                    required
                />
            <button type="submit">Submit</button>
            
            <button type="button" onClick={history.goBack}>Cancel</button>
            </form>
            <ErrorAlert error={error} />
            <ErrorAlert error={reservationsError} />
        </div>
    )
}

export default ReservationForm;