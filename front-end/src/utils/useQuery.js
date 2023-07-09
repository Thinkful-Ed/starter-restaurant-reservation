/**
 * useQuery is a custom hook that makes use of the useLocation and the URL class to parse the query parameters.
 *
 *
 *     const query = useQuery();
 *     const date = query.get("date")
 *
 * @format
 * @example
 */

import { useLocation } from "react-router-dom";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default useQuery;
