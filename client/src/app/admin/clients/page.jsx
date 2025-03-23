"use client";
import Search from "@/components/core/Search";
import TableData from "@/components/pages/clients/TableData";
import TableComponent from "@/components/core/TableComponent";
import { getClients } from "@/lib/mock";
import { clientsHeader } from "@/utils/data/table";
import { useEffect, useState } from "react";
import FilterJobs from "@/components/pages/sales/FilterJobs";
import Paginate from "@/components/core/Paginate";
import toast from "react-hot-toast";

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getClients(query);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [query]);

  return <div>
    <div className="flex items-center justify-end gap-4">
      <FilterJobs />
      <Search onChange={(value) => setQuery(value)} />
    </div>
    <TableComponent
      headers={clientsHeader}
      component={<TableData data={jobs} />}
    />
    <Paginate
      current={page}
      previous={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
      next={() => setPage(prev => prev + 1)}
      className="mt-10" />
  </div>
}