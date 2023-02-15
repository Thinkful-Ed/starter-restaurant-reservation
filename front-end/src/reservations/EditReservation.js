import { useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import { useEffect } from "react";
import NewReservation from "./NewReservation";





export default function EditReservation(){
    const {reservation_id} = useParams();
    const [currentReservation, setCurrentReservation] = useState();
    const [currentReservationError, setCurrentReservationError] = useState(null);

    function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .catch(setCurrentReservationError);
        return () => abortController.abort();
    }
    useEffect(loadReservation, [reservation_id]);

    const thisThing = NewReservation()

console.log(reservation_id)

console.log(currentReservation)




    return (
        <>
        <p>HELLLLLLOOOOOOO</p>
        <div>{thisThing}</div>
        </>
    )
}