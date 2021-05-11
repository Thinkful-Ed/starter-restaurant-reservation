import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
const BASE_API_URL = "http://localhost:5000" // "https://restaurant-reservation-api.vercel.app"

export default function NewReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  }
  const history = useHistory()
  const [formData, setFormData] = useState({ ...initialFormState })

  // HANDLERS
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${BASE_API_URL}/reservations`, formData)
      .then(history.push(`/reservations?date=${formData.reservation_date}`))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          placeholder="Customer's first name here"
          onChange={handleChange}
          value={formData.first_name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          placeholder="Customer's last name here"
          onChange={handleChange}
          value={formData.last_name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="tel"
          className="form-control"
          id="mobile_number"
          placeholder="E.g. 541 444 0755"
          onChange={handleChange}
          value={formData.mobile_number}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          className="form-control"
          id="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          type="time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          className="form-control"
          id="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">Party Size</label>
        <input
          type="text"
          className="form-control"
          id="people"
          onChange={handleChange}
          value={formData.people}
          required
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Submit
      </button>
    </form>
  )
}
