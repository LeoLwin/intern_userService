import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}

// Validate and parse environment variables
const config: Config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/blog",
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD,
  },
};

export default config;
