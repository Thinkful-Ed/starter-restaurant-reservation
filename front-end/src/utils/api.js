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

  console.log(url.search);
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function readReservation(id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${id}`);
  return await fetchJson(url, { headers, signal }, []);
}

export async function createReservation(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  console.log(params);
  const data = {
    ...params,
    ["people"]: Number(params.people),
    // status: "booked",
  };

  return await fetchJson(
    url,
    { headers, signal, method: "POST", body: JSON.stringify({ data }) },
    []
  );
}

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

export async function createTable(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const data = { ...params, ["capacity"]: Number(params.capacity) };

  return await fetchJson(
    url,
    { headers, signal, method: "POST", body: JSON.stringify({ data }) },
    []
  );
}

export async function updateTable(reservation_id, table_id, signal) {
  const tableUrl = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const reservationUrl = new URL(
    `${API_BASE_URL}/reservations/${reservation_id}/status`
  );

  const promises = [
    fetchJson(
      tableUrl,
      {
        headers,
        signal,
        method: "PUT",
        body: JSON.stringify({
          data: {
            reservation_id,
          },
        }),
      },
      []
    ),
    fetchJson(
      reservationUrl,
      {
        headers,
        signal,
        method: "PUT",
        body: JSON.stringify({
          data: {
            status: "seated",
          },
        }),
      },
      []
    ),
  ];

  return await Promise.all(promises);

  // return await fetchJson(
  //   tableUrl,
  //   {
  //     headers,
  //     signal,
  //     method: "PUT",
  //     body: JSON.stringify({
  //       data: {
  //         reservation_id,
  //       },
  //     }),
  //   },
  //   []
  // );
}

export async function unseatTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);

  return await fetchJson(
    url,
    {
      headers,
      signal,
      method: "DELETE",
      body: JSON.stringify({ data: { table_id } }),
    },
    []
  );
}
