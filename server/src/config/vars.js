import dotenv from "dotenv";
dotenv.config();

const env = process.env
const vars = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongoose: {
    url: env.MONGOOSE_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}

export default vars;