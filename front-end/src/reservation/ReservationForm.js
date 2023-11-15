import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ReservationForm({ initialFormState, submitAction }) {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
  
    function handleSubmit(event) {
      event.preventDefault();
      submitAction(formData);
        console.log(formData)
    }


    return (
        <div>
        <form>
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
            <Link to="/" className="btn btn-secondary m-1">
              Cancel
            </Link>
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