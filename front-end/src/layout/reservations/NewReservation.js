import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

const NewReservation = () => {

  const [reservationsError, setReservationsError] = useState(null);

  const [newRes, setNewRes] = useState({first_name: "",
                                        last_name: "",
                                        mobile_number: "",
                                        reservation_date: "",
                                        reservation_time: "",
                                        people: ""
                                      })

  const history = useHistory();

  function handleChange(event) {
    setNewRes({...newRes, 
               [event.target.name]: event.target.value})
  }

  async function submitHandler(e) {
    e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: newRes})
    })
      await response.json();
      history.push(`/dashboard?date=${newRes.reservation_date}`)
  }
  catch(error) {
    setReservationsError(error)
  }
      
  }

  return (
    <main>
    <ErrorAlert error={reservationsError} />
    <form onSubmit={submitHandler}>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="first_name"
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
      ></input>
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="last_name"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
      ></input>
      <label htmlFor="mobile_number">Mobile Number</label>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="form-control"
        id="mobile_number"
        name="mobile_number"
        placeholder="Mobile Number"
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_date">Reservation Date</label>
      <input
        type="date"
        className="form-control"
        id="reservation_date"
        name="reservation_date"
        placeholder="Reservation Date"
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_time">Reservation Time</label>
      <input
        type="time"
        className="form-control"
        id="reservation_time"
        name="reservation_time"
        placeholder="Reservation Time"
        onChange={handleChange}
      ></input>
      <label htmlFor="people">Number of People</label>
      <input
        type="text"
        className="form-control"
        id="people"
        name="people"
        placeholder="Number of People"
        onChange={handleChange}
      ></input>
      <Link to="/" type="button" className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </main>
  );
};

export default NewReservation;
