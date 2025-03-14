import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "admin",
        "sales",
        "purchase",
        "store",
        "production",
        "quality",
        "accounting",
        "dispatch",
      ],
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);