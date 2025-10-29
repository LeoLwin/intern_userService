const Moleculer = require("moleculer");

let theBroker = new Moleculer.ServiceBroker({
  namespace: "StudentManageMentSystem",
  nodeID: "userService",
  transporter: {
    type: "Redis",
    // options: {
    //   host: "redis-17181.c8.us-east-1-3.ec2.redns.redis-cloud.com",
    //   port: 17181,
    //   password: "F4H39hOAguWlvxw4MWj6TTBVZlV54wXy",
    //   db: 0,
    //   tls: {},
    // },

    options: {
      host: process.env.RedistHost,
      port: process.env.RedisPort,
      password: process.env.RedisPassword,
      db: 0,
      tls: {},
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
