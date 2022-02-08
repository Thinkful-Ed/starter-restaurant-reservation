import React, { useState, useEffect } from "react";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm() {
  const [error, setError] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      try {
        if (reservationId) {
          const resResponse = await readReservation(
            reservationId,
            abortController.signal
          );
          setFormData(resResponse);
        } else {
          // if navigating to create route directly from edit route, clear the form
          setFormData({ ...initialFormState })
        }
      } catch (err) {
        setError(err);
      }
    }
    loadReservation();

    return () => abortController.abort();
    // eslint-disable-next-line
  }, [reservationId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleNumberInput = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: Number(e.target.value),
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      if (reservationId) {
        await updateReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
        setFormData({ ...initialFormState });
      } else {
        await createReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
        setFormData({ ...initialFormState });
      }
    } catch (err) {
      setError(err);
    }

    return () => abortController.abort();
  }
  function formatPhoneNumber(value) {
    // if input value is falsy then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  return (
    <div>
      {reservationId ? (
        <h1 className="text-center create-header">Edit Reservation</h1>
      ) : (
        <h1 className="text-center create-header">Create Reservation</h1>
      )}

      <ErrorAlert error={error} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            id="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="tel"
            name="mobile_number"
            className="form-control"
            id="mobile_number"
            placeholder="123-456-7890"
            value={formatPhoneNumber(formData.mobile_number)}
            onChange={handleChange}
            required
          />
          <label htmlFor="reservation_date">
            Date of Reservation (closed on Tuesdays)
          </label>

          <input
            type="date"
            name="reservation_date"
            className="form-control"
            id="reservation_date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />

          <label htmlFor="reservation_time">Time of Reservation</label>
          <input
            type="time"
            name="reservation_time"
            className="form-control"
            id="reservation_time"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
          <label htmlFor="people">Party size</label>
          <input
            type="number"
            name="people"
            className="form-control"
            id="people"
            min={1}
            placeholder="1"
            value={formData.people}
            onChange={handleNumberInput}
            required
          />
        </div>
        <button className="btn btn-danger" onClick={history.goBack}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};
