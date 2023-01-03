import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import { createReservation,  } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
// import formatReservationDate from "../utils/format-reservation-date";

function CreateReservation (){
const history = useHistory();
const [reservationsError, setReservationsError] = useState(null);
// const [formErrors, setFormErrors] = useState([]);

// const validateNotTuesday = (reservation) =>{

//   const reformat = reservation.reservation_date.split('-');
//   const reformDate = `${reformat[1]}-${reformat[2]}-${reformat[0]}`;
//   const d = new Date(reformDate);
  
//   let day = d.getDay();

// if(day === 2){
//   setFormErrors([...formErrors, {message:'Form: We are closed on Tuesday'}])
// }
 
  
//   }
//   const validateFutureDate = (reservation) =>{

//     const reformat = reservation.reservation_date.split('-');
//     const reformDate = `${reformat[1]}-${reformat[2]}-${reformat[0]}`;
//     const d = new Date(reformDate);
//     const tooday = new Date();
  
//     if(d < tooday){
//       setFormErrors([...formErrors, {message:'Form: Reservation must include a valid future date'}])
//     }
    
//     }


  const handleReservationCreate = async (reservation) => {
      //validateFutureDate(reservationFormData);
      //validateNotTuesday(reservationFormData);
      //console.log(formErrors)
      //if(formErrors.length === 0){
      //const result = window.confirm("Create this reservation?");
      

        const abortController = new AbortController();
try{
  const newReservation = await createReservation(reservation, abortController.signal);
  const date = new Date(newReservation.reservation_date);
  const dashboardDate = date.toISOString().split('T')[0];
  history.push(`/dashboard?date=${dashboardDate}`);
}
   catch(error){
    if (error){
      setReservationsError(error)
    }
   }          
    
  //} 
  return () => abortController.abort();
};

    const initialReservationFormData = {
        
        first_name:``, 
        last_name:``,
        mobile_number:``, 
        reservation_date: ``, 
        reservation_time: ``, 
        people: ``, 
        status: `booked`
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
        //validateFutureDate(reservationFormData);
       // validateNotTuesday(reservationFormData);
        //if(formErrors.length === 0){
       handleReservationCreate(reservationFormData);
    //    }
        //setReservationFormData({...initialReservationFormData});
      };
    return (
        <div className="pt-3">
          {/* {formErrors.length > 0 && formErrors.map((formError)=>(
          <ErrorAlert error={formError} />
         ))} */}
        <ErrorAlert error={reservationsError} />
         
          
        <ReservationForm handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} reservationFormData={reservationFormData} handleReservationCreate={handleReservationCreate} />
       
        </div>
    )
}
export default CreateReservation;