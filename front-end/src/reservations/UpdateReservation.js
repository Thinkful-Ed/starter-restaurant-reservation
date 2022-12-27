import React, {useState, useEffect} from "react";
import { readReservation, updateReservation } from "../utils/api";
import {useHistory, useParams} from "react-router-dom";
import ReservationForm from "./ReservationForm";

function UpdateReservation (){
  const {reservationId} = useParams();
    const history = useHistory();
   
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
    
        readReservation(reservationId, abortController.signal).then((data)=>{setReservationFormData(data);});
    
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
        const result = window.confirm("Update this reservation?");
        if (result) {
          
              const abortController = new AbortController();
          
             updateReservation(reservation, abortController.signal);
          
              history.push("/");
        }
      };
      const handleReservationSubmit = (event)=>{
        event.preventDefault();
        handleReservationUpdate(reservationFormData);
        //setReservationFormData({...initialReservationFormData});
      };
    return (
      
        <div className="pt-3">
          {/* <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/reservations/${reservation.reservationId}`}>{reservation.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Edit Reservation {reservation.id}</li>
  </ol>
</nav> */}
<ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} />
        </div>
        
    )
}
export default UpdateReservation;