import React, { useState } from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router-dom";

function Search() {
  const history = useHistory();
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState([]);

  const handleChange = (event) => {
    setMobile_number(event.target.value);
  };

  const handleFind = async () => {
    history.push(`/search?mobile_number=${mobile_number}`);
    const cleanNumber = mobile_number.split("-").join("");
    listReservations({ mobile_number: cleanNumber }).then(setReservations);
  };

  return (
    <>
      <h1 className="my-3">Search</h1>
      <form>
        <div className="form-group">
          <label htmlFor="mobile_number">
            <b>Phone Number:</b>
          </label>
          <input
            name="mobile_number"
            id="mobile_number"
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter a customer's phone number"
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-info btn-lg btn-block"
        onClick={handleFind}
      >
        Find
      </button>
      <hr></hr>
      {reservations.length > 0 ? (
        <div>
          <h1>Found Reservations</h1>
          {reservations.map((reservation, index) => {
            const {
              reservation_id,
              first_name,
              last_name,
              mobile_number,
              reservation_time,
              people,
              status,
            } = reservation;
            return (
              <div className="card my-3" key={index}>
                <div className="card-header">
                  <b>Name:</b> {first_name} {last_name}
                </div>
                <div className="card-body">
                  <p className="card-title">
                    <b>Mobile Number:</b> {mobile_number}
                  </p>
                  <p className="card-text">
                    <b>Time:</b> {reservation_time}
                  </p>
                  <p className="card-text">
                    <b>People:</b> {people}
                  </p>
                  <p
                    className="card-text"
                    data-reservation-id-status={reservation_id}
                  >
                    <b>Status:</b> {status}
                  </p>
                  {status === "booked" && (
                    <Link
                      to={`/reservations/${reservation_id}/seat`}
                      className="btn btn-info btn-lg mr-3"
                    >
                      Seat
                    </Link>
                  )}
                  <Link to={`/reservations/${reservation_id}/edit`}>
                    <button
                      className="btn btn-secondary btn-lg mr-3"
                      disabled={status !== "booked" ? true : false}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-dark btn-lg "
                    data-reservation-id-cancel={reservation_id}
                    disabled={status !== "booked" ? true : false}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No reservations found</h1>
      )}
    </>
  );
}

export default Search;
