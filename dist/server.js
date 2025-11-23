"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = __importDefault(require("./helper/dbConnect"));
const broker_1 = __importDefault(require("./broker/broker"));
broker_1.default.start().then(() => {
    console.log("Broker is ready");
});
broker_1.default.loadService(__dirname + "/service/service");
broker_1.default.start().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Started");
    yield (0, dbConnect_1.default)();
    // const result: any = await ServiceBroker.call("blog.list",{ current: 1, limit: 10 });
    // console.log("Result : ", result);
}));
