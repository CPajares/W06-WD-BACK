require("dotenv").config();
const debug = require("debug")("robots:testw");
const chalk = require("chalk");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, initializeServer } = require("..");
const initiateDB = require("../../database");
const Robot = require("../../database/models/robot");

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  await initiateDB(process.env.MONGO_DB_TEST);
  await Robot.deleteMany();
  server = await initializeServer(4006);
});

beforeEach(async () => {
  const loginResponse = await request
    .post("/login")
    .send({ username: "marmol", password: "sandia" })
    .expect(200);
  token = loginResponse.body.token;
  await Robot.deleteMany();
  await Robot.create({
    _id: "618bc41205adafd2cd985499",
    name: "Bender",
    url: "https://www.latercera.com/resizer/b_okNChg3h6rgTfzN2HM7X-f5Gc=/380x570/smart/filters:focal(384x213:394x203)/cloudfront-us-east-1.images.arcpublishing.com/copesa/TKAHPZ4KDBAKFFTPIROL6SPFVY.png",
    features: {
      speed: 2,
      resistence: 3,
      date: "2021-12-04T00:00:00.000Z",
    },
    __v: 0,
  });
  await Robot.create({
    _id: "618bc41205adafd2cd985498",
    name: "Emilio",
    url: "https://www.latercera.com/resizer/b_okNChg3h6rgTfzN2HM7X-f5Gc=/380x570/smart/filters:focal(384x213:394x203)/cloudfront-us-east-1.images.arcpublishing.com/copesa/TKAHPZ4KDBAKFFTPIROL6SPFVY.png",
    features: {
      speed: 2,
      resistence: 3,
      date: "2021-12-04T00:00:00.000Z",
    },
    __v: 0,
  });
});

afterEach(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Database connection ended"));
  });

  await server.on("close", () => {
    debug(chalk.red("Server conection ended"));
  });
});

// usamos el done para decirle al afterAll ya está, podemos seguir, tot fet.
afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

describe("Given a /robots router", () => {
  describe("When it get a GET request ", () => {
    test("Then it should send a response with an array of robots and a status code of 200", async () => {
      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const expectedRobotLength = 2;
      expect(body).toHaveLength(expectedRobotLength);
    });
  });
});

describe("Given a robots/update router", () => {
  describe("When it get PUT request ", () => {
    test("Then it should call ", async () => {
      const { body } = await request
        .put("/robots/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          _id: "618bc41205adafd2cd98549j",
          name: "Tuercas",
          url: "https://www.latercera.com/resizer/b_okNChg3h6rgTfzN2HM7X-f5Gc=/380x570/smart/filters:focal(384x213:394x203)/cloudfront-us-east-1.images.arcpublishing.com/copesa/TKAHPZ4KDBAKFFTPIROL6SPFVY.png",
          features: {
            speed: 10,
            resistence: 10,
            date: "2021-12-04T00:00:00.000Z",
          },
        })
        .expect(404);
      console.log(body);
      expect(body).toHaveProperty("name", "Tuercas");
    });
  });
});
