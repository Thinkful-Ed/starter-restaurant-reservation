import { useState } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../dashboard/Reservation";

function Search() {
  const history = useHistory();

  //   const query = useQuery();
  //   const mobileNumber = query.get("mobile_number");

  const initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    setFormErrors(errors);

    const mobileNumberQuery = { mobile_number: formData.mobile_number };

    // Call API to list reservations
    listReservations(mobileNumberQuery, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  const reservationList = reservations.map((reservation) => (
    <Reservation reservation={reservation} />
  ));

  return (
    <>
      {formErrors.length ? displayErrors : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="mobile_number">
            Mobile Number:
          </label>
          <input
            required
            type="text"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={formData.mobile_number}
            className="form-control"
            name="mobile_number"
          ></input>
        </div>
        <button className="btn btn-primary mx-2" type="submit">
          Find
        </button>
      </form>
      {reservations.length ? (
        <div class="container mt-3">
          <div class="row">
            <div class="col-sm">{reservationList}</div>
          </div>
        </div>
      ) : (
        <p>No reservations found</p>
      )}
    </>
  );
}

export default Search;
