import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["individual", "group"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },

    jobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }],
  },
  {
    timestamps: true
  }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
