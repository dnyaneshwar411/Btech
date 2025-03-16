import Modal from "@/components/core/Modal";
import { useState } from "react";

export default function NewClientModal() {
  const [opened, setOpened] = useState(false);

  return <>
    <button
      onClick={() => setOpened(true)}
      className="bg-primary hover:bg-white hover:text-black hover:shadow-lg text-white font-semibold px-4 py-2"
    >
      New Client
    </button>
    {opened && <Modal
      onClose={() => setOpened(false)}
      className="flex items-center justify-center"
    >
      <div
        className="bg-white max-w-[450px] w-full p-4"
      >
        New Client Modal
      </div>
    </Modal>}
  </>
}