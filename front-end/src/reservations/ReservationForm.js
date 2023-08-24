import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mt-2 ml-3">Make A Reservation</h3>
      <fieldset>
        <div className="mt-2">
          <input
            type="text"
            name="first_name"
            className="formcreation ml-3"
            id="first_name"
            placeholder="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            className="formcreation ml-3"
            id="last_name"
            placeholder="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile_number"
            className="formcreation ml-3"
            id="mobile_number"
            placeholder="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="people"
            className="formcreation ml-3"
            id="people"
            placeholder="amount of people"
            value={formData.people}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="reservation_date"
            className="formcreation ml-3"
            id="reservation_date"
            placeholder="date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="reservation_time"
            className="ml-3"
            id="time"
            placeholder="time"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>
      <div className="mt-3">
        <button className="btn btn-primary ml-3" type="submit">
          Submit
        </button>
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
