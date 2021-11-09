const { InitializeServer } = require("./server/index");
const initiateDB = require("./database/index");
require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 2000;

initiateDB(process.env.MONGO_DB);
InitializeServer(port);
