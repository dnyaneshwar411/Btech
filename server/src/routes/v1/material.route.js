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
router.post("/", auth, createMaterial);

// Get all materials
router.get("/", auth, getMaterials);

// Get material by ID
router.get("/:id", auth, getMaterialById);

// Update material
router.put("/:id", auth, updateMaterial);

// Delete material
router.delete("/:id", auth, deleteMaterial);

export default router;
