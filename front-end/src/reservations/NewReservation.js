import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

// const MOCK_FORM_DATA = {
//   first_name: "James",
//   last_name: "Smith",
//   mobile_number: "800-555-1212",
//   reservation_date: "01012035",
//   reservation_time: "1330",
//   people: "2",
// };

const INITIAL_FORM_DATA = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function NewReservation() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(
        {
          ...formData,
          people: parseInt(formData.people),
        },
        abortController.signal
      );
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationsError(error);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>NEW RESERVATIONS</h1>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={onSubmit}>
        <label for="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}></input>

        <label for="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}></input>

        <label for="mobile_number">Mobile Number</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          value={formData.mobile_number}
          onChange={handleChange}></input>

        <label for="reservation_date">Reservation date</label>
        <input
          name="reservation_date"
          id="reservation_date"
          type="date"
          value={formData.reservation_date}
          onChange={handleChange}></input>

        <label for="reservation_time">Reservation Time</label>
        <input
          name="reservation_time"
          id="reservation_time"
          type="time"
          value={formData.reservation_time}
          onChange={handleChange}></input>

        <label for="people">Number of people</label>
        <input
          name="people"
          id="people"
          type="number"
          value={formData.people}
          onChange={handleChange}></input>

        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewReservation;
