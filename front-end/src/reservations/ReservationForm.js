import React from "react";
import { useHistory } from "react-router";

export default function ReservationForm({
  initialFormData,
  handleChange,
  handleSubmit,
}) {
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  return (
    initialFormData && (
      <form onSubmit={handleSubmit} className="form-group">
        <fieldset>
          <legend>Reservation</legend>

          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              placeholder={initialFormData?.first_name || "First Name"}
              value={initialFormData?.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              placeholder={initialFormData?.last_name || "Last Name"}
              value={initialFormData?.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              className="form-control"
              type="text"
              name="mobile_number"
              placeholder={initialFormData?.mobile_number || "Phone Number"}
              value={initialFormData?.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              className="form-control"
              type="date"
              name="reservation_date"
              id="reservation_date"
              placeholder={initialFormData?.reservation_date || "YYYY-MM-DD"}
              value={initialFormData?.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Time</label>
            <input
              className="form-control"
              type="time"
              name="reservation_time"
              id="reservation_time"
              placeholder={initialFormData?.reservation_time || "HH:MM"}
              value={initialFormData?.reservation_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input
              className="form-control"
              type="text"
              name="people"
              id="people"
              placeholder={initialFormData?.people || "Enter Party Size"}
              value={initialFormData?.people}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </fieldset>
        <div className="buttons">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  );
}
