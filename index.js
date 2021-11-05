const InitializeServer = require("./server/routes");

require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

InitializeServer(port);
