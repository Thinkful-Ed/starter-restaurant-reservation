import { useEffect, useState } from "react";
import ListAllReservations from "../dashboard/ListAllReservations";
import SearchMobileNumber from "./SearchMobileNumber";
import { listReservations } from "../utils/api";
import useQuery from "../utils/useQuery";

function SearchPage() {
  const [reservations, setReservations] = useState([]);
  const [, setReservationsError] = useState(null);
  const query = useQuery();
  const mobileNumParam = query.get("mobile_number");

  function loadSearchPage() {
    const abortController = new AbortController();
    listReservations({ mobile_number: mobileNumParam }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadSearchPage, [mobileNumParam]);

  return (
    <div>
      <SearchMobileNumber />
      {mobileNumParam ? (
        <ListAllReservations
          reservations={reservations}
          loadSearchPage={loadSearchPage}
        />
      ) : null}
    </div>
  );
}

export default SearchPage;
