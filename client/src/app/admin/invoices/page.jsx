"use client";
import Search from "@/components/core/Search";
import TableData from "@/components/pages/invoices/TableData";
import TableComponent from "@/components/core/TableComponent";
import { getInvoice } from "@/lib/mock";
import { invoiceheader } from "@/utils/data/table";
import { useEffect, useState } from "react";
import FilterJobs from "@/components/pages/sales/FilterJobs";
import Paginate from "@/components/core/Paginate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <div className="flex gap-4">
        <Input placeholder="Search..." className="md:min-w-[350px]" />
        <Button variant="outline">Filter</Button>
      </div>
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