import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationsForm from "./ReservationsForm";
import ErrorAlert from "../ErrorAlert";
import { createReservation } from "../../utils/api";

function ReservationCreate() {
  const history = useHistory();

  const [error, setError] = useState(null);

  function submitHandler(reservation) {
    const abrtControl = new AbortController();
    createReservation(reservation, abrtControl.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setError);
    return () => abrtControl.abort();
  }

  function cancelHandler() {
    history.goBack();
  }
  return (
    <main>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationsForm onSubmit={submitHandler} onCancel={cancelHandler} />
    </main>
  );
}

export default ReservationCreate;
