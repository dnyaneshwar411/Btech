import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    generated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", required: true
    },

    due_date: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Invoice", invoiceSchema);
