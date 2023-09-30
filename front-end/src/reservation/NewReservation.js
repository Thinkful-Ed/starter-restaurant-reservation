import React, {useState} from 'react';
import Form from "./Form"
import {useHistory} from 'react-router-dom';
import {createReservation} from "../utils/api";
function NewReservation({setDate, setLoadTrigger}){
    const history = useHistory();
    const initialData = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:"",
        reservation_time:"",
        people:0
    }
    const [formError, setFormError] = useState(null);
    async function newReservation(data){
        setFormError(null)
        const abortController = new AbortController()
         await createReservation(data, abortController.signal).then(()=>{
          setDate(()=>data.reservation_date)
       
          setLoadTrigger(prev=>prev+1)
          history.push(`/dashboard?date=${data.reservation_date}`)
         }).catch(setFormError)
        return () => abortController.abort();
      }
      function submitHandler(data){
        newReservation(data)
      }

      function cancelHandler(){
        history.goBack();
    }

    // function changeHandler(event){
    //   console.log(event.target.value)
    //     if(event.target.name === 'people'){
    //       setFormData({
    //         ...formData,
    //         'people':Number(event.target.value)
    //       })
    //     }else{
    
    //       setFormData({
    //           ...formData,
    //           [event.target.name]:event.target.value,
    //       })
    //     }
    //   }

    return <>
    <h1>This is new Reservation</h1>
    <Form submitHandler={submitHandler} cancelHandler={cancelHandler}  formError={formError} initialFormData={initialData} />
    </>
}

export default NewReservation;