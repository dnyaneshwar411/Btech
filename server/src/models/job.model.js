import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      unique: true,
      required: true
    },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    stage: {
      type: String,
      enum: [
        "created",
        "listed",
        "admin-approval",
        "in-purchase",
        "in-store",
        "in-production",
        "in-quality",
        "back-to-production",
        "in-invoice",
        "ready-dispatch",
      ],
      default: "created",
    },

    materials: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material"
        },
        quantity: {
          type: Number,
          required: true
        },
      },
    ],

    company_expense: [
      {
        description: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
      },
    ],

    sale_amount: {
      type: Number,
      required: true
    },

    quality_check: {
      passed: {
        type: Boolean,
        default: false
      },
      checked_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      checklist: [
        {
          description: {
            type: String,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
          },
        },
      ],
      remarks: [
        {
          description: {
            type: String,
            required: true
          },
          image: {
            type: String
          },
          completed: {
            type: Boolean,
            default: false
          },
        },
      ],
    },

    stage_history: [
      {
        forwared_to: {
          type: String,
          required: true
        },
        action_taker: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        },
      },
    ],
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;