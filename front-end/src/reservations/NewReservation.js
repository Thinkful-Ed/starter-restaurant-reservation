import React, { useState } from "react";
import ReservationsForm from "./ReservationsForm"
import { createReservation } from "../utils/api";
import { useHistory } from "react-router"

function NewReservation() {
   const history = useHistory()
   const initialState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 1,
   }
   const [formData, setFormData] = useState({ ...initialState })

   const changeHandler = ({ target }) => {
      setFormData({
         ...formData,
         [target.name]: target.value
      })
   }

   async function submitHandler(event) {
      event.preventDefault()
      await createReservation(formData)
      setFormData({ ...initialState })
      history.push("/")
   }


   return (
      <ReservationsForm
         changeHandler={changeHandler}
         submitHandler={submitHandler}
         formData={formData}
      />
   )
}
export default NewReservation