import { useHistory } from "react-router-dom"
import { previous, next } from "../utils/date-time"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons"

export default function DashboardNav({ date }) {
  const history = useHistory()

  /**
   * Increments or decrements the date and updates history
   * @param isNext
   *  Boolean representing whether to increment or decrement
   */
  const handleChange = (isNext) => {
    history.push(`/dashboard/?date=${isNext ? next(date) : previous(date)}`)
  }
  const handleToday = () => {
    history.push("/dashboard")
  }

  return (
    <div className="d-flex justify-content-center">
      <button
        onClick={() => handleChange(false)}
        className="btn btn-outline-dark m-2"
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button onClick={handleToday} className="btn btn-outline-dark m-2">
        TODAY
      </button>
      <button
        onClick={() => handleChange(true)}
        className="btn btn-outline-dark m-2"
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  )
}
