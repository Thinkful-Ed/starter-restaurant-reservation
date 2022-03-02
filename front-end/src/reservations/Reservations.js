import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { API_BASE_URL } from '../../src/utils/api'

const Reservations = () => {
  const initialFormState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  }

  const [formData, setFormData] = useState({ ...initialFormState })
  const [fetchedData, updateFetchedData] = useState([])
  const { data } = fetchedData

  let api = `${API_BASE_URL}/reservations/new`
  const history = useHistory()

//   useEffect(() => {
//     ;(async function () {
//       let data = await fetch(api).then((res) => res.json())
//       updateFetchedData(data)
//     })()
//   }, [api])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitted:', formData)

//Post data here

    setFormData({ ...initialFormState })
    history.push(`/dashboard?date=${formData.reservation_date}`)
  }

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')

    setFormData({ ...initialFormState })
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        First Name:
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
          //   required
        />
      </label>

      <br />

      <label htmlFor="last_name">
        Last Name:
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
          //   required
        />
      </label>

      <br />

      <label htmlFor="mobile_number">
        mobile_number Number:
        <input
          id="mobile_number"
          type="text"
          name="mobile_number"
          onChange={handleChange}
          value={formData.mobile_number}
          //   required
        />
      </label>

      <br />

      <label htmlFor="reservation_date">
        Date of Reservation:
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
          //   required
        />
      </label>

      <br />

      <label htmlFor="reservation_time">
        Time of Reservation:
        <input
          id="reservation_time"
          type="text"
          name="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
          //   required
        />
      </label>

      <br />

      <label htmlFor="people">
        Number of People:
        <input
          id="people"
          type="text"
          name="people"
          onChange={handleChange}
          value={formData.people}
          //   required
        />
      </label>

      <br />

      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

export default Reservations
