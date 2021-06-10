const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("US-04 - Seat reservation", () => {
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

  describe("Create and list tables", () => {
    describe("GET /tables/:table_id", () => {
      test("returns 404 for non-existent id", async () => {
        const response = await request(app)
          .get("/tables/99999")
          .set("Accept", "application/json");

        expect(response.body.error).toContain("99999");
        expect(response.status).toBe(404);
      });
    });

    describe("POST /tables", () => {
      test("returns 400 if data is missing", async () => {
        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ datum: {} });

        expect(response.body.error).toBeDefined();
        expect(response.status).toBe(400);
      });

      test("returns 400 if table_name is missing", async () => {
        const data = {
          capacity: 1,
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("table_name");
        expect(response.status).toBe(400);
      });

      test("returns 400 if table_name is empty", async () => {
        const data = {
          table_name: "",
          capacity: 1,
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("table_name");
        expect(response.status).toBe(400);
      });

      test("returns 400 if table_name is one character", async () => {
        const data = {
          table_name: "A",
          capacity: 1,
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("table_name");
        expect(response.status).toBe(400);
      });

      test("returns 400 if capacity is missing", async () => {
        const data = {
          table_name: "table name",
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("capacity");
        expect(response.status).toBe(400);
      });

      test("returns 400 if capacity is zero", async () => {
        const data = {
          table_name: "table name",
          capacity: 0,
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("capacity");
        expect(response.status).toBe(400);
      });

      test("returns 400 if capacity is not a number", async () => {
        const data = {
          table_name: "table name",
          capacity: "2",
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("capacity");
        expect(response.status).toBe(400);
      });

      test("returns 201 if table is created", async () => {
        const data = {
          table_name: "table-name",
          capacity: 1,
        };

        const response = await request(app)
          .post("/tables")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toBeUndefined();
        expect(response.body.data).toEqual(expect.objectContaining(data));
        expect(response.status).toBe(201);
      });
    });

    describe("GET /tables", () => {
      test("returns all tables sorted by table name", async () => {
        const response = await request(app)
          .get("/tables")
          .set("Accept", "application/json");

        expect(response.body.error).toBeUndefined();
        expect(response.body.data).toHaveLength(4);
        expect(response.body.data[0].table_name).toBe("#1");
        expect(response.body.data[1].table_name).toBe("#2");
        expect(response.body.data[2].table_name).toBe("Bar #1");
        expect(response.body.data[3].table_name).toBe("Bar #2");
        expect(response.status).toBe(200);
      });
    });
  });

  describe("Read reservation", () => {
    describe("GET /reservations/:reservation_Id", () => {
      test("returns 200 for an existing id", async () => {
        const response = await request(app)
          .get("/reservations/1")
          .set("Accept", "application/json");

        expect(response.body.error).toBeUndefined();
        expect(response.body.data.reservation_id).toBe(1);
        expect(response.status).toBe(200);
      });
    });
  });

  describe("Seat reservation", () => {
    let barTableOne;
    let tableOne;

    beforeEach(async () => {
      barTableOne = await knex("tables").where("table_name", "Bar #1").first();
      tableOne = await knex("tables").where("table_name", "#1").first();
    });

    describe("PUT /tables/:table_id/seat", () => {
      test("returns 400 if data is missing", async () => {
        expect(tableOne).not.toBeUndefined();

        const response = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ datum: {} });

        expect(response.body.error).toBeDefined();
        expect(response.status).toBe(400);
      });

      test("returns 400 if reservation_id is missing", async () => {
        expect(tableOne).not.toBeUndefined();
        const data = {};

        const response = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("reservation_id");
        expect(response.status).toBe(400);
      });

      test("returns 404 if reservation_id does not exist", async () => {
        expect(tableOne).not.toBeUndefined();

        const data = {
          reservation_id: 999,
        };

        const response = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).toContain("999");
        expect(response.status).toBe(404);
      });

      test("returns 200 if table has sufficient capacity", async () => {
        expect(tableOne).not.toBeUndefined();

        const response = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data: { reservation_id: 1 } });

        expect(response.body.error).toBeUndefined();
        expect(response.status).toBe(200);
      });
      test("returns 400 if table does not have sufficient capacity", async () => {
        expect(barTableOne).not.toBeUndefined();

        const response = await request(app)
          .put(`/tables/${barTableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data: { reservation_id: 1 } });

        expect(response.body.error).toContain("capacity");
        expect(response.status).toBe(400);
      });

      test("returns 400 if table is occupied", async () => {
        expect(tableOne).not.toBeUndefined();

        // first, occupy the table
        const occupyResponse = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data: { reservation_id: 1 } });

        expect(occupyResponse.body.error).toBeUndefined();
        expect(occupyResponse.status).toBe(200);

        // next, try to assign the table to another reservation
        const doubleAssignResponse = await request(app)
          .put(`/tables/${tableOne.table_id}/seat`)
          .set("Accept", "application/json")
          .send({ data: { reservation_id: 2 } });

        expect(doubleAssignResponse.body.error).toContain("occupied");
        expect(doubleAssignResponse.status).toBe(400);
      });
    });
  });
});
