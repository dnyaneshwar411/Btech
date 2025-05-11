import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  createMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "../../controllers/material.controller.js";

const router = express.Router();

// Create a new material
router.post("/", auth, createMaterial); // integrated

// Get all materials
router.get("/", auth, getMaterials); // integrated

// Get material by ID
router.get("/:id", auth, getMaterialById); // integrated

// Update material
router.put("/:id", auth, updateMaterial);

// Delete material
router.delete("/:id", auth, deleteMaterial); // integrated

export default router;
