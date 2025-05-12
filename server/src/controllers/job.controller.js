import Job from "../models/job.model.js";
import { generateJobId } from "../utils/job.utils.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      job_id: await generateJobId(),
      created_by: req.user._id,
    };

    const job = await Job.create(jobData);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all jobs with filters
export const getJobs = async (req, res) => {
  try {
    const { stage, requested_by, startDate, endDate } = req.query;
    const query = {};

    if (stage) query.stage = stage;
    if (requested_by) query.requested_by = requested_by;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const jobs = await Job.find(query)
      .populate("requested_by", "name email")
      .populate("created_by", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("requested_by", "name email")
      .populate("created_by", "name email")
      .populate("materials._id", "name unit_price");

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update job details
export const updateJob = async (req, res) => {
  try {
    console.log(req.body)
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    console.log(job)

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update job stage
export const updateJobStage = async (req, res) => {
  try {
    const { stage } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    job.stage = stage;
    job.stage_history.push({
      forwared_to: stage,
      action_taker: req.user._id,
    });

    await job.save();
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add material to job
export const addMaterialToJob = async (req, res) => {
  try {
    const { material_id, quantity } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    job.materials.push({ _id: material_id, quantity });
    await job.save();

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add expense to job
export const addExpenseToJob = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    job.company_expense.push({ description, amount });
    await job.save();

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update quality check
export const updateQualityCheck = async (req, res) => {
  try {
    const { passed, checklist, remarks } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    job.quality_check = {
      passed,
      checked_by: req.user._id,
      checklist: checklist || job.quality_check.checklist,
      remarks: remarks || job.quality_check.remarks,
    };

    await job.save();
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
