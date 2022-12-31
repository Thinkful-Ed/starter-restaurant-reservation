import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

// const MOCK_FORM_DATA = {
//   first_name: "James",
//   last_name: "Smith",
//   mobile_number: "800-555-1212",
//   reservation_date: "01012035",
//   reservation_time: "1330",
//   people: "2",
// };

const INITIAL_FORM_DATA = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function NewReservation() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(
        {
          ...formData,
          people: parseInt(formData.people),
        },
        abortController.signal
      );
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationsError(error);
    }
  }

  return (
    <div>
      <h1>NEW RESERVATIONS</h1>
      <ErrorAlert error={reservationsError} />
      <ReservationForm
        reservation={formData}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default NewReservation;
