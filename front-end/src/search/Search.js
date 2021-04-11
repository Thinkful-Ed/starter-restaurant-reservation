import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import ReservationList from '../reservation/ReservationList'
class SearchByPhone extends Component {
  constructor(props) {
    super(props)

    this.FindPhoneNumber =
      process.env.REACT_APP_API_BASE_URL + '/reservations/?mobile_phone='

    this.searchByPhoneModel = {
      mobile_number: '',
    }
    this.state = {
      searchByPhoneModel: this.searchByPhoneModel,
      response: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      searchByPhoneModel: {
        ...this.state.searchByPhoneModel,
        [name]: value,
      },
    })
  }

  handleSubmit = () => {
    const { searchByPhoneModel } = this.state

    axios
      .get(this.FindPhoneNumber + searchByPhoneModel.mobile_number)
      .then((res) => {
        this.setState({
          response: res
        })
      })
      .catch((error) => {
        this.setState({
          response: error,
        })
      })
  }
  render() {
    const { searchByPhoneModel, response } = this.state
    return (
      <>
        <h4 className="text-center">Search by Phone</h4>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mobile_number">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              value={searchByPhoneModel.mobile_number}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => this.handleSubmit(e)}
        >
          Find
        </button>
        {response && response.data ? <ReservationList responseFromSearch={response}/> : null}
      </>
    )
  }
}

export default withRouter(SearchByPhone)
