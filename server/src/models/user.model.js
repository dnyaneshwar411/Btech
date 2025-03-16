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

    position: {
      type: String,
      enum: [
        "admin",
        "sales",
        "purchase",
        "store",
        "production",
        "quality",
        "accounting",
        "dispatch"
      ]
    },

    role: {
      type: [String],
      enum: [

      ],
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
export default User;