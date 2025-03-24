"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { getJobs } from "@/lib/mock";
import toast from "react-hot-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const jobs = [
  {
    _id: "JOB-101",
    job_id: "J101",
    requested_by: { name: "ABC Pvt Ltd" },
    created_by: { name: "John Doe" },
    sale_amount: 50000,
    stage: "ready-dispatch",
    quality_check: { passed: true },
    stage_history: [{ timestamp: new Date("2024-03-15") }]
  },
  {
    _id: "JOB-102",
    job_id: "J102",
    requested_by: { name: "XYZ Pvt Ltd" },
    created_by: { name: "Jane Doe" },
    sale_amount: 75000,
    stage: "dispatched",
    quality_check: { passed: true },
    stage_history: [{ timestamp: new Date("2024-03-10") }]
  }
];

export default function DispatchPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(query);
        if (!success) throw new Error(message);
        console.log(data)
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [query]);

  return <Details jobs={jobs} />
}

function Details({
  jobs
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  return (<div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Dispatch Overview</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Search Job ID..."
          className="md:min-w-[350px]"
        />
        <Button variant="outline">Filter</Button>
      </div>
    </div>
    <h2 className="text-xl font-semibold mt-4">Ready for Dispatch</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Sale Amount</TableHead>
          <TableHead>Quality Passed</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs
          .filter((job) => job.stage === "ready-dispatch")
          .map((job) => (
            <TableRow key={job.job_id}>
              <TableCell>{job.job_id}</TableCell>
              <TableCell>{job.requested_by.name}</TableCell>
              <TableCell>₹{job.sale_amount}</TableCell>
              <TableCell>{job.quality_check.passed ? "✅ Yes" : "❌ No"}</TableCell>
              <TableCell className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="px-4 py-0 h-8 rounded-none">
                    <Button variant="outline">Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-none">
                    <DropdownMenuItem className="hover:rounded-none" onClick={() => handleViewDetails(job)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChecklistClick(job)} className="hover:rounded-none">Mark as Dispatched</DropdownMenuItem>
                    <DropdownMenuItem className="hover:rounded-none">Generate Invoice</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <h2 className="text-xl font-semibold mt-6">Dispatched Jobs</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Sale Amount</TableHead>
          <TableHead>Dispatched Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs
          .filter((job) => job.stage === "dispatched")
          .map((job) => (
            <TableRow key={job.job_id}>
              <TableCell>{job.job_id}</TableCell>
              <TableCell>{job.requested_by.name}</TableCell>
              <TableCell>₹{job.sale_amount}</TableCell>
              <TableCell>{format(new Date(), "dd MMM yyyy")}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewDetails(job)} variant="outline">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle>Job Details - {selectedJob?.job_id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="bg-[#FAFAFA] hover:bg-gray-100 p-4 gap-2 rounded-none">
            <p><strong>Client:</strong> {selectedJob?.requested_by.name}</p>
            <p><strong>Requested By:</strong> {selectedJob?.created_by.name}</p>
            <p><strong>Sale Amount:</strong> ₹{selectedJob?.sale_amount}</p>
            <p><strong>Quality Check Passed:</strong> {selectedJob?.quality_check.passed ? "✅ Yes" : "❌ No"}</p>
          </Card>
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  );
}