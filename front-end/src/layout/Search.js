import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchNumber } from "../utils/api";
import ResTable from "./ResTable";
import ErrorAlert from "./ErrorAlert";

export default function Search() {
  const initialData = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [reservationsError, setReservationsError] = useState({});
  const [reservations, setReservations] = useState([]);

  function changeHandler({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      setReservationsError({});
      setReservations([]);
      const result = await searchNumber(
        formData.mobile_number,
        abortController.signal
      );
      setReservations(result);
    } catch (error) {
      setReservationsError(error);
    }
  }

  return (
    <>
      <main>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Search Reservation
            </li>
          </ol>
        </nav>
        <h1>Search Reservations</h1>
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="row">
              <div className="form-group col-md-4 col-sm-12">
                <label htmlFor="mobile number">Mobile</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="mobile_number"
                    name="mobile_number"
                    className="form-control"
                    placeholder="Enter the customer's mobile number"
                    value={formData.mobile_number}
                    onChange={changeHandler}
                  ></input>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      <span className="oi oi-magnifying-glass"></span>&nbsp;
                      Find
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <div className="table-responsive">
          <table className="table no-wrap">
            <thead>
              <tr>
                <th className="border-top-0">#</th>
                <th className="border-top-0">NAME</th>
                <th className="border-top-0">PHONE</th>
                <th className="border-top-0">DATE</th>
                <th className="border-top-0">TIME</th>
                <th className="border-top-0">PEOPLE</th>
                <th className="border-top-0">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length >= 1 ? (
                <ResTable reservations={reservations} />
              ) : (
                <tr>
                  <td name="no_reservation">No reservations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {reservationsError.message && <ErrorAlert error={reservationsError} />}
    </>
  );
}