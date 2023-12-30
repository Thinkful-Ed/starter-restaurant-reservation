import axios from "axios"
import React, { useState } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import ListReservations from "../dashboard/Components/ListReservations"

export default function Search() {
  const [formData, setFormData] = useState({ mobile_phone: "" })
  const [results, setResults] = useState([])
  const [searchError, setSearchError] = useState(null)

  // HANDLERS
  const handleChange = ({ target }) => {
    setFormData({
      [target.name]: target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/reservations?mobile_phone=${formData.mobile_phone}`
      )
      setResults(response.data.data)
      // console.log("Response", response.data.data, "Results", results)
    } catch (err) {
      if (err.response) {
        setSearchError(err.response.data)
      }
    }
  }

  return (
    <div className="component">
      <h1>Search by Phone Number</h1>
      <hr />
      <div className="form-component m-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-12 col-md-8 col-lg-6">
              <label htmlFor="mobile_phone">Mobile Phone</label>
              <input
                type="tel"
                className="form-control"
                name="mobile_phone"
                placeholder="Enter a customer's phone number"
                onChange={handleChange}
                value={formData.mobile_number}
              />
            </div>
            <div className="col-12 col-md-4 mt-md-2">
              <button type="submit" className="btn btn-outline-secondary mt-4">
                Find
              </button>
            </div>
          </div>
        </form>
        <ErrorAlert error={searchError} />
      </div>
      <ListReservations reservations={results} />
    </div>
  )
}
