import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../forms/ReservationForm";
import { updateReservation, readReservation } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";

function ReservationEdit() {
    
    const [reservation, setReservation] = useState({});  
    const [reservationErrors, setReservationErrors] = useState([]);
    const { reservation_id } = useParams()
    const history = useHistory();
    useEffect(() => {
        setReservation({});
        const abortController = new AbortController();

        async function loadReservation() {
            try {
              const foundReservation = await readReservation(reservation_id);
              setReservation(foundReservation);
            }
            catch(error){ 
                if (error.name === "AbortError") {
                   console.log("Aborted", reservation_id);
                } 
                else {
                   setReservationErrors([error]);
                }
            }
        }
        loadReservation();
        return () => {
            console.log("cleanup", reservation_id);
            abortController.abort(); // Cancels any pending request or response
          };
    }, [reservation_id]);

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController(); 

        const validationErrors = hasValidDateAndTime(reservation);
        if (Object.keys(validationErrors).length > 0) {
            const errorMessages = Object.values(validationErrors).map(error => error.message || error);
            setReservationErrors(errorMessages);
            abortController.abort();
            return;
        }

        try { 
            const updatedReservation = await updateReservation(reservation, abortController.signal);
            history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
        } 
        catch (error) {
            console.error("Edit reservation form submission error:", error);
            setReservationErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
            abortController.abort();
        }
    };

    if(reservation){
        return (
            <div>
                <h1 className="mb-3">Edit Reservation</h1>
                <ErrorAlert errors={reservationErrors} />
                <ReservationForm reservation={reservation} setReservation={setReservation} submitHandler={submitHandler} />    
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default ReservationEdit;