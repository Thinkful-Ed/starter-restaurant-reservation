import { useHistory } from "react-router-dom"
import { formatAsDate } from "../utils/date-time"

export default function DashboardNav({ date }) {
  const history = useHistory()

  /**
   * Increments or decrements the date and updates history
   * @param isNext
   *  Boolean representing whether to increment or decrement
   */
  function handleChange(isNext) {
    const d = new Date(date)
    if (isNext) {
      d.setDate(d.getDate() + 1)
    } else {
      d.setDate(d.getDate() - 1)
    }
    const result = formatAsDate(d.toISOString())
    history.push(`/dashboard/?date=${result}`)
  }
  const handleToday = () => {
    history.push("/dashboard")
  }

  return (
    <div>
      <button
        onClick={() => handleChange(false)}
        className="btn btn-outline-primary"
      >
        Prev
      </button>
      <button onClick={handleToday} className="btn btn-outline-primary">
        Today
      </button>
      <button
        onClick={() => handleChange(true)}
        className="btn btn-outline-primary"
      >
        Next
      </button>
    </div>
  )
}
