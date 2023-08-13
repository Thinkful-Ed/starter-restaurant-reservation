import React from "react";
import { useHistory } from "react-router-dom";

function NewReservation() {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input name="first_name" className="form-control" />
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input name="last_name" className="form-control" />
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number
        </label>
        <input name="mobile_number" className="form-control" />
        <label htmlFor="reservation_date" className="form-label">
          Reservation Date
        </label>
        <input name="reservation_date" className="form-control" />
        <label htmlFor="reservation_time" className="form-label">
          Reservation Time
        </label>
        <input name="reservation_time" className="form-control" />
        <label htmlFor="people" className="form-label">
          People
        </label>
        <input name="people" className="form-control" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NewReservation;
