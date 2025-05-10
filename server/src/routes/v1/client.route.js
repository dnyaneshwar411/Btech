import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../../controllers/client.controller.js";

const router = express.Router();

// Create a new client
router.post("/", auth, createClient);

// Get all clients
router.get("/", auth, getClients);

// Get client by ID
router.get("/:id", auth, getClientById);

// Update client
router.put("/:id", auth, updateClient);

// Delete client
router.delete("/:id", auth, deleteClient);

export default router;
