const userService = {
  name: "sms.user",
  actions: {
    list: {
      async handler(ctx: any) {
        console.log("this is sms user service");
        return { mesasge: "This is sms user123" };
      },
    },
  },
};

module.exports = userService;
