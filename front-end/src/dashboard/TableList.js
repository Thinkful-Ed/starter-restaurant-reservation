import React, { Component } from 'react'
// import { DataForTable } from '../Data'
import Swal from 'sweetalert2'
import axios from 'axios'
import { withRouter } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'

class TableList extends Component {
  constructor(props) {
    super(props)

    this.Table_List = process.env.REACT_APP_API_BASE_URL + '/tables'

    this.state = { DataForTable: [], errorFromAPI: '' }
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

  handleFinishReq = (data) => {
    console.log(data);
    Swal.fire({
      title: '"Is this table ready to seat new guests? This cannot be undone.',
      confirmButtonText: `OK`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(this.Table_List +"/"+ data.table_id + '/seat')
          .then((res) => {
            Swal.fire('Deleted!', '', 'success').then(()=>{
              this.UNSAFE_componentWillMount()
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

  handleRoutes = () => {
    this.props.history.goBack()
  }
  render() {
    const { errorFromAPI,DataForTable } = this.state

    return (
      <>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">List of Tables</h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Free/Occupied</th>
            </tr>
          </thead>
          <tbody>
            {DataForTable && DataForTable.map((table) => {
              return (
                <tr key={table.table_id}>
                  <td>{table.table_id}</td>
                  <td>{table.table_name}</td>
                  <td>{table.capacity}</td>
                  <td>
                    <div id={table.table_id} data-table-id-status={'1'}>
                      {(table.reservation_id !== null) ? "Occupied" : "Free"}
                    </div>
                  </td>
                  <td>
                    {(table.reservation_id !== null)? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => this.handleFinishReq(table)}
                      >
                        Finish
                      </button>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button
          type="submit"
          className="btn btn-secondary float-right"
          onClick={() => this.handleRoutes}
        >
          Cancel
        </button>
        {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}
      </>
    )
  }
}
export default withRouter(TableList)
