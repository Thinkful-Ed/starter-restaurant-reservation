import React from "react";
import ReservationForm from "./ReservationForm";

function NewReservation() {

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
      };
    
      function handleNewReservationSubmit(newReservation) {
      //  createDeck(newDeck).then((data) => history.push(`/decks/${data.id}`));
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