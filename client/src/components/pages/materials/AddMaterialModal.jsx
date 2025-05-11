import { sendData } from "@/api/server";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { materialFieldNames, materialFields } from "@/utils/data/form-fields";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function AddMaterialModal() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({ unit: "kg", status: "available" }))

  const closeBtnRef = useRef(null);

  async function addClient() {
    try {
      setLoading(true);
      for (const field of materialFieldNames) {
        if (!formData[field]) throw new Error(`Please enter the field - ${field}. It is compulsory!`);
      }
      const response = await sendData("materials", formData, "POST");
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
        <DialogTitle className="text-[24px] p-0">Add Material</DialogTitle>
      </DialogHeader>
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-x-4 ">
          {materialFields.map(field => selectComponent(field, formData, setFormData))}
        </div>
        <Button
          onClick={addClient}
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
      return <Input
        key={field.id}
        value={formData[field.name] || ""}
        onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        placeholder={`Enter ${field.name}`}
        className="mb-4"
        {...field}
      />
    case 2:
      return <SelectControl
        key={field.id}
        field={field}
        value={formData[field.name]}
        onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
      />
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