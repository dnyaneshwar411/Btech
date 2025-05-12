"use client";
import { fetchData, sendData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import DualOptionActionModal from "@/components/core/DualOptionActionModal";
import UpdateJobStatus from "@/components/pages/production/UpdateJobStatus";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

export default function Page() {
  const [query, setQuery] = useState("");
  const { isLoading, error, data } = useSWR("jobs", () => fetchData("jobs"))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const jobs = data.data
    .filter(job => job.stage === "quality_check");
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
  async function aproveJob(setLoading, closeBtnRef, _id) {
    try {
      setLoading(true);
      const response = await sendData(`jobs/${_id}/stage`, { stage: "ready_for_delivery" }, "PATCH");
      if (!response.success) throw new Error(response.error);
      toast.success(response.message || "Successfull!");
      mutate("jobs");
      closeBtnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Please try again later!");
    } finally {
      setLoading(false);
    }
  }

  return <div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Pending Quality Checks</h1>
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
          {/* <TableHead>Progress</TableHead> */}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job?.requested_by?.name || "Unknown"}</TableCell>
            {/* <TableCell><Progress value={60} /></TableCell> */}
            <TableCell className="flex gap-2">
              <DualOptionActionModal
                description="Are you sure to approve this job"
                action={(setLoading, btnRef) => aproveJob(setLoading, btnRef, job._id)}
              >
                <AlertDialogTrigger className="hover:bg-gray-200 leading-[1] px-2 py-2 rounded-[2px] rounded-[4px]">
                  Approve
                </AlertDialogTrigger>
              </DualOptionActionModal>
              <UpdateJobStatus _id={job._id} defaultValue={job.stage} />
              <Checklist job={job} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}

function Checklist({ job }) {
  const [newRemark, setNewRemark] = useState({ description: "", image: "" });
  const [selectedJob, setSelectedJob] = useState(() => job)
  const [loading, setLoading] = useState(false);

  const closeBtnRef = useRef(null);

  const handleAddRemark = () => {
    if (newRemark.description.trim() !== "") {
      setSelectedJob((prev) => ({
        ...prev,
        quality_check: {
          ...prev.quality_check,
          checklist: [...prev.quality_check.remarks, { ...newRemark, completed: false }]
        }
      }));
      setNewRemark({ description: "", image: "" });
    }
  };

  async function updateJob() {
    try {
      setLoading(true);
      delete selectedJob.created_by;
      delete selectedJob.requested_by;
      const response = await sendData(`jobs/${job._id}`, selectedJob, "PUT");
      if (!response.success) throw new Error(response.error);
      toast.success(response.message || "Successfull!");
      mutate("jobs");
      closeBtnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Please try again later!");
    } finally {
      setLoading(false);
    }
  }
  return <Dialog>
    <DialogTrigger className="hover:bg-gray-200 leading-[1] px-2 py-2 rounded-[2px] rounded-[4px]">Checklist</DialogTrigger>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Rework Checklist - {selectedJob?.job_id}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        {selectedJob?.quality_check.checklist.map((remark, index) => (
          <Card key={index} className="bg-[#FAFAFA] p-3 flex items-center flex-row gap-4 rounded-none hover:bg-gray-100 border-1 hover:shadow-lg">
            <Checkbox
              checked={remark.completed}
              onCheckedChange={() => setSelectedJob(prev => ({
                ...prev,
                quality_check: {
                  ...prev.quality_check,
                  checklist: prev.quality_check.checklist.map((item, idx) => index === idx ? ({ ...item, completed: !item.completed }) : item)
                }
              }))}
            />
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
      <Button disabled={loading} onClick={updateJob} variant="default">Update Checklist</Button>
      <DialogClose ref={closeBtnRef} />
    </DialogContent>
  </Dialog>
}