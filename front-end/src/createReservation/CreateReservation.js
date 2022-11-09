import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const [newResError, setNewResError] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setNewResError(null);

    const formatReservation = {
      ...formData,
      people: Number(formData.people),
    };
    createReservation(formatReservation, abortController.signal)
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch(setNewResError);
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <ErrorAlert error={newResError} />
      <div className="col">
        <main>
          <h1>Create Reservation</h1>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    required
                    placeholder="First name"
                    onChange={handleChange}
                    value={formData.first_name}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="last_name">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    required
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={formData.last_name}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="mobile_number">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile_number"
                    id="mobile_number"
                    required
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    value={formData.mobile_number}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="reservation_date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="reservation_date"
                    id="reservation_date"
                    required
                    placeholder="yyyy-mm-dd"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={handleChange}
                    value={formData.reservation_date}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="reservation_time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="reservation_time"
                    id="reservation_time"
                    required
                    placeholder="09:20"
                    pattern="[0-9]{2}:[0-9]{2}"
                    onChange={handleChange}
                    value={formData.reservation_time}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="people">Number of people</label>
                  <input
                    type="number"
                    className="form-control"
                    name="people"
                    id="people"
                    required
                    min="1"
                    onChange={handleChange}
                    value={formData.people}
                  />
                </div>
              </div>
              <br />
              <button
                style={{ backgroundColor: "#7B6A96", color: "white" }}
                type="submit"
                className="btn btn-submit"
              >
                Submit
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
            </fieldset>
          </form>
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateReservation;
