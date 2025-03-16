"use client";
import Search from "@/components/core/Search";
import Table from "@/components/core/TableComponent";
import { useEffect, useState } from "react";
import { getJobs } from "@/lib/mock";
import toast from "react-hot-toast";
import TableData from "@/components/pages/sales/TableData";
import { salesheader } from "@/utils/data/table";
import CreateJobModal from "@/components/pages/sales/CreateJobModal";
import NewClientModal from "@/components/pages/sales/NewClientModal";

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(query);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })()
  }, [query])

  return <div>
    <div className="mt-6 mb-20">
      <div className="grid grid-cols-2 gap-8">
        {Array.from({ length: 4 }, (_, i) => i).map(item => <div
          key={item}
          className="bg-secondary text-center px-4 py-8"
        >
          <h2 className="text-[20px] font-bold mb-2">Total Jobs</h2>
          <span className="font-medium">200</span>
        </div>)}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Search
        onChange={(value) => setQuery(value)}
        className="mr-auto"
      />
      <CreateJobModal />
      <NewClientModal />
    </div>
    <Table
      headers={salesheader}
      component={<TableData data={jobs} />}
    />
    <ul className="list-disc mt-8">
      <li>create a job</li>
      <li>list of jobs</li>
      <li>on board a client</li>
      <li>search bar</li>
      <li>pagination</li>
    </ul>
  </div>
}