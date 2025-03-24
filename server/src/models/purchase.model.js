import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    seller: {
      name: {
        type: String
      },
      email: {
        type: String
      },
      contact: {
        type: String
      }
    },
    purchase_cost: {
      type: Number
    },
    requested_material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material"
    },
    requested_material_quantity: {
      type: Number
    },
    status: {
      type: String,
      enum: ["requested", "approved", "dispatched", "completed"]
    },
    completion_date: {
      type: Date
    },
    requested_date: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;