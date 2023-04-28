const puppeteer = require("puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-02 - Create reservation on a future, working date - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
  });

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}/reservations/new`, { waitUntil: "load" });
  });

  afterEach(async () => {
    await browser.close();
  });

  describe("/reservations/new page", () => {
    beforeEach(async () => {
      await page.type("input[name=first_name]", "John");
      await page.type("input[name=last_name]", "Doe");
      await page.type("input[name=mobile_number]", "1234567890");
      await page.type("input[name=people]", "3");
    });

    test("displays an error message if the date of the reservation occurs in the past", async () => {
      await page.type("input[name=reservation_date]", "12242020");
      await page.type("input[name=reservation_time]", "05:30PM");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-is-future-before.png",
      });

      await page.click("button[type=submit]");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-is-future-after.png",
      });

      const alerts = await page.$$(".alert-danger");
      expect(alerts.length).toBeGreaterThan(0);
    });

    test("displays an error message if reservation date falls on a Tuesday", async () => {
      await page.type("input[name=reservation_date]", "02062035");
      await page.type("input[name=reservation_time]", "05:30PM");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-is-working-day-before.png",
      });

      await page.click("button[type=submit]");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-is-working-day-after.png",
      });

      const alerts = await page.$$(".alert-danger");
      expect(alerts.length).toBeGreaterThan(0);
    });
  });
});
