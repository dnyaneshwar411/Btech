"use client";
import TableData from "@/components/pages/clients/TableData";
import TableComponent from "@/components/core/TableComponent";
import { clientsHeader } from "@/utils/data/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import { fetchData } from "@/api/server";
import ContentLoader from "@/components/core/ContentLoader";
import ContentError from "@/components/core/ContentError";
import AddClientModal from "@/components/pages/clients/AddClientModal";

export default function Page() {
  const { isLoading, error, data } = useSWR("clients", () => fetchData("clients"))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const clients = data.data

  return <div>
    <div className="mb-8 flex justify-between items-center gap-4">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <div className="ml-auto flex gap-4">
        <Input placeholder="Search..." className="md:min-w-[350px]" />
        {/* <Button variant="outline">Filter</Button> */}
      </div>
      <AddClientModal />
    </div>
    <TableComponent
      headers={clientsHeader}
      component={<TableData data={clients} />}
    />
    {/* <Paginate
      current={page}
      previous={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
      next={() => setPage(prev => prev + 1)}
      className="mt-10" /> */}
  </div>
}