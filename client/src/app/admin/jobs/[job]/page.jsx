"use client";

import { getJobsDetails } from "@/lib/mock";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [job, setJob] = useState(null);
  const paramsList = useParams()

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobsDetails(paramsList.job);
        if (!success) throw new Error(message);
        setJob(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, []);
  return <div>
    <ul className="list-disc">
      <li>all the relevant details for the job</li>
      <li>companuy expenses for the job</li>
      <li>quality checks for the job if the stage is reached</li>
      <li>stage history</li>
      <li>relevant actions that can be taken on the job</li>
    </ul>
  </div>
}