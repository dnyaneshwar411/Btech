"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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
  const [newRemark, setNewRemark] = useState({ description: "", image: "" });

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

  const handleAddRemark = () => {
    if (newRemark.description.trim() !== "") {
      setSelectedJob((prev) => ({
        ...prev,
        quality_check: {
          ...prev.quality_check,
          remarks: [...prev.quality_check.remarks, { ...newRemark, completed: false }]
        }
      }));
      setNewRemark({ description: "", image: "" });
    }
  };

  return <div className="space-y-6 p-6">

    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Pending Quality Checks</h1>
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
          <TableHead>Progress</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job.requested_by.name}</TableCell>
            <TableCell><Progress value={60} /></TableCell>
            <TableCell className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="px-4 py-0 h-8 rounded-none">
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none">
                  <DropdownMenuItem className="hover:rounded-none">Approve</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChecklistClick(job)} className="hover:rounded-none">Checklist</DropdownMenuItem>
                  <DropdownMenuItem className="hover:rounded-none" variant="destructive">Send Back</DropdownMenuItem>
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

          <div className="space-y-2 border-t pt-4">
            <h3 className="font-medium">Add New Remark</h3>
            <Textarea
              placeholder="Describe the issue..."
              value={newRemark.description}
              onChange={(e) => setNewRemark({ ...newRemark, description: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Image URL (optional)"
              value={newRemark.image}
              onChange={(e) => setNewRemark({ ...newRemark, image: e.target.value })}
            />
            <Button onClick={handleAddRemark} variant="outline">Add Remark</Button>
          </div>
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