const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-03 - Create reservation on a future, working date - E2E", () => {
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

    test("displays an error message if reservation time is before 10:30 AM", async () => {
      await page.type("input[name=reservation_date]", "02022035");
      await page.type("input[name=reservation_time]", "10:15AM");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-too-early-before.png",
      });

      await page.click("button[type=submit]");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-too-early-after.png",
      });

      expect(await page.$(".alert-danger")).toBeTruthy();
    });

    test("displays an error message if reservation time is too close to close time", async () => {
      await page.type("input[name=reservation_date]", "02022035");
      await page.type("input[name=reservation_time]", "1005PM");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-almost-closing-before.png",
      });

      expect(await page.$(".alert-danger")).toBeFalsy();

      await page.click("button[type=submit]");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-almost-closing-after.png",
      });

      expect(await page.$(".alert-danger")).toBeTruthy();
    });

    test("displays an error message if reservation time is after the close time", async () => {
      await page.type("input[name=reservation_date]", "02022035");
      await page.type("input[name=reservation_time]", "1045PM");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-too-late-before.png",
      });

      expect(await page.$(".alert-danger")).toBeFalsy();

      await page.click("button[type=submit]");

      await page.screenshot({
        path: ".screenshots/us-02-reservation-too-late-after.png",
      });

      expect(await page.$(".alert-danger")).toBeTruthy();
    });
  });
});
