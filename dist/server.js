"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceBroker = require("./broker/broker");
const connectToDatabase = require("./helper/dbConnect");
ServiceBroker.options.started = async function (broker) {
    console.log("callback");
};
ServiceBroker.loadService(__dirname + "/service/service.js");
ServiceBroker.start().then(async () => {
    console.log("Started");
    connectToDatabase();
    const result = await ServiceBroker.call("sms.user.list");
    console.log("Result : ", result);
});
//# sourceMappingURL=server.js.map