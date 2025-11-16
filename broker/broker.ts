// import * as Moleculer from "../node_modules/moleculer/index";

import { ServiceBroker } from "moleculer";
import * as dotenv from "dotenv";
import config from "../config/config";  


dotenv.config();
let theBroker = new ServiceBroker(
  {
  namespace: "BlogErina",
  nodeID: "blogServices" + Math.floor(Math.random() * 10000),
  logLevel: "info",

  transporter: {
    type: "Redis",
    options: {
      host: config.redis.host,
      port: Number(config.redis.port),
      password: config.redis.password,
      db: 0,
      tls: {},
    },
  },
  cacher: "Redis",
    logger: true,
    created(broker) {
        broker.logger.info("created");
    },
    started(broker) {
        broker.logger.info("started");
    },
    stopped(broker) {
        broker.logger.info("stopped");
    },

}
);

export default  theBroker;
