import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleChange, handleSubmit, formData }) {
  // Access the history object to navigate programmatically
  const history = useHistory();

  // Handle clicking the "Cancel" button
  function handleCancel() {
    // Navigate back in the history (go back to the previous page)
    history.goBack();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form header */}
      <h3 className="mt-2 ml-3">Make A Reservation: </h3>
      <fieldset>
        <div className="mt-2">
          {/* Input fields for first name */}
          <input
            type="text"
            name="first_name"
            className="formcreation ml-3"
            id="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          {/* Input fields for last name */}
          <input
            type="text"
            name="last_name"
            className="formcreation ml-3"
            id="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          {/* Input fields for mobile number */}
          <input
            type="text"
            name="mobile_number"
            className="formcreation ml-3"
            id="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />

          {/* Input fields for number of people */}
          <input
            type="number"
            name="people"
            className="formcreation ml-3"
            id="people"
            placeholder="Number of People"
            value={formData.people}
            onChange={handleChange}
            required
          />

          {/* Input fields for reservation date */}
          <input
            type="date"
            name="reservation_date"
            className="formcreation ml-3"
            id="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />

          {/* Input fields for reservation time */}
          <input
            type="time"
            name="reservation_time"
            className="ml-3"
            id="time"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>
      <div className="mt-3">
        {/* Submit button */}
        <button className="btn btn-primary ml-3" type="submit">
          Submit
        </button>
        {/* Cancel button */}
        <button
          className="btn btn-primary ml-3"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
