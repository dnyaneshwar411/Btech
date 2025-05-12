"use client"
import { fetchData, sendData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import UpdateJobStatus from "@/components/pages/production/UpdateJobStatus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

export default function Page() {
  const [query, setQuery] = useState("");

  const { isLoading, error, data } = useSWR("jobs", () => fetchData("jobs"))

  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const jobs = data.data
    .filter(job => job.stage === "sent_back_from_quality");

  return <div className="space-y-6 p-6">
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Sent Back from Quality</h1>
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
          <TableHead>Quality Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.job_id}>
            <TableCell>{job.job_id}</TableCell>
            <TableCell>{job?.requested_by?.name || "Unknown Name"}</TableCell>
            <TableCell>
              <Badge variant="destructive">Failed</Badge>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              {/* <Button variant="ghost">View Details</Button> */}
              <UpdateJobStatus
                _id={job._id}
                defaultValue={job.stage}
              />
              <ReworkChecklist job={job} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}

function ReworkChecklist({ job }) {
  const [selectedJob, setSelectedJob] = useState(() => job)

  const [loading, setLoading] = useState(false);

  const closeBtnRef = useRef(null);

  async function updateJob() {
    try {
      setLoading(true);
      delete selectedJob.created_by;
      delete selectedJob.requested_by;
      selectedJob.stage = selectedJob.quality_check.checklist.every(item => item.completed)
        ? "quality_check"
        : "sent_back_from_quality";
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
    <DialogTrigger className="hover:bg-gray-200 leading-[1] px-2 py-2 rounded-[2px] rounded-[4px]">Rework Checklist</DialogTrigger>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Rework Checklist - {selectedJob?.job_id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {selectedJob?.quality_check.checklist.map((remark, index) => <ChecklistItem
          key={index}
          index={index}
          remark={remark}
          setSelectedJob={setSelectedJob}
        />)}
        <DialogClose ref={closeBtnRef} />
        <Button disabled={loading} onClick={updateJob} variant="default">Update Checklist</Button>
      </div>
    </DialogContent>
  </Dialog>
}

function ChecklistItem({ remark, setSelectedJob, index }) {
  // console.log(remark)
  const [showImage, setShowImage] = useState(false);

  return <Card className="bg-[#FAFAFA] p-3 rounded-none hover:bg-gray-100 border-1 hover:shadow-lg">
    <div className="flex items-center flex-row gap-4">
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
      <Eye className="ml-auto cursor-pointer" onClick={() => setShowImage(prev => !prev)} />
    </div>
    {console.log(remark.image)}
    {showImage && <Image
      height={540}
      width={540}
      src={remark.image || "/not-found.png"}
      alt="Remark issue"
      className="w-full h-[180px] object-contain rounded-lg"
    />}
  </Card>
}