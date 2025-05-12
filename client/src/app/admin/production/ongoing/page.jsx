"use client";
import { fetchData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import UpdateJobStatus from "@/components/pages/production/UpdateJobStatus";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSWR from "swr";

export default function Page() {
  const { isLoading, error, data } = useSWR("jobs", () => fetchData("jobs"))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const jobs = data.data
    .filter(job => job.stage === "production_started");

  return <div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Ongoing</h1>
      <div className="flex gap-4">
        <Input
          // value={query}
          // onChange={e => setQuery(e.target.value)}
          placeholder="Search Job ID..."
          className="md:min-w-[350px]"
        />
        <Button variant="outline">Filter</Button>
      </div>
    </div>
    <Table className="border-1">
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Assigned Worker</TableHead>
          {/* <TableHead>Progress</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job?.requested_by?.name || "Unknown Name"}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <span>John Doe - Supervisor</span>
            </TableCell>
            {/* <TableCell><Progress value={50} /></TableCell> */}
            <TableCell><Badge variant="outline">{job.stage}</Badge></TableCell>
            <TableCell>
              <UpdateJobStatus _id={job._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}