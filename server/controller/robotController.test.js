const Robot = require("../../database/models/robot");
const {
  getRobots,
  getRobotbyId,
  createRobot,
  deleteRobotById,
} = require("./robotController");

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

describe("Given a getRobotId", () => {
  describe("When it´s called with the objects res and req", () => {
    test("Then should called the method json of res object", async () => {
      const idRobot = "618555c6c10e75c0021f6825";
      const robot = {
        features: {
          speed: 2,
          resistence: 3,
          date: "2021-02-04T23:00:00.000Z",
        },
        idRobot,
        name: "Emilio",
        url: "https://nostalgiapop.es/wp-content/uploads/2020/07/NP_Emiglio-e1608391255576.jpg",
      };
      Robot.findById = jest.fn().mockResolvedValue(robot);
      const res = {
        json: jest.fn(),
      };
      const req = {
        params: { idRobot },
      };

      await getRobotbyId(req, res);

      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
  describe("When it´s called with the objects res, req", () => {
    test("Then it should called findbyid method", async () => {
      const idRobot = "618555c6c10e75c0021f6825";

      Robot.findById = jest.fn().mockResolvedValue(idRobot);
      const res = {
        json: jest.fn(),
      };
      const req = {
        params: { idRobot },
      };

      await getRobotbyId(req, res);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });
  describe("When it´s called whit next function and error it´s rejected", () => {
    test("Then it should call next function with the error object", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const next = jest.fn();
      const res = {};
      const req = {
        params: {},
      };

      await getRobotbyId(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given createRobot function", () => {
  describe("When it receives an object req", () => {
    test("Then it should call the method json with object robot", async () => {
      const robot = {
        features: {
          speed: 2,
          resistence: 3,
          date: "2021-02-04T23:00:00.000Z",
        },
        _id: "618555c6c10e75c0021f6825",
        name: "Emilio",
        url: "https://nostalgiapop.es/wp-content/uploads/2020/07/NP_Emiglio-e1608391255576.jpg",
      };
      Robot.create = jest.fn().mockResolvedValue(robot);
      const req = { body: robot };
      const res = { json: jest.fn() };

      await createRobot(req, res);

      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });

  describe("When it receives a function next and an error rejected", () => {
    test("Then it should call next with the error", async () => {
      const error = {
        code: 400,
        message: "Fail!",
      };
      const req = { params: "Whatever" };
      const res = {};
      const next = jest.fn();

      Robot.findById = jest.fn().mockRejectedValue(error);

      await getRobotbyId(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteRobotById function", () => {
  describe("When it receives a req object", () => {
    test("Then should call findByIdAndDelete method", async () => {
      const idRobot = "618555c6c10e75c0021f6825";
      const req = {
        params: { idRobot },
      };
      const res = {
        json: jest.fn(),
      };

      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(idRobot);

      await deleteRobotById(req, res);

      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("When it receives a req and res objects", () => {
    test("Then should call json method", async () => {
      const idRobot = "618555c6c10e75c0021f6825";
      const req = {
        params: { idRobot },
      };
      const res = {
        json: jest.fn(),
      };

      Robot.findByIdAndDelete = jest.fn();

      await deleteRobotById(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
