import Moleculer = require("moleculer");
const User = require("../model/userModel"); 

const userService: Moleculer.ServiceSchema = {
  name: "sms.user",
  actions: {
    // List all users
    list: {
      async handler(ctx: Moleculer.Context<{}>) {
        try {
          const users = await User.find(); // get all users from MongoDB
          return { message: "User list fetched", users };
        } catch (error: any) {
          console.error("Error fetching users:", error.message);
          return { message: "Error fetching users", error: error.message };
        }
      },
    },

    // Create a new user
    create: {
      params: {
        name: "string",
        email: "string",
      },
      async handler(ctx: Moleculer.Context<{ name: string; email: string }>) {
        const { name, email } = ctx.params;
        console.log("Params : ", {name, email})
        try {
          const user = new User({ name, email });
          await user.save();
          return { message: "User created", user };
        } catch (error: any) {
          console.error("Error creating user:", error.message);
          return { message: "Error creating user", error: error.message };
        }
      },
    },
  },
};

module.exports = userService;
