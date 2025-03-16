import Modal from "@/components/core/Modal";
import { useState } from "react";

export default function CreateJobModal() {
  const [opened, setOpened] = useState(false);

  return <>
    <button
      onClick={() => setOpened(true)}
      className="bg-green-600 hover:bg-green-700 text-white hover:shadow-lg font-semibold px-4 py-2"
    >
      Create
    </button>
    {opened && <Modal
      onClose={() => setOpened(false)}
      className="flex items-center justify-center"
    >
      <div
        className="bg-white max-w-[450px] w-full p-4"
      >
        New Job Modal
      </div>
    </Modal>}
  </>
}