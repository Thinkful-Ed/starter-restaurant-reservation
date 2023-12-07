/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}

export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { signal }, {});
}

export async function listReservationsByDate(date, signal) {
  const url = `${API_BASE_URL}/reservations?date=${date}`;
  return await fetchJson(url, { signal }, []);
}

export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url, { signal }, []);
}

export async function listAvailableTables(signal) {
  const url = `${API_BASE_URL}/tables?free=true`;
  return await fetchJson(url, { signal }, []);
}

export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, table);
}

export async function updateTable(updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${updatedTable.table_id}/seat`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: updatedTable}),
    signal,
  };
  return await fetchJson(url, options);
}

export async function deleteReservationIdFromTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = { method: "DELETE", signal };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting reservation:", error.message);
    throw error;
  }
}

// export async function deleteReservationIdFromTable(table_id, reservation_id) {
//   const url = `${API_BASE_URL}/tables/${table_id}/seat`;
//   const options = {
//     method: "DELETE",
//     headers,
//   };
//   return await fetchJson(url, options, {});
// }

export async function listReservationsByMobileNumber(mobile_number, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`;
  return await fetchJson(url, { signal }, []);
}

export async function cancelReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: {status: "cancelled"}}),
    signal,
  };
  return await fetchJson(url, options);
}

export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.reservation_id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: updatedReservation}),
    signal,
  };
  return await fetchJson(url, options);
}