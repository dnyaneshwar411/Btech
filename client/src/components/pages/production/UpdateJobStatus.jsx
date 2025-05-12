import { sendData } from "@/api/server";
// import SelectControl from "@/components/core/SelectControl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { materialFieldNames, materialFields } from "@/utils/data/form-fields";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SelectControl from "@/components/core/SelectControl";

const formField = {
  name: "status",
  label: "Select Status",
  options: [
    { id: 1, name: "Created", value: "created" },
    { id: 2, name: "Design Approved", value: "design_approved" },
    { id: 3, name: "Material Ordered", value: "material_ordered" },
    { id: 4, name: "Production Started", value: "production_started" },
    { id: 5, name: "Quality Check", value: "quality_check" },
    { id: 6, name: "Packaging", value: "packaging" },
    { id: 7, name: "Ready For Delivery", value: "ready_for_delivery" },
    { id: 8, name: "Delivered", value: "delivered" },
    { id: 9, name: "Completed", value: "completed" },
    { id: 10, name: "Cancelled", value: "cancelled" },
    { id: 11, name: "Sent Back From Quality", value: "sent_back_from_quality" },
  ]
}

export default function UpdateJobStatus({
  _id,
  onClose,
  defaultValue
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => defaultValue);

  const closeBtnRef = useRef(null);

  async function updateStatus() {
    try {
      setLoading(true);
      const response = await sendData(`jobs/${_id}/stage`, { stage: formData }, "PATCH");
      if (!response.success) throw new Error(response.error);
      toast.success(response.message || "Successfull!");
      mutate("jobs");
      if (onClose) onClose();
      closeBtnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Please try again later!");
    } finally {
      setLoading(false);
    }
  }

  return <Dialog>
    <DialogTrigger className="hover:bg-gray-200 leading-[1] px-2 py-2 rounded-[2px] rounded-[4px]">
      Update Status
    </DialogTrigger>
    <DialogContent className="!max-w-[550px] text-left border-0 p-0 overflow-auto gap-0">
      <DialogHeader className="px-4 py-3 border-b-1">
        <DialogTitle className="text-[24px] p-0">Add Job Status</DialogTitle>
      </DialogHeader>
      <div className="px-4 py-4">
        <SelectControl
          field={formField}
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <Button
          onClick={updateStatus}
          disabled={loading}
          className="mt-10"
        >
          Submit
        </Button>
        <DialogClose ref={closeBtnRef} />
      </div>
    </DialogContent>
  </Dialog>
}