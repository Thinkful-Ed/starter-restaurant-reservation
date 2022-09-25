import React from "react";
import ReservationCard from "./ReservationCard";

export default function ReservationsList({ reservations, searchMode }) {
  if (searchMode) {
    const reservationsList = reservations.map((reservation) => {
      return (
        <ReservationCard
          key={reservation.reservation_id}
          reservation={reservation}
        />
      );
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Time</th>
              <th># of People</th>
              <th>Status</th>
              <th>Seat</th>
              <th>Edit</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>{reservationsList}</tbody>
        </table>
      </div>
    );
  } else {
    const reservationsList = reservations
      .filter((reservation) => {
        return reservation.status !== "finished";
      })
      .map((reservation) => {
        return (
          <ReservationCard
            key={reservation.reservation_id}
            reservation={reservation}
          />
        );
      });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Time</th>
              <th># of People</th>
              <th>Status</th>
              <th>Seat</th>
              <th>Edit</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>{reservationsList}</tbody>
        </table>
      </div>
    );
  }
}
