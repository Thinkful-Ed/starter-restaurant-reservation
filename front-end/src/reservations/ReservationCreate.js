import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import { formatAsDate } from "../utils/date-time";
// import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";
import  ReservationsForm   from "../forms/ResrevationsForm"
function ReservationCreate() {

    // const history = useHistory();
    const [reservationErrors, setReservationErrors] = useState([]);
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    });  



return (
    <main>
        <h1 className="mb-3">Create Reservation</h1>
        <ErrorAlert errors={reservationErrors} />
        <div><ReservationsForm  reservation={reservation} setReservation={setReservation} errors={reservationErrors} setReservationErrors={setReservationErrors}/></div> 
    </main>
  );

}

export default ReservationCreate;