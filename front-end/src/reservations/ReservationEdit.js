import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReservations from '../hooks/useReservations';
import useSubmitHandler from '../hooks/useSubmitHandler';
import ReservationForm from '../forms/ReservationForm';
import ErrorAlert from '../layout/ErrorAlert';
import { updateReservation } from "../utils/api";
import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";

function ReservationEdit() {
    const { reservationId } = useParams();
    const { reservations, isLoadingReservations, reservationsError } = useReservations({ reservationId });
    const [reservation, setReservation] = useState({});

    useEffect(() => {
        if (reservations.length > 0) {
            setReservation(reservations[0]); // Initialize form state with the fetched reservation
        }
    }, [reservations]);

    const onSuccess = () => `/dashboard?date=${reservation.reservation_date}`;
    const { submitHandler, errors: submitErrors } = useSubmitHandler(updateReservation, hasValidDateAndTime, onSuccess);

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={[...reservationsError, ...submitErrors]} />
            {!isLoadingReservations && reservation && (
                <ReservationForm reservation={reservation} setReservation={setReservation} submitHandler={submitHandler} />
            )}
            {isLoadingReservations && <p>Loading...</p>}
        </div>
    );
}

export default ReservationEdit;
