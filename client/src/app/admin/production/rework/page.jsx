"use client"
import Loader from "@/components/core/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const debouncedQuery = useDebounce(query);

  const handleChecklistClick = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleRemarkToggle = (index) => {
    setSelectedJob((prev) => ({
      ...prev,
      quality_check: {
        ...prev.quality_check,
        remarks: prev.quality_check.remarks.map((remark, i) =>
          i === index ? { ...remark, completed: !remark.completed } : remark
        )
      }
    }));
  };

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

  const sentBackJobs = jobs.filter((job) => !job.quality_check.passed);

  if (sentBackJobs.length < 1) return <Loader />

  return <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Sent Back from Quality</h1>
    </div>

    <div className="flex gap-4">
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Job ID..."
        className="w-1/3"
      />
      <Button variant="outline">Filter</Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quality Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job.requested_by.name}</TableCell>
            <TableCell>
              <Badge variant="destructive">Failed</Badge>
            </TableCell>
            <TableCell><Progress value={40} /></TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="px-4 py-0 h-8 rounded-none">
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none">
                  <DropdownMenuItem className="hover:rounded-none">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="hover:rounded-none">Update Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChecklistClick(job)} className="hover:rounded-none">Rework Checklist</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Rework Checklist - {selectedJob?.job_id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {selectedJob?.quality_check.remarks.map((remark, index) => (
            <Card key={index} className="bg-[#FAFAFA] p-3 flex items-center flex-row gap-4 rounded-none hover:bg-gray-100 border-1 hover:shadow-lg">
              <Checkbox checked={remark.completed} onCheckedChange={() => handleRemarkToggle(index)} />
              <p className="mr-auto">{remark.description}</p>
              {remark.image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="w-[20px] h-[20px]">
                      <Eye />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Defect Image</DialogTitle>
                    </DialogHeader>
                    <img src={remark.image} alt="Remark issue" className="w-full h-auto rounded-lg" />
                  </DialogContent>
                </Dialog>
              )}
            </Card>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default">Update Checklist</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}