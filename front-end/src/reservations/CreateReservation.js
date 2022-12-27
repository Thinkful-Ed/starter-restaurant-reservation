import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import { createReservation,  } from "../utils/api";
import ReservationForm from "./ReservationForm";

function CreateReservation (){
const history = useHistory();

  const handleReservationCreate = async (reservation) => {
    const result = window.confirm("Create this reservation?");
    if (result) {

        const abortController = new AbortController();

        createReservation(reservation, abortController.signal);
        
        history.push(`/dashboard?rdate=${reservation.reservation_date}`);
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
          
        <ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} handleReservationCreate={handleReservationCreate} />
        </div>
    )
}
export default CreateReservation;