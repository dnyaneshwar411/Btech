"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { getJobs } from "@/lib/mock";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  const debouncedQuery = useDebounce(query);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(debouncedQuery, 1, 10);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [debouncedQuery]);
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
          <TableHead>Progress</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job.requested_by.name}</TableCell>
            <TableCell><Progress value={30} /></TableCell>
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
          {selectedJob?.quality_check.remarks.map((remark, index) => (
            <Card key={index} className="p-3 flex items-center flex-row gap-4">
              <Checkbox checked={remark.completed} onCheckedChange={() => handleRemarkToggle(index)} disabled />
              <p className="mr-auto">{remark.description}</p>
              {remark.image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="w-[20px] h-[20px]">
                      <Eye />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <img src={remark.image} alt="Remark issue" className="w-full h-auto rounded-lg" />
                  </DialogContent>
                </Dialog>
              )}
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button variant="default">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}