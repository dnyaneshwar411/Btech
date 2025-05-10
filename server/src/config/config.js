import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGOOSE_URL || "mongodb://localhost:27017/manufacturing-app",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  nodeEnv: process.env.NODE_ENV || "development",
};
