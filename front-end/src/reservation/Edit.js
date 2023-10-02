import React, {useEffect, useState} from "react";
//read the reservation by id
import {useParams, useHistory} from "react-router-dom";
import {
  readReservation,
  updateReservation,
  cancelReservation,
} from "../utils/api";
import Form from "./Form";

export default function Edit({setLoadTrigger, setDate}) {
  const history = useHistory();
  const {reservation_id} = useParams();
  const [reservation, setReservation] = useState({});
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(console.log);
    return () => abortController.abort();
  }, [reservation_id]);

  const submitHandler = (data) => {
    const abortController = new AbortController();
    updateReservation(data, reservation_id, abortController.signal)
      .then(() => {
        setLoadTrigger((prev) => prev + 1);
        //setDate(() => data.reservation_date);
        history.push(`/dashboard?date=${data.reservation_date}`);
      })
      .catch(setFormError);
    return () => abortController.abort();
  };
  function cancelHandler() {
    const cancelConfirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (cancelConfirmed) {
      const abortController = new AbortController();
      cancelReservation(reservation_id, abortController.signal)
        .then(() => {
          setLoadTrigger((prev) => prev + 1);
          history.push(`/dashboard?date=${reservation.reservation_date}`);
          history.goBack();
        })
        .catch(console.log);
      return () => abortController.abort();
    }
  }

  return (
    <>
      {reservation.reservation_id && (
        <Form
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
          formError={formError}
          initialFormData={reservation}
        />
      )}
    </>
  );
}
