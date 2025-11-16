
import connectToDatabase  from "./helper/dbConnect";
import ServiceBroker from "./broker/broker";


ServiceBroker.start().then(() => {
  console.log("Broker is ready");
});

ServiceBroker.loadService(__dirname + "/service/service");

ServiceBroker.start().then(async () => {
  console.log("Started");
 await connectToDatabase();

  // const result: any = await theBroker.call("blog.list");
  // console.log("Result : ", result);
});
