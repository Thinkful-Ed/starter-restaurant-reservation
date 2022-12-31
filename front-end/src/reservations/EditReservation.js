import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { useParams } from "react-router-dom";
import { getReservationById } from "../utils/api";

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

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  useEffect(() => {
    async function loadReservationData() {
      console.log("reservation_id--------------------", reservation_id);
      const abortController = new AbortController();
      setReservationsError(null);
      try {
        const response = await getReservationById(
          reservation_id,
          abortController.signal
        );
        setFormData({
          first_name: response.first_name,
          last_name: response.last_name,
          mobile_number: response.mobile_number,
          reservation_date: response.reservation_date,
          reservation_time: response.reservation_time,
          people: response.people,
        });
      } catch (error) {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
    loadReservationData();
  }, [reservation_id]);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation(
        {
          ...formData,
          people: parseInt(formData.people),
        },
        reservation_id,
        abortController.signal
      );
      history.goBack();
    } catch (error) {
      setReservationsError(error);
    }
  }

  return (
    <div>
      <h1>EDIT RESERVATION</h1>
      <ErrorAlert error={reservationsError} />
      <ReservationForm
        reservation={formData}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default EditReservation;
