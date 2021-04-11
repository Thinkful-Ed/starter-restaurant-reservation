import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import ErrorAlert from '../layout/ErrorAlert'

class Booktable extends Component {
  constructor(props) {
    super(props)
    this.Table_Booking = process.env.REACT_APP_API_BASE_URL + '/tables'
    this.tableBookingModel = {
      table_name: '',
      capacity: '',
    }
    this.state = {
      tableBookingModel: this.tableBookingModel,
      errorFromAPI: "",
    }

    this.bookTable = this.bookTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      tableBookingModel: {
        ...this.state.tableBookingModel,
        [name]: value,
      },
    })
  }

  bookTable(event) {
    event.preventDefault()
    const { tableBookingModel } = this.state
    let data = {data :{}};
    tableBookingModel.capacity = parseInt(tableBookingModel.capacity, 10)              // convert people from str to number 
    data.data =tableBookingModel
    axios
      .post(this.Table_Booking, data)
      .then((res) => {
        this.setState(
          {
            tableBookingModel: res.data,
          },
          () => {
            this.props.history.push(`/dashboard`, { from: '/tables/new' })
          },
        )
      })
      .catch((error) => {
        this.setState({ errorFromAPI: error })
      })
  }

  handleCancel = () => {
    this.props.history.goBack()
  }
  render() {
    const { tableBookingModel, errorFromAPI } = this.state

    return (
      <>
        <h4 className="text-center">Book Table</h4>
        <hr />
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="table_name">Table Name</label>
              <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                value={tableBookingModel.table_name}
                onChange={this.handleChange}
                required
                minLength="2"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="text"
                className="form-control"
                id="capacity"
                name="capacity"
                value={tableBookingModel.capacity}
                onChange={this.handleChange}
                required
                minLength="1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.bookTable}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-secondary ml-1"
            onClick={() => {
              this.handleCancel()
            }}
          >
            Cancel
          </button>
        </form>
        {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}
      </>
    )
  }
}

export default withRouter(Booktable)
