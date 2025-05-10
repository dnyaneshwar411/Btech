import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    material_id: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    unit_price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "l", "ml", "m", "cm", "piece", "box", "set"],
      default: "piece",
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    supplier: {
      name: String,
      contact: String,
      email: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["available", "low_stock", "out_of_stock"],
      default: "available",
    },
    minimum_stock: {
      type: Number,
      default: 10,
    },
    quantity_available: {
      type: Number,
      required: true,
      default: 0,
    },
    storage: [
      {
        location: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    purchase_history: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        purchased_under: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        purchased_from: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    stored_in: [
      {
        location: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);
export default Material;
