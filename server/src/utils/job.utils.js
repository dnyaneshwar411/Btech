import Job from "../models/job.model.js";

export const generateJobId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  // Get the last job ID for the current month
  const lastJob = await Job.findOne({
    job_id: new RegExp(`^JOB${year}${month}`),
  }).sort({ job_id: -1 });

  let sequence = "0001";
  if (lastJob) {
    const lastSequence = parseInt(lastJob.job_id.slice(-4));
    sequence = (lastSequence + 1).toString().padStart(4, "0");
  }

  return `JOB${year}${month}${sequence}`;
};
