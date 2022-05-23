import React, { useEffect, useState } from "react";
import {
  postReservation,
  updateReservation,
  readReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

function Form() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();
  const { path } = useRouteMatch();
  const { reservationId } = useParams();
  const editting = path.includes("edit");

  useEffect(() => {
    if (editting) {
      async function readRes() {
        const abortController = new AbortController();
        try {
          const reservationData = await readReservation(
            reservationId,
            abortController.signal
          );
          if (reservationData.error) {
            throw reservationData.error;
          }
          setForm(reservationData);
        } catch (err) {
          setError(err);
        }
        return () => abortController.abort();
      }
      return readRes();
    }
  }, [editting, reservationId]);

  async function submitHandle(event) {
    event.preventDefault();
    try {
      const abortController = new AbortController()
      form.people = parseInt(form.people);
      let newPost = null;
      if (editting) {
        newPost = await updateReservation(form, abortController.signal);
      } else {
        newPost = await postReservation(form, abortController.signal);
      }
      if (newPost.error) {
        throw newPost.error;
      }
      history.push(`/dashboard?date=${form.reservation_date}`);
    } catch (err) {
      setError(err);
    }
  }

  function cancelHandle() {
    history.goBack();
  }

  function changeHandle(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <form
        onSubmit={submitHandle}
        className="d-flex flex-column col-6 text-center m-auto font-weight-bolder"
      >
        <ErrorAlert error={error} />
        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="first_name">First Name</label>
          </div>
          <input
            className="w-100 text-center"
            type="text"
            name="first_name"
            id="firstName"
            onChange={changeHandle}
            value={form?.first_name}
          />
        </div>

        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="last_name">Last Name</label>
          </div>
          <input
            className="w-100 text-center"
            type="text"
            name="last_name"
            id="lastName"
            onChange={changeHandle}
            value={form?.last_name}
          />
        </div>

        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="mobile_number">Mobile Number</label>
          </div>
          <input
            className="w-100 text-center"
            type="tel"
            id="mobile_number"
            name="mobile_number"
            onChange={changeHandle}
            value={form?.mobile_number}
          />
        </div>

        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="reservation_date">Reservation Date</label>
          </div>
          <input
            className="w-100 text-center"
            type="date"
            name="reservation_date"
            id="reservationDate"
            onChange={changeHandle}
            value={form?.reservation_date}
          />
        </div>

        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="reservation_time">Reservation Time</label>
          </div>
          <input
            className="w-100 text-center"
            type="time"
            name="reservation_time"
            id="reservationTime"
            onChange={changeHandle}
            value={form?.reservation_time}
          />
        </div>

        <div className="my-4">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="people">Number of People</label>
          </div>
          <input
            className="w-100 text-center"
            type="number"
            name="people"
            id="people"
            onChange={changeHandle}
            value={form?.people}
          />
        </div>
        <div className="btn-group border border-dark rounded-lg">
          <button type="submit" className="btn btn-success">Submit</button>
          <button type="button" onClick={cancelHandle} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
