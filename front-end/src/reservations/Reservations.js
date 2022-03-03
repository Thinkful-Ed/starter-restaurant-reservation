import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { API_BASE_URL } from '../../src/utils/api'

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
  // const [fetchedData, updateFetchedData] = useState([])
  // const { data } = fetchedData

  // let api = `${API_BASE_URL}/reservations`
  const history = useHistory()
  let DateError = null

  // useEffect(() => {
  //   ;(async function () {
  //     let data = await fetch(api).then((res) => res.json())
  //     updateFetchedData(data)
  //   })()
  // }, [api])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitted:', formData)

    dateValidation()
    //Must be in the future.Cannot be scheduled on a Tuesday.
    if (!DateError) {
      //Post data here

      setFormData({ ...initialFormState })
      history.push(`/dashboard?date=${formData.reservation_date}`)
    }
  }

  const dateValidation = async () => {
    let date = formData.reservation_date + 'T' + formData.reservation_time

    const d = new Date(date)
    const currentDate = new Date().getTime()

    if (d.getDay() === 2 && d.getTime() <= currentDate) {
      DateError = 'Invalid (tuesday & past)'
      console.log(DateError)
    } else if (d.getTime() <= currentDate) {
      DateError = 'Invalid(past)'
      console.log(DateError)
    } else if (d.getDay() === 2 && !d.getTime() <= currentDate) {
      DateError = 'Invalid(tuesday)'
      console.log(DateError)
      return (
        <div className="alert alert-danger">
          Please fix...
          <ul>
            <li>Cannot be scheduled on a Tuesday.</li>
          </ul>
        </div>
      )
    }
  }

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')
    setFormData({ ...initialFormState })
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-4">
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
          </div>
          <div className="col-4">
            <label htmlFor="mobile_number">
              Phone Number:
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
          </div>
          <div className="col-4">
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
          </div>
        </div>
        <div className="row">
          <div className="col-4">
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
          </div>
          <div className="col-4">
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
          </div>
          <div className="col-4">
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
          </div>
        </div>
      </div>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Reservations
