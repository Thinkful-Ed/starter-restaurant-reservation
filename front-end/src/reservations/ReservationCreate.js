import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";

import  ReservationsForm   from "../forms/NewResrevationForm"

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
// console.log("ReservationCreate - reservationErrors: ",reservationErrors);


return (
    <main>
        <h1 className="mb-3">Create Reservation</h1>
        <ErrorAlert errors={reservationErrors} />

        <div><ReservationsForm  reservation={reservation} setReservation={setReservation} setReservationErrors={setReservationErrors} /></div> 

    </main>
  );

}

export default ReservationCreate;