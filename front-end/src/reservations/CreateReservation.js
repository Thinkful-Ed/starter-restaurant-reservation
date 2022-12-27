import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import { createReservation,  } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";


function CreateReservation (){
const history = useHistory();
const [reservationsError, setReservationsError] = useState(null);
  const handleReservationCreate = async (reservation) => {
    const result = window.confirm("Create this reservation?");
    if (result) {

        const abortController = new AbortController();

        createReservation(reservation, abortController.signal)
        .catch(setReservationsError);
        
        history.push(`/dashboard?date=${reservation.reservation_date}`);
    }
};


    const initialReservationFormData = {
        
        first_name:``, 
        last_name:``,
        mobile_number:``, 
        reservation_date: ``, 
        reservation_time: ``, 
        people: ``
      };
      const [reservationFormData, setReservationFormData]=useState({...initialReservationFormData});
      const handleReservationChange = ({target})=>{
        setReservationFormData({
          ...reservationFormData, 
          [target.name]:target.value,
        });   
      };
      const handleReservationSubmit = (event)=>{
        event.preventDefault();
        
        handleReservationCreate(reservationFormData);
        //setReservationFormData({...initialReservationFormData});
      };
    return (
        <div className="pt-3">
          <ErrorAlert error={reservationsError} />
        <ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} handleReservationCreate={handleReservationCreate} />
        </div>
    )
}
export default CreateReservation;