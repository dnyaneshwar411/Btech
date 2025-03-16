import Modal from "@/components/core/Modal";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function FilterJobs() {
  const [opened, setOpened] = useState(false);

  return <>
    <button
      className=""
      onClick={() => setOpened(true)}
    >
      <Filter className="w-6 h-6" />
    </button>
    {opened && <Modal
      className="flex items-center justify-center"
      onClose={() => setOpened(false)}
    >
      <div className="max-w-[450px] bg-white w-full p-4">
        Filtering Options
      </div>
    </Modal>}
  </>
}