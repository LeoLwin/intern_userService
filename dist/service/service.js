"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService = {
    name: "sms.user",
    actions: {
        list: {
            async handler(ctx) {
                console.log("this is sms user service");
                return { mesasge: "This is sms user123" };
            },
        },
    },
};
module.exports = userService;
//# sourceMappingURL=service.js.map