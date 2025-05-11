import express from "express";
import { register, login } from "../../controllers/auth.controller.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login); // integrated

export default router;

router.get("/india", (req, res) =>
  res.status(200).json({
    success: true,
    message: "This is the message!",
  })
);
