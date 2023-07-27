import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import { useHistory } from "react-router";
import { searchReservationByPhone } from "../utils/api";

export default function SearchByMobilePhone() {
  const initialFormData = {
    mobile_number: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState(initialFormData);
  const [displaySearchResults, setDisplaySearchResults] = useState([]);
  const [searchError, setSearchError] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Sends a get request with the mobile number as a query.
  // The data returned from the get request is stored in state.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const returnedSearchReservations = await searchReservationByPhone(
      formData.mobile_number,
      abortController.signal
    );
    setDisplaySearchResults(returnedSearchReservations);
    try {
    } catch (error) {
      setSearchError([error.message]);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <div>
        <h1>Search By Phone</h1>
      </div>
      <ErrorAlert error={searchError} />
      <div>
        <form onClick={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="mobile_number" className="col-form-label mr-3">
              Mobile Number:
            </label>
            <input
              name="mobile_number"
              id="mobile_number"
              type="text"
              placeholder="Enter a customer's phone number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
              className="mr-3"
            />
            <div className="mr-3">
              <button type="submit" className="btn btn-dark mr-2">
                Find
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline-dark"
              >
                Cancel
              </button>
            </div>
          </div>
          {displaySearchResults.length === 0 ? (
            <div className="mt-5">
              <h3>No reservations found</h3>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {displaySearchResults.map((rsvp) => (
                  <div key={rsvp.reservation_id} className="mt-5 mr-3">
                    <ReservationsList reservation={rsvp} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}