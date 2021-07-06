import Form from "./Form";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { readReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

const UpdatedReservation = () => {

const [readReservationError, setReadReservationError] = useState(null);

const [foundRes, setFoundRes] = useState({})

const { reservation_id } = useParams();

useEffect(findReservation, [reservation_id]);

function findReservation() {
    const abortController = new AbortController();
    setReadReservationError(null);
    readReservation(reservation_id, abortController.signal)
    .then(setFoundRes)
    .catch(setReadReservationError);
}


    
    
  return (
    <div> 
      <ErrorAlert error={readReservationError} />
    {Object.keys(foundRes).length && <Form reservation={foundRes}/>}
    </div>
  );

}
 
export default UpdatedReservation;