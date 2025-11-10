const Moleculer = require("moleculer");
require("dotenv").config();
let theBroker = new Moleculer.ServiceBroker({
  namespace: "StudentManageMentSystem123456789",
  nodeID: "userServices"+ Math.floor(Math.random() * 10000),
  transporter: {
    type: "Redis",
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      db: 0,
      tls: {},
    },
  },
  cacher: {
    type: "memory",
  },
  logger: console,
  logLevel: "info",
});

module.exports = theBroker;

