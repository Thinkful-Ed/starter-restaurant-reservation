import React, {useEffect, useState} from 'react';
//read the reservation by id
import {useParams, useHistory} from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api"
import Form from "./Form";

export default function Edit({setLoadTrigger}){
    const history = useHistory();
    const {reservation_id} = useParams()
    const [reservation, setReservation] = useState({});
    const [formError, setFormError] = useState(null);
 
useEffect(()=>{
    const abortController = new AbortController();
  readReservation(reservation_id,abortController.signal).then(setReservation).catch(console.log);
  return ()=>abortController.abort(); 
},[reservation_id])

const submitHandler = (data) =>{
  const abortController = new AbortController();
  updateReservation(data, reservation_id, abortController.signal).catch(setFormError);
  setLoadTrigger(prev=>prev+1)
  history.goBack();
  return ()=>abortController.abort();
}
const cancelHandler = () => {
  history.goBack()
}

    return <>
     {reservation.reservation_id&&<Form submitHandler={submitHandler} cancelHandler={cancelHandler} formError={formError} initialFormData={reservation} />}
       </>
}