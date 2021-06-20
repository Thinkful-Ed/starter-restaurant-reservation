import { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import Form from "./Form";
import ErrorAlert from "../layout/ErrorAlert";

const DEFAULT_RESERVATION_STATE = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: 1,
};

function CreateReservation(params) {
  const history = useHistory();
  const [formData, setFormData] = useState(DEFAULT_RESERVATION_STATE);
  const [error, setError] = useState(null);

  function handleChange({ target: { name, value } }) {
    if (name === "people") {
      value = Number(value);
    }
    setFormData({ ...formData, [name]: value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createReservation(formData, abortController.signal)
      .then(() => {
        history.push(`/dashboard/?date=${formData.reservation_date}`);
      })
      .catch(setError);
    return () => abortController.abort();
  };

  function cancel() {
    history.goBack();
  }

  return (
    <div className="conatiner">
      <h4>Make a reservation</h4>
      <ErrorAlert error={error} />
      <Form
        submitHandler={submitHandler}
        reservation={formData}
        handleChange={handleChange}
        cancel={cancel}
      />
    </div>
  );
}
export default CreateReservation;
