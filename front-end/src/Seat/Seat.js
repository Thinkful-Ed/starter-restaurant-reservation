import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import ErrorAlert from '../layout/ErrorAlert'

class Seat extends Component {
  constructor(props) {
    super(props)
    this.Table_List = process.env.REACT_APP_API_BASE_URL + '/tables'
    this.state = { DataForTable: [], table_id: 0 }
  }

  UNSAFE_componentWillMount() {
    axios
      .get(this.Table_List)
      .then((res) => {
        this.setState({
          DataForTable: res.data.data,
        })
      })
      .catch((err) => {
        this.setState({ errorFromAPI: err })
      })
  }

  handleSubmit = () => {
    var res = this.props.match.params.reservation_id.split(':')
    let model = {
      reservation_id: res[1],
    }
    let data = { data: {} };
    data.data = model
    axios
      .put(this.Table_List + "/" + this.state.table_id + '/seat', data)
      .then((res) => {
        this.props.history.push(`/dashboard`)
      })
      .catch((err) => {
        let error = {
          message: err.error
        }
        this.setState({ errorFromAPI: error })
      });
    return;
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      table_id: value
    })
  }

  handleRoutes = () => {
    this.props.history.goBack()
  }
  render() {
    const { DataForTable, errorFromAPI} = this.state
    return (
      <>
        <h4 className="text-center">Seat Form</h4>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">Table number</label>
            <select name="table_id" id="table_id" onChange={(e) => this.handleChange(e)}>
              <option value="">Select</option>
              {DataForTable && DataForTable.map((table) => 
              table.reservation_id === null ?
              (
                <option key={table.table_name} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ):null)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => this.handleSubmit(e)}
        >
          Submit
        </button>
        <button
        type="submit"
        className="btn btn-secondary float-right"
        onClick={()=>this.handleRoutes()}
      >
        Cancel
      </button>
      {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}

      </>
    )
  }
}

export default withRouter(Seat)
