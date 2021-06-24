import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function NewReservation() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form>
        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            name="first_name"
            value={form.first_name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input
            type="text"
            name="last_name"
            value={form.last_name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="mobile_number">
          Phone Number
          <input
            type="tel"
            name="mobile_number"
            value={form.mobile_number || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="reservation_date">
          Reservation Date
          <input
            type="date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-d{2}-d{2}"
            value={form.reservation_date || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="reservation_time">
          Reservation Time
          <input
            type="time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="\d{2}:\d{2}"
            value={form.reservation_time || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="people">
          Party Size
          <input
            type="number"
            name="people"
            min="1"
            value={form.people || ""}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={history.goBack}>Cancel</button>
      </form>
      <ErrorAlert error={error} />
    </div>
  );
}

export default NewReservation;
