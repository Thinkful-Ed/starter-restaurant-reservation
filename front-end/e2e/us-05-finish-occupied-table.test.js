const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const { containsText } = require("./utils");
const { createReservation, createTable } = require("./api");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-05 - Finish an occupied table - E2E", () => {
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
        first_name: "Finish",
        last_name: Date.now().toString(10),
        mobile_number: "555-1313",
        reservation_date: "2035-01-01",
        reservation_time: "13:45",
        people: 4,
      });

      table = await createTable({
        table_name: `#${Date.now().toString(10)}`,
        capacity: 99,
        reservation_id: reservation.reservation_id,
      });

      page = await browser.newPage();
      page.on("console", onPageConsole);
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(`${baseURL}/dashboard?date=2035-01-01`, {
        waitUntil: "networkidle0",
      });
      await page.reload({ waitUntil: "networkidle0" });
    });

    test("clicking finish button and then clicking OK makes that table available", async () => {
      await page.screenshot({
        path: ".screenshots/us-05-dashboard-finish-button-before.png",
        fullPage: true,
      });

      const containsOccupied = await containsText(
        page,
        `[data-table-id-status="${table.table_id}"]`,
        "occupied"
      );

      expect(containsOccupied).toBe(true);

      const finishButtonSelector = `[data-table-id-finish="${table.table_id}"]`;
      await page.waitForSelector(finishButtonSelector);

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          "Is this table ready to seat new guests?"
        );
        await dialog.accept();
      });

      await page.click(finishButtonSelector);

      await page.waitForResponse((response) => {
        return response.url().endsWith(`/tables`);
      });

      await page.screenshot({
        path: ".screenshots/us-05-dashboard-finish-button-after.png",
        fullPage: true,
      });

      const containsFree = await containsText(
        page,
        `[data-table-id-status="${table.table_id}"]`,
        "free"
      );

      expect(containsFree).toBe(true);
    });

    test("clicking finish button and then clicking CANCEL does nothing", async () => {
      await page.screenshot({
        path: ".screenshots/us-05-dashboard-finish-button-cancel-before.png",
        fullPage: true,
      });

      const containsOccupied = await containsText(
        page,
        `[data-table-id-status="${table.table_id}"]`,
        "occupied"
      );

      expect(containsOccupied).toBe(true);

      const finishButtonSelector = `[data-table-id-finish="${table.table_id}"]`;
      await page.waitForSelector(finishButtonSelector);

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          "Is this table ready to seat new guests?"
        );
        await dialog.dismiss();
      });

      await page.click(finishButtonSelector);

      await page.waitForTimeout(1000);

      await page.screenshot({
        path: ".screenshots/us-05-dashboard-finish-button-cancel-after.png",
        fullPage: true,
      });

      const containsFree = await containsText(
        page,
        `[data-table-id-status="${table.table_id}"]`,
        "free"
      );

      expect(containsFree).toBe(false);
    });
  });
});
