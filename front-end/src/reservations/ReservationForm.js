import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { formatAsTime } from "../utils/date-time";

function ReservationForm({
  handleSubmit,
  initialFormState,
  reservationsError,
}) {
  const [reservationData, setReservationData] = useState({
    ...initialFormState,
  });

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "people") {
      value = Number(value);
    }
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  useEffect(() => {
    setReservationData(initialFormState);
  }, [initialFormState]);

  const onSubmit = (event) => {
    event.preventDefault();
    const formattedTime = formatAsTime(reservationData.reservation_time);
    handleSubmit({
      ...reservationData,
      reservation_time: formattedTime,
    });
    if (!reservationsError) {
      setReservationData({ ...initialFormState });
    }
  };

  return (
    <div className="d-flex row justify-content-center">
      <form
        className="p-4 m-4 rounded-4 bg-transparent" style={{ width: "40rem" }}
        onSubmit={onSubmit}
      >
        <div className="row">
          <div className="col-lg-6 p-2">
            <input
              className="form-control"
              name="first_name"
              id="first_name"
              type="text"
              placeholder="First Name"
              required={true}
              onChange={handleChange}
              value={reservationData.first_name || ""}
            />
          </div>
          <div className="col-lg-6 p-2">
            <input
              className="form-control"
              name="last_name"
              id="last_name"
              type="text"
              placeholder="Last Name"
              required={true}
              onChange={handleChange}
              value={reservationData.last_name || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 p-2">
            <input
              className="form-control"
              name="mobile_number"
              id="mobile_number"
              type="tel"
              placeholder="Phone Number"
              required={true}
              onChange={handleChange}
              value={reservationData.mobile_number || ""}
            />
          </div>

          <div className="col-lg-6 p-2">
            <input
              className="form-control"
              name="people"
              id="people"
              type="number"
              placeholder="Party Size"
              required={true}
              onChange={handleChange}
              value={reservationData.people || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 p-2">
            <input
              className="form-control"
              name="reservation_date"
              id="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              required
              onChange={handleChange}
              value={reservationData.reservation_date || ""}
            />
          </div>
          <div className="col-md-6 p-2">
            <input
              className="form-control"
              name="reservation_time"
              id="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              required
              onChange={handleChange}
              value={reservationData.reservation_time || ""}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="row">
            <div className="col-6 p-2">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  history.goBack();
                }}
                className="btn btn-outline-danger "
              >
                Cancel
              </button>
            </div>

            <div className="col-6 p-2 d-flex justify-content-end">
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
