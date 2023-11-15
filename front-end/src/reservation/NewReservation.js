import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";

function NewReservation() {

    const history = useHistory();

    const initialFormState = {
        "first_name": "",
        "last_name": "",
        "mobile_number": "",
        "reservation_date": "",
        "reservation_time": "",
        "people": 1,
      };
    
      function handleNewReservationSubmit(newReservation) {
        newReservation = { ...newReservation, people: Number(newReservation.people) };
        createReservation(newReservation).then((data) => {
          const dateQueryParam = newReservation.reservation_date;
          console.log("RESERVATION DATE:", dateQueryParam)
          history.push(`/dashboard?date=${dateQueryParam}`);
        });
      }

    return (
        <div>
            <h1>create a new reservation</h1>
            <ReservationForm 
                initialFormState = {initialFormState} 
                submitAction = {handleNewReservationSubmit}
                />
        </div>
    )
}

export default NewReservation;