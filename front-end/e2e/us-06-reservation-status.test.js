const puppeteer = require("puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");
const fs = require("fs");
const fsPromises = fs.promises;

const { containsText } = require("./utils");
const { createReservation, createTable, seatReservation } = require("./api");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-06 - Reservation status - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/dashboard page", () => {
    let reservation;
    let table;

    beforeEach(async () => {
      reservation = await createReservation({
        first_name: "Status",
        last_name: Date.now().toString(10),
        mobile_number: "800-555-1313",
        reservation_date: "2035-01-01",
        reservation_time: "13:45",
        people: 4,
      });

      table = await createTable({
        table_name: `#${Date.now().toString(10)}`,
        capacity: 99,
      });

      page = await browser.newPage();
      page.on("console", onPageConsole);
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(`${baseURL}/dashboard?date=2035-01-01`, {
        waitUntil: "networkidle0",
      });
      await page.reload({ waitUntil: "networkidle0" });
    });

    test("/dashboard displays status", async () => {
      await page.screenshot({
        path: ".screenshots/us-06-dashboard-displays-status.png",
        fullPage: true,
      });

      const containsBooked = await containsText(
        page,
        `[data-reservation-id-status="${reservation.reservation_id}"]`,
        "booked"
      );

      expect(containsBooked).toBe(true);
    });

    test("Seating the reservation changes status to 'seated' and hides Seat button", async () => {
      await page.screenshot({
        path: ".screenshots/us-06-seated-before.png",
        fullPage: true,
      });

      await seatReservation(reservation.reservation_id, table.table_id);

      await page.reload({ waitUntil: "networkidle0" });

      await page.screenshot({
        path: ".screenshots/us-06-seated-after.png",
        fullPage: true,
      });

      const containsSeated = await containsText(
        page,
        `[data-reservation-id-status="${reservation.reservation_id}"]`,
        "seated"
      );

      expect(containsSeated).toBe(true);
      expect(
        await page.$(
          `[href="/reservations/${reservation.reservation_id}/seat"]`
        )
      ).toBeNull();
    });

    test("Finishing the table removes the reservation from the list", async () => {
      await seatReservation(reservation.reservation_id, table.table_id);

      await page.reload({ waitUntil: "networkidle0" });

      await page.screenshot({
        path: ".screenshots/us-06-finish-before.png",
        fullPage: true,
      });

      const finishButtonSelector = `[data-table-id-finish="${table.table_id}"]`;
      await page.waitForSelector(finishButtonSelector);

      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.click(finishButtonSelector);

      await page.waitForResponse((response) => {
        return response.url().endsWith(`/tables`);
      });

      await page.screenshot({
        path: ".screenshots/us-06-finish-after.png",
        fullPage: true,
      });

      expect(
        await page.$(
          `[data-reservation-id-status="${reservation.reservation_id}"]`
        )
      ).toBeNull();
    });
  });
});
