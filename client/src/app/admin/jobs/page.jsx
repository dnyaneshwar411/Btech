import Link from "next/link";

export default function Page() {
  return <div>
    <ul className="list-disc">
      <li>listing of jobs</li>
      <li>search bar</li>
      <li>pagination on the jobs</li>
      <li>create a new job</li>
      <li>export the jobs by filtering criteria</li>
      <li>routes - /:id <Link href="/admin/jobs/job-details" className="text-green-600 underline">job details page</Link></li>
    </ul>
  </div>
}