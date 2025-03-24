import mongoose from "mongoose";

const storageSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true
    },
    max_quantity: {
      type: String,
      required: true
    },
    space_available: {
      type: Boolean,
      default: true
    },
    materials: [{
      material_doc_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
      },
      status: {
        type: String,
        enum: ["stored", "selected"]
      }
    }]
  },
  {
    timestamps: true
  }
);

const Storage = mongoose.model("Storage", storageSchema);
export default Storage;