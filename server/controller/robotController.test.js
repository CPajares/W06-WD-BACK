const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotController");

jest.mock("../../database/models/robot.js");

describe("Given getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method json with robots and Robot.find", async () => {
      const robots = [
        {
          features: {
            speed: 2,
            resistence: 3,
            date: "2021-02-04T23:00:00.000Z",
          },
          _id: "618555c6c10e75c0021f6825",
          name: "Emilio",
          url: "https://nostalgiapop.es/wp-content/uploads/2020/07/NP_Emiglio-e1608391255576.jpg",
        },
        {
          features: {
            speed: 10,
            resistence: 10,
            date: "1992-02-04T23:00:00.000Z",
          },
          _id: "61858d407879acea05025522",
          name: "Papa dfgdfgDan",
          url: "http...",
          __v: 0,
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotID", () => {
  describe("", () => {
    test("", () => {});
  });
});
