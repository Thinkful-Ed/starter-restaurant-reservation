import React from "react";
import {
  getBadgeVariantReservation,
  formatPhoneNumber,
} from "../utils/helpers";
import CancelReservation from "./CancelReservation";

function ReservationList({ reservations, loadDashboard }) {
  let reservationsMap;

  // const reservationCards = () => {

  // };
  reservationsMap = reservations.map((reservation) => (
    <div
      key={reservation.reservation_id}
      className="card m-2 rounded-4 border border-0 shadow"
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center text-capitalize mb-1">
          <h5 className="card-title fw-semibold fs-5 me-3">
            {reservation.first_name} {reservation.last_name}
          </h5>
          <span
            className={`badge d-flex align-items-center rounded-pill ${getBadgeVariantReservation(
              reservation.status
            )}`}
            data-reservation-id-status={reservation.reservation_id}
          >
            {reservation.status}
          </span>
        </div>
        {/* phone number */}
        <div className="d-flex align-items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            class="bi bi-telephone me-2"
            viewBox="0 0 16 16"
          >
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
          </svg>
          <p className="card-text">
            {formatPhoneNumber(reservation.mobile_number)}
          </p>
        </div>
        {/* time */}
        <div className="d-flex align-items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-clock me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
          </svg>
          <p className="card-text">{reservation.reservation_time}</p>
        </div>
        {/* party */}
        <div className="d-flex align-items-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-people me-2"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
          <p className="card-text">Party of {reservation.people}</p>
        </div>

        <div className="row justify-content-between dashboard-buttons mx-1">
          {reservation.status === "booked" && (
            <a
              href={`/reservations/${reservation.reservation_id}/seat`}
              type="button"
              className="col btn btn-outline-info btn-sm m-1"
            >
              Seat
            </a>
          )}
          <a
            href={`/reservations/${reservation.reservation_id}/edit`}
            type="button"
            className=" col btn btn-outline-secondary btn-sm m-1"
          >
            Edit
          </a>
          {reservation.status !== "cancelled" && (
            <CancelReservation
              reservation_id={reservation.reservation_id}
              loadDashboard={loadDashboard}
            />
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
      <div
        className="card new-res-card m-2 rounded-4 dotted-border bg-transparent"
        style={{ width: "18rem" }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <div className="mb-2">
            <a
              href="/reservations/new"
              type="button"
              className="btn add-new-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.5.5 0 0 0-.5.5v3H4a.5.5 0 0 0 0 1h3.5v3a.5.5 0 0 0 1 0v-3H12a.5.5 0 0 0 0-1H8.5v-3A.5.5 0 0 0 8 4z" />
              </svg>
            </a>
          </div>
          <p className="card-text text-center">Add a New Reservation</p>
        </div>
      </div>
      {reservationsMap}
    </div>
  );
}

export default ReservationList;
