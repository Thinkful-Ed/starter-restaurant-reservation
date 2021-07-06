import useQuery from "../utils/useQuery";
import dayjs from "dayjs";

import Reservations from "./Reservations";
import Tables from "./Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  const date = query.get("date") || dayjs().format("YYYY-MM-DD");

  return (
    <main>
      <h1>Dashboard</h1>
      <Reservations date={date} />
      <Tables />
    </main>
  );
}

export default Dashboard;
