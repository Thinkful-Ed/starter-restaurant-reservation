import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import ErrorAlert from '../layout/ErrorAlert'
import formatReservationDate from '../utils/format-reservation-date'
class ReservationList extends Component {
  constructor(props) {
    super(props)

    this.Reservation_status =
      process.env.REACT_APP_API_BASE_URL + '/reservations'
    this.state = {
      DataForReservation: this.props.responseFromSearch?this.props.responseFromSearch.data.data:[],
      errorFromAPI: ''
    }
  }
  handleSeatLinkClick = (event, data, to) => {
    event.preventDefault();
    this.props.history.push('/reservations/:' + data.reservation_id + '/seat')
  }

  handleEditClick = (event, data, to) => {
    event.preventDefault()
    this.props.history.push('/reservations/:' + data.reservation_id + '/edit')
  }

  handleCancelButton = (event, data) => {
    event.preventDefault()
    Swal.fire({
      title: '"Do you want to cancel this reservation? This cannot be undone.',
      confirmButtonText: `OK`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let model = {
          status: 'cancelled',
        }
        let data1 = { data: {} };
        data1.data = model
        axios
          .put(this.Reservation_status + "/" + data.reservation_id + '/status', data1)
          .then((res) => {
            Swal.fire('Updated!', '', 'success').then(() => {
              this.componentDidMount()
            })
          })
          .catch((err) => {
            this.setState({ errorFromAPI: err })
          })
      } else if (result.isDenied) {
        return
      }
    })
  }

    componentDidMount() {
      axios
        .get(this.Reservation_status)
        .then((res) => {
          let resFromFun = formatReservationDate(res.data.data)
          this.setState({
            DataForReservation: resFromFun,
          })
        })
        .catch((err) => {
          this.setState({ errorFromAPI: err })
        })
    

  }
  render() {
    const { errorFromAPI, DataForReservation } = this.state
    return (
      <>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">List of Reservation</h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>reservation_id</th>
              <th>Seat</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {DataForReservation && DataForReservation.map((table) => {
              return (
                <tr key={table.reservation_id}>
                  <td>{table.reservation_id}</td>
                  <td>{table.reservation_id}</td>
                  <td>
                    <a
                      href={'/reservations/:' + table.reservation_id + '/seat'}
                      onClick={(event) =>
                        this.handleSeatLinkClick(event, table)
                      }
                    >
                      Seat
                    </a>
                  </td>
                  {table.status === 'booked' ? (
                    <td>
                      <a
                        href={
                          '/reservations/:' + table.reservation_id + '/edit'
                        }
                        onClick={(event) => this.handleEditClick(event, table)}
                      >
                        Edit
                      </a>
                    </td>
                  ) : (
                    <td>{table.status}</td>
                  )}
                  {table.status === "seated" || table.status === "cancelled" ? (
                    <td></td>
                  ) : (<td>
                    <a
                      href={'/reservations/:' + table.reservation_id + '/cacel'}
                      onClick={(event) => this.handleCancelButton(event, table)}
                      data-reservation-id-cancel={table.reservation_id}
                    >
                      Cancel
                    </a>
                  </td>)}

                </tr>
              )
            })}
          </tbody>
        </table>
        {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}
      </>
    )
  }
}

export default withRouter(ReservationList)
