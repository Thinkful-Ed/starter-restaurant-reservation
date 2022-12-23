import React, {useState, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";

import ReservationForm from "./ReservationForm";

function CreateReservation (){
const {reservationId} = useParams();
const [reservation, setReservation] = useState({});
const history = useHistory();

useEffect(() => {
  const abortController = new AbortController();

//   readReservation(reservationId, abortController.signal).then((data)=> {setReservation(data); setReservationFormData({
//     reservationId: `${data.id}`, 
//         front:"", 
//         back:""
//   })});

  return () => abortController.abort();
}, []);
  const handleReservationCreate = async (reservation) => {
    //const {reservationId} = reservationId;
    const result = window.confirm("Create this reservation?");
    if (result) {

        const abortController = new AbortController();

        // createReservation(reservationId, reservation, abortController.signal);

        history.push("/");
    }
};


    const initialReservationFormData = {
        id: ``,
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
        setReservationFormData({...initialReservationFormData});
      };
    return (
        <div className="pt-3">
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/reservations/${reservationId}`}>{reservation.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Add Reservation</li>
  </ol>
</nav>
        <ReservationForm reservation={reservation} handleReservationChange={handleReservationChange} handleReservationSubmit={handleReservationSubmit} handleReservationCreate={handleReservationCreate} reservationFormData={reservationFormData} />
        </div>
    )
}
export default CreateReservation;