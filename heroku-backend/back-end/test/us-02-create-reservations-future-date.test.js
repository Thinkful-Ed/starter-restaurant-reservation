const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("US-02 - Create reservations future date", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  describe("POST /reservations", () => {
    test("returns 400 if reservation occurs in the past", async () => {
      const data = {
        first_name: "first",
        last_name: "last",
        mobile_number: "800-555-1212",
        reservation_date: "1999-01-01",
        reservation_time: "17:30",
        people: 3,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("future");
      expect(response.status).toBe(400);
    });
    test("returns 400 if reservation_date falls on a tuesday", async () => {
      const data = {
        first_name: "first",
        last_name: "last",
        mobile_number: "800-555-1212",
        reservation_date: "2030-01-01",
        reservation_time: "17:30",
        people: 3,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("closed");
      expect(response.status).toBe(400);
    });
  });
});
