import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import { createReservation,  } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function CreateReservation (){
const history = useHistory();
const [reservationsError, setReservationsError] = useState(null);
const [formErrors, setFormErrors] = useState(null);
  const handleReservationCreate = async (reservation) => {
    if(reservation.reservation_date >= today() ){
      const result = window.confirm("Create this reservation?");
      if (result) {

        const abortController = new AbortController();

        createReservation(reservation, abortController.signal)
        .catch(setReservationsError);
        if(reservationsError == null){
          history.push(`/dashboard?date=${reservation.reservation_date}`);
        }
        
    }
    }else{
      setFormErrors('Reservation must include a valid future date')
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
         {formErrors? <div className="alert alert-danger m-2">Error: {formErrors}</div> : ""}
          <ErrorAlert error={reservationsError} />
        <ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} handleReservationCreate={handleReservationCreate} />
        </div>
    )
}
export default CreateReservation;