const request = require("supertest");

const app = require("../src/app");

describe("App", () => {
  describe("not found handler", () => {
    test("returns 404 for non-existent route", async () => {
      const response = await request(app)
        .get("/fastidious")
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Path not found: /fastidious");
    });
  });
});
