import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationForm({ initialFormState, submitAction }) {
    const [formData, setFormData] = useState(initialFormState);
    const [isTuesday, setIsTuesday] = useState(false);
    const [isFuture, setIsFuture] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const history = useHistory();

    const handleChange = ({ target }) => {
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          [target.name]: target.value,
        };
        return updatedFormData;
      });
    };

    useEffect(() => {
      // Check date validity whenever formData or its dependencies change
      isTuesdayValidator(formData.reservation_date);
      isFutureValidator(formData.reservation_date);
    }, [formData.reservation_date]);
  
  
    const isTuesdayValidator = (date) => {
      const selectedDate = new Date(date);
      setIsTuesday(selectedDate.getDay() === 1);
    };
  
    const isFutureValidator = (date) => {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      setIsFuture(selectedDate > currentDate);
    };

    function handleSubmit(event) {
      event.preventDefault();
      // Show errors only if there are validation issues
      if (isTuesday || !isFuture) {
        setShowErrors(true);
      } else {
        submitAction(formData);
      }
    }

    // pass in a function as a prop to allow for different cancel actions when the form is reused

    function handleCancel() {
        history.goBack();
    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Date:</label>
            <input
              type="date" 
              placeholder="YYYY-MM-DD" 
              pattern="\d{4}-\d{2}-\d{2}"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              onChange={handleChange}
              value={formData.reservation_date}
              required
            />
            {showErrors || isTuesday || !isFuture ? <div className="alert alert-danger">
              {isTuesday ? <p>restaurant is not open on Tuesdays</p> : <></>}
              {!isFuture ? <p>please select a future date</p> : <></>}
              </div> : <></>}
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Time:</label>
            <input
              type="time" 
              placeholder="HH:MM" 
              pattern="[0-9]{2}:[0-9]{2}"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              onChange={handleChange}
              value={formData.reservation_time}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">People:</label>
            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
              placeholder="people"
              onChange={handleChange}
              value={formData.people}
              required
            />
          </div>
          <div>
            <button onClick={handleCancel} className="btn btn-secondary m-1">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary m-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
}

export default ReservationForm;