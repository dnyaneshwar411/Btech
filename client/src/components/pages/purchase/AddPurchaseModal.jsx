import { fetchData, sendData } from "@/api/server";
import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { purchaseFieldNames, purchaseFields } from "@/utils/data/form-fields";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

export default function AddPurchaseModal() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({ status: "requested" }))

  const closeBtnRef = useRef(null);

  async function addNewPurchaseMaterial() {
    try {
      setLoading(true);
      for (const field of purchaseFieldNames) {
        if (!formData[field]) throw new Error(`Please enter the field - ${field}. It is compulsory!`);
      }
      const response = await sendData("purchase", formData, "POST");
      if (!response.success) throw new Error(response.error);
      toast.success(response.message || "Successfull!");
      mutate("materials")
      closeBtnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Please try again later!");
    } finally {
      setLoading(false);
    }
  }

  return <Dialog>
    <DialogTrigger className="bg-green-600 text-white font-bold leading-[1] px-4 py-2 rounded-[10px]">
      Add
    </DialogTrigger>
    <DialogContent className="!max-w-[550px] text-center border-0 p-0 overflow-auto gap-0">
      <DialogHeader className="px-4 py-3 border-b-1">
        <DialogTitle className="text-[24px] p-0">Create A New Purchase</DialogTitle>
      </DialogHeader>
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-x-4 ">
          {purchaseFields.map(field => selectComponent(field, formData, setFormData))}
          <SelectMaterial value={formData.requested_material || ""} setFormData={setFormData} />
        </div>
        <Button
          onClick={addNewPurchaseMaterial}
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

function selectComponent(field, formData, setFormData) {
  switch (field.inputtype) {
    case 1:
      return <div key={field.id} className="text-left">
        <label>{field.label}</label>
        <Input
          value={formData[field.name] || ""}
          onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          placeholder={`Enter ${field.name}`}
          className="mb-4"
          {...field}
        />
      </div>
    case 2:
      return <div key={field.id} className="text-left">
        <label>{field.label}</label>
        <SelectControl
          field={field}
          value={formData[field.name]}
          onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
        />
      </div>
    default:
      break;
  }
}

function SelectControl({ field, value, onChange }) {
  return <Select
    value={value}
    onValueChange={value => onChange(field.name, value)}
    className="!bg-red-200 !w-full mb-4"
  >
    <SelectTrigger className="w-full mb-4">
      <SelectValue placeholder={field.label} />
    </SelectTrigger>
    <SelectContent>
      {field.options.map(option => <SelectItem
        key={option.id}
        value={option.value}
      >
        {option.name}
      </SelectItem>)}
    </SelectContent>
  </Select>
}

function SelectMaterial({ value, setFormData }) {
  const { isLoading, error, data } = useSWR("materials", () => fetchData("materials"))
  if (isLoading) return <Loader />
  if (error || !data.success) return <ContentError className="max-h-auto border-0" title={error || data.error} />
  const materials = data.data
  return <label className="text-left">
    Select Material
    <select
      value={value}
      onChange={e => setFormData(prev => ({ ...prev, requested_material: e.target.value }))}
      className="w-full px-4 py-2 rounded-[4px] focus:outline-none border-1"
    >
      {materials.map(option => <option key={option._id} value={option._id}>{option.material_id}</option>)}
    </select>
  </label>
}