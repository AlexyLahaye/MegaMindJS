require ("./models/db");
const user = require("./models/user-reprository");
require('dotenv').config();
const WebServer = require('./core/web-server');

const webServer = new WebServer();
webServer.start();

