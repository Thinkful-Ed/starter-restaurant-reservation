import React from "react";

function Reservations({ reservations = [] }) {
  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (
        <div className="form-group row" key={reservation.reservation_id}>
          <div className="col-sm-1">{reservation.reservation_id}</div>
          <div className="col-sm-1">{reservation.first_name}, {reservation.last_name}</div>
          <div className="col-sm-1">{reservation.mobile_number}</div>
          <div className="col-sm-1">{reservation.reservation_date}</div>
          <div className="col-sm-1">{reservation.reservation_time}</div>
          <div className="col-sm-1">{reservation.people}</div>
          <div className="col-sm-1"><a  href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a></div>
        </div>
      );
    })
    ) : (
    <div>No results</div>
  );
  return (
      <div className="table">
      {rows}
      </div>
  )
}

export default Reservations;
