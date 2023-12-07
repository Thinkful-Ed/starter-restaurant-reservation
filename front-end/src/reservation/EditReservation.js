import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";

function EditReservation() {
    const [reservationError, setReservationError] = useState(null);
    const [reservation, setReservation] = useState({});
    const { reservationId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
    
        // Load tables only once
        setReservationError(null);
        readReservation(reservationId, abortController.signal)
          .then(setReservation)
          .catch(setReservationError);
    
        return () => abortController.abort();
      }, [reservationId]);

      function handleEditSubmit(updatedReservation) {
        updatedReservation = { ...updatedReservation, people: Number(updatedReservation.people) };
        setReservationError(null); // Clear any previous errors
        updateReservation(updatedReservation)
          .then((data) => {
            history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
          })
          .catch((error) => {
            // Handle API request errors here
            console.error("Error creating reservation:", error);
            setReservationError(error); // Set the error state for rendering in UI
          });
      }

      function handleCancel() {
        console.log("EDIT RESERVATION CANCEL")
        history.push("/dashboard");
    }

    return <div>
        <ErrorAlert error={reservationError} />

        {reservation.reservation_id && <ReservationForm
        initialFormState={reservation}
        submitAction={handleEditSubmit}
        handleCancel={handleCancel}
      />}
    </div>
}


export default EditReservation;