"use client";
import Search from "@/components/core/Search";
import TableData from "@/components/pages/invoices/TableData";
import TableComponent from "@/components/core/TableComponent";
import { getInvoice } from "@/lib/mock";
import { invoiceheader } from "@/utils/data/table";
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
        const { success, data, message } = await getInvoice(query);
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
      headers={invoiceheader}
      component={<TableData data={jobs} />}
    />
    <Paginate
      current={page}
      previous={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
      next={() => setPage(prev => prev + 1)}
      className="mt-10" />
  </div>
}