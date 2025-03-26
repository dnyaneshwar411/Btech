"use client";
import Loader from "@/components/core/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { getJobs } from "@/lib/mock";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(debouncedQuery, page, 10);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [debouncedQuery, page]);

  if (jobs.length < 1) return <Loader />

  return <div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Ongoing</h1>
      <div className="flex gap-4">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
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
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job.requested_by.name}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <span>John Doe - Supervisor</span>
            </TableCell>
            <TableCell><Progress value={50} /></TableCell>
            <TableCell><Badge variant="outline">{job.stage}</Badge></TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="px-4 py-0 h-8 rounded-none">
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none">
                  <DropdownMenuItem className="hover:rounded-none">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="hover:rounded-none">Update Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}