/**
 * Defines a reservation list item.
 * @param reservation
 *  the reservation component for a reservation.
 * @returns {JSX.Element}
 */

import React from "react";
import { Link } from "react-router-dom";

function Reservation({ onCancel = ()=>{}, reservation = {} }) {

  function cancelHandler() {
    if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        onCancel(reservation.reservation_id);
    }
  }
  function formatTime(time) {
    let hours = Number(time.split(":")[0]);
    let minutes = Number(time.split(":")[1]);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
  }
  return (
    <>
        <div className="reservation" key={reservation.reservation_id}>
            <div className="group">
              <div className="item-quad">
                <div className="group-col no-gap">
                  <div>
                    <h4 className="inline">
                      {reservation.first_name} {reservation.last_name}{" "}
                    </h4>
                    <p className="inline">Party of {reservation.people}</p>
                  </div>
                  <div>
                    <h5 className="blue inline">
                      {formatTime(reservation.reservation_time)}
                    </h5>
                    <p className="inline">
                      &nbsp; / &nbsp;mobile : {reservation.mobile_number}
                    </p>
                    <p
                      className="inline"
                      data-reservation-id-status={reservation.reservation_id}
                    >
                      &nbsp; / &nbsp;<i>{reservation.status}</i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                {reservation.status === "booked" ? (
                  <div className="group-reverse">
                    <Link
                      className="item button-link"
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      {`Seat`}
                    </Link>
                    <Link
                      className="item button-link"
                      to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      {`Edit`}
                    </Link>
                    <button
                      className="item black"
                      type="button"
                      data-reservation-id-cancel={reservation.reservation_id}
                      onClick={cancelHandler}
                    >
                      {`Cancel`}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
    </>
  );
}

export default Reservation;