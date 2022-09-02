import React, {useState} from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  })

  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })


  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData)
    formData.people = Number(formData.people)
    const newReservation = await createReservation(formData)
      console.log(newReservation)
      console.log(newReservation.message)
      const formDate = formData.reservation_date
      if (newReservation){
        history.push(`/dashboard?date=${formDate}`)
      }else{
        window.alert(`Something went wrong!`)
      }
  }

  return (
    <main>
      <h1>New Reservation</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="first_name" className="col-sm-2 col-form-label">First name</label>
        <input required type="text" name="first_name" id="first_name" onChange={handleInputChange}/>
        <label for="last_name" className="col-sm-2 col-form-label">Last name</label>
        <input required type="text" name="last_name" id="last_name" onChange={handleInputChange}/>
        <label for="mobile_number" className="col-sm-2 col-form-label">Mobile number</label>
        <input required type="tel" id="mobile_number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="mobile_number" onChange={handleInputChange}/>
        <label for="reservation_date" className="col-sm-2 col-form-label">Date of reservation</label>
        <input required type="date" id="reservation_date" name="reservation_date" onChange={handleInputChange}/>
        <label for="reservation_time" className="col-sm-2 col-form-label">Time of reservation</label>
        <input required type="time" id="reservation_time" name="reservation_time" onChange={handleInputChange}/>
        <label for="people" className="col-sm-2 col-form-label">Number of people in the party</label>
        <input required type="number" id="people" name="people" onChange={handleInputChange}/>
      <div>
        <button className="btn btn-primary mr-1" type="submit">Submit</button>
        <button className="btn btn-secondary mr-1" onClick={() => history.goBack(1)} type="button">Cancel</button>
      </div>
      </div>
    </form>
    </main>
  );
}

export default NewReservation;
