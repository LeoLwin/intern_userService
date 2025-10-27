const Moleculer = require("moleculer");

let theBroker = new Moleculer.ServiceBroker({
  namespace: "StudentManageMentSystem",
  nodeID: "userService",
  transporter: {
    type: "Redis",
    options: {
      host: "127.0.0.1",
      port: 6379,
      password: "",
      db: 0,
    },
  },
  // transporter: {
  //   type: "TCP",
  //   options: {
  //     // TCP options (optional)
  //     port: 6000, // default is 3000
  //     // host: "127.0.0.1" // optional, default binds to all
  //   }
  // },
  cacher: {
    type: "memory",
  },
  logger: console,
  logLevel: "info",

//   created(broker) {
//     broker.logger.info("created");
//   },
//   started(broker) {
//     broker.logger.info("started");
//   },
//   stopped(broker) {
//     broker.logger.info("stopped");
//   },
});

module.exports = theBroker;