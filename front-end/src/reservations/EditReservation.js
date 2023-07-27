import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  let initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorArray, setErrorArray] = useState([]);

  // Sends a get request to API using readReservation and reservation_id as an argument.
  // stores the data returned from API in initialFormData
  // Sets formData to initialFormData
  useEffect(() => {
    const abortController = new AbortController();
    const loadReservation = async () => {
      try {
        let recallReservation = await readReservation(
          reservation_id,
          abortController.signal
        );
        recallReservation.reservation_date =
          recallReservation.reservation_date.split("T")[0];

        initialFormData = {
          first_name: recallReservation.first_name,
          last_name: recallReservation.last_name,
          mobile_number: recallReservation.mobile_number,
          reservation_date: recallReservation.reservation_date,
          reservation_time: recallReservation.reservation_time,
          people: recallReservation.people,
        };
        setFormData(initialFormData);
      } catch (error) {
        setErrorArray([error.message]);
      }
    };

    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  // Sends a put request to API with the new reservation information
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    formData.people = Number(formData.people);
    const putReservation = async () => {
      try {
        await updateReservation(
          formData,
          reservation_id,
          abortController.signal
        );
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setErrorArray([error.message]);
      }
    };

    putReservation();
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      <div>
        <ErrorAlert error={errorArray} />
      </div>
      <div>
        <ReservationForm
          handleChange={handleChange}
          reservation={formData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}