"use client";
import { fetchData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [query, setQuery] = useState("");
  const { isLoading, error, data } = useSWR("jobs", () => fetchData("jobs"))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const jobs = data.data
    .filter(job => job.stage === "cancelled");

  return <Jobs
    jobs={jobs}
    query={query}
    setQuery={setQuery}
  />
}

function Jobs({
  query,
  setQuery,
  jobs
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewChecklist = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  return <div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Rejected Jobs</h1>
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

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job?.requested_by?.name || "Unknown Name"}</TableCell>
            <TableCell className="flex gap-2">
              <Badge variant="success" className="text-md cursor-pointer rounded-none" onClick={() => handleViewChecklist(job)}>Checklist</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Checklist - {selectedJob?.job_id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {selectedJob?.quality_check.checklist.map((remark, index) => (
            <Card key={index} className="p-3 flex items-center flex-row gap-4">
              <Checkbox checked={remark.completed} onCheckedChange={() => handleRemarkToggle(index)} disabled />
              <p className="mr-auto">{remark.description}</p>
              {remark.image && (
                <Dialog>
                  <DialogHeader><DialogTitle /></DialogHeader>
                  <DialogTrigger asChild>
                    <Button variant="link" className="w-[20px] h-[20px]">
                      <Eye />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <img src={remark.image || "/not-found.png"} alt="Remark issue" className="w-full h-auto rounded-lg" />
                  </DialogContent>
                </Dialog>
              )}
            </Card>
          ))}
        </div>
        <DialogClose className="bg-black text-white px-4 py-2 rounded-[4px]">Close</DialogClose>
      </DialogContent>
    </Dialog>
  </div>
}