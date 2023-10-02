import React, {useState} from "react";

import ErrorAlert from "../layout/ErrorAlert";

function Form({submitHandler, cancelHandler, formError, initialFormData}) {
  //test file need it clear after submition, even it is invalid
  //setFormData(()=>initialData)
  const [formData, setFormData] = useState(initialFormData);
  const changeHandler = (event) => {
    if (formData.status) {
      if (formData.status === "booked") {
        setFormData((prevData) => ({
          ...prevData,
          [event.target.name]: event.target.value,
        }));
      }
    } else {
      if (event.target.name === "people") {
        setFormData({
          ...formData,
          people: Number(event.target.value),
        });
      } else {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler(formData);
    //setFormData(() => initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={changeHandler}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={changeHandler}
        ></input>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={changeHandler}
        ></input>
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder="Reservation Date"
          value={formData.reservation_date}
          onChange={changeHandler}
        ></input>
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          placeholder="Reservation Time"
          value={formData.reservation_time}
          onChange={changeHandler}
        ></input>
        <label htmlFor="people">People</label>
        <input
          type="text"
          id="people"
          name="people"
          placeholder="People"
          value={formData.people}
          onChange={changeHandler}
        ></input>
        <button type="submit">Submit</button>

        <button
          data-reservation-id-cancel={formData.reservation_id}
          onClick={() => cancelHandler()}
        >
          Cancel
        </button>
      </form>
      <ErrorAlert error={formError} />
    </>
  );
}

export default Form;
