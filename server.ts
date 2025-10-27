const express = require("express");
const ServiceBroker = require("./broker/broker");

ServiceBroker.options.started = async function (broker: any) {
  console.log("callback");
};


ServiceBroker.loadService(__dirname + "/service/service.js");


ServiceBroker.start().then(async () => {
  console.log("Started")

  // const result: any = await ServiceBroker.call("sms.user.list");
  // console.log("Result : ", result)
}
);

