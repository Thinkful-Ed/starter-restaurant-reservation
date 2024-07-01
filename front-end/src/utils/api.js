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
    console.log("Fetch response:", response); // Log response
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
    url.searchParams.append(key, value.toString()));
  console.log("listReservations - url: ", url );
  return await fetchJson(url, { headers, signal }, [])
  .then(formatReservationDate)
  .then(formatReservationTime);
}


export async function createReservation(reservation, signal) {
  console.log("api- createReservation: ", reservation)
   const url = new URL (`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
console.log("api - createReservation - url: ", url, "options: ", options)
return await fetchJson(url, options, reservation);
}

export async function updateReservation(reservation, signal) {
  console.log("api - updateReservation: ", reservation)
  const url = new URL (`${API_BASE_URL}/reservations/${reservation.reservation_id}`);
  // Object.entries(params).forEach(([key, value]) => 
  //   url.searchParams.append(key, value.toString()));
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
console.log("api - updateReservation - url: ", url, "options: ", options)
return await fetchJson(url, options, reservation);
}


export async function listTables(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  // Object.entries(params).forEach(([key, value]) => 
    // url.searchParams.append(key, value.toString()));
  // console.log("listTables - url: ", url );
  return await fetchJson(url, { headers, signal }, []);
 
}


// export async function updateTable(table_id, data, signal) {
  export async function updateTable(data, signal) { 
const url = new URL(`${API_BASE_URL}/tables`);
  // Object.entries(params).forEach(([key, value]) => 
  //   url.searchParams.append(key, value.toString()));
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}


export async function createTable(table, signal) {
  console.log("Table Creation - table: ", table);
   const url = new URL (`${API_BASE_URL}/tables/new`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
console.log("Table Creation - url: ", url, "options: ", options)
return await fetchJson(url, options, table);
}



export async function seatReservation(tableId, reservationId,signal) {
  console.log("Table Assignement - tableId : ", tableId);
  const url = new URL (`${API_BASE_URL}/tables/${tableId}/seat`);
 const options = {
   method: "PUT",
   headers,
   body: JSON.stringify({ data: { reservation_id:reservationId } }),
   signal,
 };
console.log("Table Assigment - url: ", url, "options: ", options)
return await fetchJson(url, options, tableId);
}