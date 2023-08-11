import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({handleChange, handleSubmit }) {
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <h3>Make A Reservation</h3>
        <div>
          <input
            type="text"
            name="first_name"
            className="formcreation"
            id="first_name"
            placeholder="first_name"
            value="first_name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            className="formcreation"
            id="last_name"
            placeholder="last_name"
            value="last_name"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="mobile_number"
            className="formcreation"
            id="mobile_number"
            placeholder="mobile_number"
            value="mobile_number"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="people"
            className="formcreation"
            id="people"
            placeholder="amount of people"
            value="people"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="reservation_date"
            className="formcreation"
            id="reservation_date"
            placeholder="reservation_date"
            value="reservation_date"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="formcreation"
            id="time"
            placeholder="time"
            value="time"
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReservationForm