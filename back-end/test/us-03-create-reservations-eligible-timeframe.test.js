const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("US-03 - Create reservations eligible timeframe", () => {
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
    test("returns 400 if reservation_time is not available", async () => {
      const data = {
        first_name: "first",
        last_name: "last",
        mobile_number: "800-555-1212",
        reservation_date: "2050-01-05",
        reservation_time: "09:30",
        people: 3,
      };

      let response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).toBe(400);

      data.reservation_time = "23:30";
      response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).toBe(400);

      data.reservation_time = "22:45";
      response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).toBe(400);

      data.reservation_time = "05:30";
      response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).toBe(400);
    });
  });
});
