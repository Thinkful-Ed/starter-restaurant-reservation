import { createReservation } from "../../utils/api";
import { useState } from "react";
import ErrorAlert from "../ErrorAlert";
import { Link, useHistory } from "react-router-dom";

const Form = () => {

    const history = useHistory();

    const [reservationsError, setReservationsError] = useState(null);

//establishes newRes object that will change as form inputs are filled out 

    const [newRes, setNewRes] = useState({first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  })

//destructures newRes object by its keys for later reference 

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people
  } = newRes;


    function submitHandler(e) {
        e.preventDefault();
        const abortController = new AbortController();
        setReservationsError(null);
        createReservation({...newRes, people: parseInt(newRes.people)}, abortController.signal)
          .then(() => {
            history.push(`/dashboard?date=${reservation_date}`);
          })
          .catch(setReservationsError);
        return () => abortController.abort();
    }

    function handleChange(event) {
        setNewRes({...newRes, 
                   [event.target.name]: event.target.value})
      }


    return (
        <div>
        <ErrorAlert error={reservationsError} />
        <form onSubmit={submitHandler}>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="first_name"
        name="first_name"
        value={first_name}
        placeholder="First Name"
        onChange={handleChange}
      ></input>
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="last_name"
        name="last_name"
        value={last_name}
        placeholder="Last Name"
        onChange={handleChange}
      ></input>
      <label htmlFor="mobile_number">Mobile Number</label>
      <input
        type="tel"
        className="form-control"
        id="mobile_number"
        name="mobile_number"
        value={mobile_number}
        placeholder="Mobile Number"
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_date">Reservation Date</label>
      <input
        type="date"
        className="form-control"
        id="reservation_date"
        name="reservation_date"
        value={reservation_date}
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_time">Reservation Time</label>
      <input
        type="time"
        className="form-control"
        id="reservation_time"
        name="reservation_time"
        value={reservation_time}
        placeholder="HH:MM"
        pattern="[0-9]{2}:[0-9]{2}"
        onChange={handleChange}
      ></input>
      <label htmlFor="people">Number of People</label>
      <input
        type="number"
        className="form-control"
        id="people"
        name="people"
        value={people}
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
    </div>
      ); 
}
 
export default Form;