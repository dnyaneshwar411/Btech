import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  createNewPurchase,
  retrievePurchases,
  updatePurchase
} from "../../controllers/purchase.controller.js";

const router = express.Router();

router.route("/", auth)
  .get(retrievePurchases)
  .post(createNewPurchase);

router.route("/:id", auth)
  .put(updatePurchase)

export default router;
