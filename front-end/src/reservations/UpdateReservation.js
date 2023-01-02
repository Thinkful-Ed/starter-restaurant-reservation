import React, {useState, useEffect} from "react";
import { readReservation, updateReservation } from "../utils/api";
import {useHistory, useParams} from "react-router-dom";
import ReservationForm from "./ReservationForm";
import formatReservationDate from "../utils/format-reservation-date";
import ErrorAlert from "../layout/ErrorAlert";


function UpdateReservation (){
  const {reservationId} = useParams();
    const history = useHistory();
   const [reservationError, setReservationError] = useState(null);
    //const [reservation, setReservation] = useState({});
   
    const initialReservationFormData = {
         
        id: ``,
        first_name:``, 
        last_name:``,
        mobile_number:``, 
        reservation_date: ``, 
        reservation_time: ``, 
        people: ``
      };
      useEffect(() => {
        const abortController = new AbortController();
    
        readReservation(reservationId, abortController.signal).then((data)=>{
          const updatedData = formatReservationDate(data);
          
          setReservationFormData({
            id: `${updatedData.reservation_id}`,
            first_name:`${updatedData.first_name}`, 
            last_name:`${updatedData.last_name}`,
            mobile_number:`${updatedData.mobile_number}`, 
            reservation_date: `${updatedData.reservation_date}`, 
            reservation_time: `${updatedData.reservation_time}`, 
            people: `${updatedData.people}`,
            status: `${updatedData.status}`
          });});
    
        return () => abortController.abort();
      }, [reservationId]);

      const [reservationFormData, setReservationFormData]=useState({...initialReservationFormData});
      const handleReservationChange = ({target})=>{
        setReservationFormData({
          ...reservationFormData, 
          [target.name]:target.value,
        });   
      };
      const handleReservationUpdate = async (reservation) => {
        const abortController = new AbortController();

          try{
          
             await updateReservation(reservation, abortController.signal);
          
              history.goBack();
        } catch(error){
          if(error){
            setReservationError(error);
          }
        }
        return () => abortController.abort();
      };
      const handleReservationSubmit = (event)=>{
        event.preventDefault();
        handleReservationUpdate(reservationFormData);
      };
    return (
      
        <div className="pt-3">
         {reservationError &&
                <ErrorAlert error={reservationError} />
            }
<ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} />
        </div>
        
    )
}
export default UpdateReservation;