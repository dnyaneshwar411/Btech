"use client";
import Search from "@/components/core/Search";
import TableData from "@/components/pages/sales/TableData";
import TableComponent from "@/components/core/TableComponent";
import { getJobs } from "@/lib/mock";
import { salesheader } from "@/utils/data/table";
import { useEffect, useState } from "react";
import FilterJobs from "@/components/pages/sales/FilterJobs";
import Paginate from "@/components/core/Paginate";

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(query);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [query]);

  return <div>
    <div className="flex items-center justify-end gap-4">
      <FilterJobs fill="#FF0000" className="text-blue-500" />
      <Search onChange={(value) => setQuery(value)} />
    </div>
    <TableComponent
      headers={salesheader}
      component={<TableData data={jobs} />}
    />
    <Paginate
      current={page}
      previous={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
      next={() => setPage(prev => prev + 1)}
      className="mt-10" />

    {/* <ul className="list-disc">
      <li>listing of jobs</li>
      <li>search bar</li>
      <li>pagination on the jobs</li>
      <li>create a new job</li>
      <li>export the jobs by filtering criteria</li>
      <li>routes - /:id <Link href="/admin/jobs/job-details" className="text-green-600 underline">job details page</Link></li>
    </ul> */}
  </div>
}