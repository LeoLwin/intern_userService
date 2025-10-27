"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService = {
    name: "sms.user",
    actions: {
        list: {
            async handler(ctx) {
                return { 'mesasge': "This is sms user" };
            },
        }
    }
};
module.exports = userService;
//# sourceMappingURL=service.js.map