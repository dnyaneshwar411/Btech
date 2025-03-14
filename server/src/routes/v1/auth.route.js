import express from "express";

const router = express.Router();

export default router;

router.get("/india", (req, res) => res.status(200).json({
  success: true,
  message: "This is the message!"
}));