import React from 'react';
import Form from "./Form"
function NewReservation({setDate}){
    return <>
    <h1>This is new Reservation</h1>
    <Form setDate={setDate} />
    </>
}

export default NewReservation;