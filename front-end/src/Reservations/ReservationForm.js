import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function ReservationForm() {

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  
  let history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [isError, setIsError] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { people } = formData;
    const value = {...formData, people: Number(people)}
    console.log("Submitted", formData);
    //setFormData({ ...initialFormState });
    createReservation(value)
    .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
    .catch((error) =>{
      const splitError = error.message.split("|")
      setIsError(splitError)
    } 
  )};

  
  const handleCancel = () => {
    history.push("/");
  };

  const errorMessage = <div className="alert alert-danger">
    Please fix the following errors:
    <ul>
      {isError.map((error, index) => {
        return <li key={index}>{error}</li>
      })}
    </ul>
  </div>
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Reservation</h2>
      {isError.length ? errorMessage : null }
      <label htmlFor="first_name">
        First Name
        <input
          id="first_name"
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.first_name}
          required
        />
      </label>
      <label htmlFor="last_name">
        Last Name
        <input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.last_name}
           required
        />
      </label>
      <label htmlFor="mobile_number">
        Mobile Number
        <input
          id="mobile_number"
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          onChange={handleChange}
          value={formData.mobile_number}
          required
        />
      </label>
      <label htmlFor="reservation_date">
        Date
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleChange}
          value={formData.reservation_date}
          required
        />
      </label>
      <label htmlFor="reservation_time">
        Time
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={handleChange}
          value={formData.reservation_time}
          required
        />
      </label>
      <label htmlFor="people">
        People
        <input
          id="people"
          type="number"
          name="people"
          onChange={handleChange}
          value={formData.people}
          min="1"
          required
        />
      </label>
      <button type="submit">
        Submit
      </button>
      <button type="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
