import React, { Component } from 'react'
// import { DataForReservation } from '../Data';
import axios from 'axios'
import formatReservationDate from '../utils/format-reservation-date'

export default class TableComp extends Component {
  constructor(props) {
    super(props)
    this.Reservation_status =
      process.env.REACT_APP_API_BASE_URL + '/reservations'
    this.state = {
      DataForReservation: []
    }
  }

  componentWillMount() {
    axios
      .get(this.Reservation_status)
      .then((res) => {
        let resFromFun=formatReservationDate(res.data.data)
        this.setState({
          DataForReservation: resFromFun,
        })
      })
      .catch((err) => {
        this.setState({ errorFromAPI: err })
      })
  }
  render() {
    const { DataForReservation } = this.state
    return (
      <>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Reservation Date</th>
              <th scope="col">Reservation Time</th>
              <th scope="col"># of Peoples</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {DataForReservation && DataForReservation.map((data) => {
              return (
                <tr key={data.reservation_id}>
                  <td>{data.reservation_id}</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.mobile_number}</td>
                  <td>{data.reservation_date}</td>
                  <td>{data.reservation_time}</td>
                  <td>{data.people}</td>
                  <td>{data.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}
