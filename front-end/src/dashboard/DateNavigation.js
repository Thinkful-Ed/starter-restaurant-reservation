import React from "react";
import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

export default function DateNavigation({ date }) {
  return (
    <div role="group">
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${previous(date)}`;
        }}
      >
        Previous
      </Link>
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${today()}`;
        }}
      >
        Today
      </Link>
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${next(date)}`;
        }}
      >
        Next
      </Link>
    </div>
  );
}
