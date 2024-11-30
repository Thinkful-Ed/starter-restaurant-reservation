const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-01 - Create and list reservations - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 5000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}/reservations/new`, { waitUntil: "load" });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/reservations/new page", () => {
    test("filling and submitting form creates a new reservation and then displays the dashboard for the reservation date", async () => {
      console.log("point1");
      const lastName =  Date.now().toString(10);
      
      await page.type("input[name=first_name]", "James");
      await page.type("input[name=last_name]", lastName);
      await page.type("input[name=mobile_number]", "800-555-1212");
      await page.type("input[name=reservation_date]", "01012035");
      await page.type("input[name=reservation_time]", "1330");
      await page.type("input[name=people]", "2");
      console.log("point2");
      
      await page.screenshot({
        path: ".screenshots/us-01-submit-before.png",
        fullPage: true,
      });
      
      console.log("point3");

      await Promise.all([
        page.click("[type=submit]"),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      
      console.log("point4");

      await page.screenshot({
        path: ".screenshots/us-01-submit-after.png",
        fullPage: true,
      });
      
      console.log("point5");

      await expect(page).toMatch(lastName);
    });
    console.log("point6");

    test("canceling form returns to previous page", async () => {      
      console.log("canceling - point1");

      await page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle0" });
      await page.goto(`${baseURL}/reservations/new`, {
        waitUntil: "networkidle0",
      });
      console.log("canceling - point2");

      const [cancelButton] = await page.$x(
        "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'cancel')]"
      );
      console.log("canceling - point3");

      if (!cancelButton) {
        throw new Error("button containing cancel not found.");
      }
      console.log("canceling - point4");

      await page.screenshot({
        path: ".screenshots/us-01-cancel-before.png",
        fullPage: true,
      });
      console.log("canceling - point5");

      await Promise.all([
        cancelButton.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      console.log("canceling - point6");

      await page.screenshot({
        path: ".screenshots/us-01-cancel-after.png",
        fullPage: true,
      });
      console.log("canceling - point7");

      expect(page.url()).toContain("/dashboard");
      console.log("canceling - point8");

    });
  });
});
