const userService = {
    name: "sms.user",
    actions: {
        list: {
            async handler(ctx: any) {
                return {'mesasge' : "This is sms user"}
            },
        }
    }
}

module.exports = userService