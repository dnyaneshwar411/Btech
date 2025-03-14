import express from "express";
import cors from "cors";
import router from "./routes/v1";

const app = express();


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)

// enable cors
app.use(cors());
app.options('*', cors());

export default app;