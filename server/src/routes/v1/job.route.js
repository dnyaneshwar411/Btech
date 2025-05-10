import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  updateJobStage,
  addMaterialToJob,
  addExpenseToJob,
  updateQualityCheck,
  deleteJob,
} from "../../controllers/job.controller.js";

const router = express.Router();

// Create a new job
router.post("/", auth, createJob);

// Get all jobs with filters
router.get("/", auth, getJobs);

// Get job by ID
router.get("/:id", auth, getJobById);

// Update job details
router.put("/:id", auth, updateJob);

// Update job stage
router.patch("/:id/stage", auth, updateJobStage);

// Add material to job
router.post("/:id/materials", auth, addMaterialToJob);

// Add expense to job
router.post("/:id/expenses", auth, addExpenseToJob);

// Update quality check
router.patch("/:id/quality-check", auth, updateQualityCheck);

// Delete job
router.delete("/:id", auth, deleteJob);

export default router;
