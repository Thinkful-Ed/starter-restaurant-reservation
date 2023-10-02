import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"

function Form({setDate}){
const history = useHistory();
const initialData = {
    first_name:"",
    last_name:"",
    mobile_number:"",
    reservation_date:"",
    reservation_time:"",
    people:0
}
const [formData,setFormData] = useState(initialData);
const [formError, setFormError] = useState(null);



async function newReservation(){
  setFormError(null)
  const abortController = new AbortController()
  await createReservation(formData, abortController.signal).then(()=>{
    if(formError === null){
      setDate(()=>formData.reservation_date)
      //test file need it clear after submition, even it is invalid
      //setFormData(()=>initialData)
      history.push(`/dashboard?date=${formData.reservation_date}`)
     }
  }).catch(setFormError)
  return () => abortController.abort();
}

  async function submitHandler(event){
    event.preventDefault()
    await newReservation();
    setFormData(()=>initialData)
  
    
  }
  function cancelHandler(){
      history.push("/")
  }
  function changeHandler(event){
    if(event.target.name === 'people'){
      setFormData({
        ...formData,
        'people':Number(event.target.value)
      })
    }else{

      setFormData({
          ...formData,
          [event.target.name]:event.target.value,
      })
    }
  }

    return<>

    <form onSubmit={submitHandler}>
        <label htmlFor="first_name"></label>
        <input type='text' id="first_name" name="first_name" placeholder="First Name" value={formData.first_name} onChange={changeHandler}></input>
        <label htmlFor="last_name"></label>
        <input type='text' id="last_name" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={changeHandler}></input>
        <label htmlFor="mobile_number"></label>
        <input type='text' id="mobile_number" name="mobile_number" placeholder="Mobile Number" value={formData.mobile_number} onChange={changeHandler}></input>
        <label htmlFor="reservation_date"></label>
        <input type='date' id="reservation_date" name="reservation_date" placeholder="Reservation Date" value={formData.reservation_date} onChange={changeHandler}></input>
        <label htmlFor="reservation_time"></label>
        <input type='time' id="reservation_time" name="reservation_time" placeholder="Reservation Time" value={formData.reservation_time} onChange={changeHandler}></input>
        <label htmlFor="people"></label>
        <input type='text' id="people" name="people" placeholder="People" value={formData.people} onChange={changeHandler}></input>
        <button type="submit">Submit</button>
        <button onClick={cancelHandler}>Cancel</button>
    </form>
<ErrorAlert error={formError} />
    </>
}

export default Form;