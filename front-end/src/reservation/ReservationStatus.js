import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import ErrorAlert from '../layout/ErrorAlert'
class ReservationStatus extends Component {
    constructor(props) {
        super(props)

        this.Reservation_status =
            process.env.REACT_APP_API_BASE_URL + '/reservations'
        this.state = { DataForReservation: [], errorFromAPI: '' }
    }
    UNSAFE_componentWillMount() {

        axios
            .get(this.Reservation_status)
            .then((res) => {
                this.setState({
                    DataForReservation: res.data.data,
                })
            })
            .catch((err) => {
                this.setState({ errorFromAPI: err })
            })
    }

    handleSeatBtn = (data) => {
        let model = {
          status: 'seated',
        }
        let data1 = { data: {} };
        data1.data = model
        axios
          .put(
            this.Reservation_status +"/"+data.reservation_id+"/status",
            data1,
          )
          .then((res) => {
            Swal.fire('Updated!', '', 'success').then(()=>{
                this.UNSAFE_componentWillMount()
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Reservation ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataForReservation.map((reservation) => {
                            return (
                                <tr key={reservation.reservation_id}>
                                    <td>{reservation.reservation_id}</td>
                                    <td>{reservation.reservation_id}</td>

                                    <td>
                                        {reservation.status === 'booked' ? (
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                data-reservation-id-status={reservation.reservation_id}
                                                onClick={() => this.handleSeatBtn(reservation)}
                                            >
                                                Seat
                                            </button>
                                        ) : (
                                            reservation.status
                                        )}
                                    </td>
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

export default withRouter(ReservationStatus)
