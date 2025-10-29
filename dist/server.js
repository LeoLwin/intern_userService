"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceBroker = require("./broker/broker");
const express = require("express");
ServiceBroker.options.started = async function (broker) {
    console.log("callback");
};
ServiceBroker.loadService(__dirname + "/service/service.js");
ServiceBroker.start().then(async () => {
    console.log("Started");
    // const result: any = await ServiceBroker.call("sms.user.list");
    // console.log("Result : ", result)
}).then(() => {
    const app = express();
    // app.use("/", (req: Request, res: Response) => {
    //     console.log('Hello this is nodejs project')
    //     res.json("This is testing");
    // });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is listening on  http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=server.js.map