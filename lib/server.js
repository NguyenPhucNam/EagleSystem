const app = require("./app");
// const mongoose = require("mongoose");
const config = require('../config/config');
const ws = require('../ws/ws');
const server = require("http").Server(app);

// mongoose.Promise = global.Promise;
// mongoose.connect(config.MongoDb, { useNewUrlParser: true })
// .then(() => console.log("Start Database Success"))
// .catch((err, done) => done("Could not connect to DB: " + err));

// ws.init(server);

const hostName = '0.0.0.0';
const port = process.env.NODE_PORT || config.Port;

server.listen(port, hostName, () => {
    console.log(`Node listens on http://127.0.0.1:${port}.`);
});
