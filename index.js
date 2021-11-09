const InitializeServer = require("./server/index");
const initiateDB = require("./database/index");
require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 2000;

initiateDB();
InitializeServer(port);
