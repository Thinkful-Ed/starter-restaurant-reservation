import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.status === 201) {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } else {
        const responseData = await response.json();
        setErrors([responseData.error]);
      }
    } catch (error) {
      console.error(error);
      setErrors(["An unexpected error occurred."]);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>New Reservation</h1>
      <ErrorAlert errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date of Reservation:
          <input
            type="date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Time of Reservation:
          <input
            type="time"
            name="reservation_time"
            value={formData.reservation_time}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Number of People:
          <input
            type="number"
            name="people"
            value={formData.people}
            onChange={handleInputChange}
            min="1"
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewReservation;