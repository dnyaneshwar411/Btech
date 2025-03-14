import mongoose from "mongoose";
import app from "./app.js";
import env from "./config/vars.js"

let server;
mongoose.connect(env.mongoose.url).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(env.port, () => {
    console.log(`Listening to port ${env.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});