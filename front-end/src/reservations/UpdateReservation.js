import React, {useState, useEffect} from "react";
import { readReservation, updateReservation } from "../utils/api";
import {useHistory, useParams} from "react-router-dom";
import ReservationForm from "./ReservationForm";
import formatReservationDate from "../utils/format-reservation-date";
import ErrorAlert from "../layout/ErrorAlert";
import formatRservationTime from "../utils/format-reservation-time";

function UpdateReservation (){
  const {reservationId} = useParams();
    const history = useHistory();
   const [reservationError, setReservationError] = useState(null);
    //const [reservation, setReservation] = useState({});
   
    const initialReservationFormData = {
         
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
          // const timeUpdatedData = formatRservationTime(data)
          // const updatedData = formatReservationDate(timeUpdatedData);
          
          setReservationFormData({
            first_name:`${data.first_name}`, 
            last_name:`${data.last_name}`,
            mobile_number:`${data.mobile_number}`, 
            reservation_date: `${data.reservation_date}`, 
            reservation_time: `${data.reservation_time}`, 
            people: `${data.people}`,
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
          
             await updateReservation(reservationId,reservation, abortController.signal);
          
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