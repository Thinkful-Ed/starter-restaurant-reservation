import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const DEFAULT_RESERVATION_STATE = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: 1,
};

function NewReservation() {
  const history = useHistory();
  const [reservation, setReservation] = useState(DEFAULT_RESERVATION_STATE);
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation;

  function handleChange({ target: { name, value } }) {
    setReservation({ ...reservation, [name]: value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const body = {
        data: {
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
        },
      };
      await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      history.goBack();
    } catch (error) {
      console.error(error.message);
    }
  };

  function cancel() {
    history.goBack();
  }

  return (
    <div className="conatiner">
      <h4>Make a reservation</h4>
      <Form
        submitHandler={submitHandler}
        reservation={reservation}
        handleChange={handleChange}
        cancel={cancel}
      />
    </div>
    /* Container */
  );
}
export default NewReservation;
