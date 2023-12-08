import React, { useState, useEffect } from "react";

function ReservationForm({ initialFormState, submitAction, handleCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isTuesday, setIsTuesday] = useState(false);
  const [isFuture, setIsFuture] = useState(true);
  const [isValidTime, setIsValidTime] = useState(true);
  const [showDateErrors, setShowDateErrors] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);

  useEffect(() => {
    const isValidTimeValidator = (selectedTime) => {
      if (selectedTime) {
        const openingTime = "10:30";
        const closingTime = "21:30";
    
        const timeStamp = new Date();
        const currentTime = timeStamp.getHours() * 60 + timeStamp.getMinutes();
        const selectedTimeMinutes = parseInt(selectedTime.split(":")[0]) * 60 + parseInt(selectedTime.split(":")[1]);

        if (formData.reservation_date === timeStamp.toISOString().split('T')[0] && currentTime > selectedTimeMinutes) {
          setIsValidTime(false);
        } else if (selectedTimeMinutes >= parseInt(openingTime.split(":")[0]) * 60 + parseInt(openingTime.split(":")[1]) &&
          selectedTimeMinutes <= parseInt(closingTime.split(":")[0]) * 60 + parseInt(closingTime.split(":")[1])) {
          setIsValidTime(true);
        } else {
          setIsValidTime(false);
        }
      }
    };

    isValidTimeValidator(formData.reservation_time)
  }, [formData.reservation_time, formData.reservation_date])


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
    const currentDate = new Date();
  
    // Get the time zone offset in minutes
    const timeZoneOffset = currentDate.getTimezoneOffset();
  
    // Adjust the selected date by adding the time zone offset
    const adjustedSelectedDate = new Date(selectedDate.getTime() + timeZoneOffset * 60 * 1000);
  
    setIsTuesday(adjustedSelectedDate.getDay() === 2);
  };

  const isFutureValidator = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
  
    // Get the time zone offset in minutes
    const timeZoneOffset = currentDate.getTimezoneOffset();
  
    // Adjust the selected date by adding the time zone offset
    const adjustedSelectedDate = new Date(selectedDate.getTime() + timeZoneOffset * 60 * 1000);

    currentDate.setHours(0, 0, 0, 0);
  
    setIsFuture(adjustedSelectedDate >= currentDate);
  };


  function handleSubmit(event) {
    event.preventDefault();
  
    // Show errors only if there are validation issues
    if (isTuesday || !isFuture) {
      setShowDateErrors(true);
    }
  
    if (!isValidTime && !showTimeError) {
      setShowTimeError(true);
    }
  
    if (!isTuesday && isFuture && isValidTime) {
      // if (formData.reservation_time.length === 5) {
      //   formData.time = formData.reservation_time + ":00"
      // }
      submitAction(formData);
    }
  }

  // pass in a function as a prop to allow for different cancel actions when the form is reused


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
          {(showDateErrors) && (
            <div className="alert alert-danger">
              {isTuesday ? <p>restaurant is not open on Tuesdays</p> : <></>}
              {!isFuture ? <p>please select a future date</p> : <></>}
            </div>
          )}
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
          {(showTimeError) && (
            <div className="alert alert-danger">
              <p>Please select a future time between 10:30 AM and 9:30 PM.</p>
            </div>
          )}
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
            cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-1"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;