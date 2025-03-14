import Modal from "./Modal"
import { X } from "lucide-react"

export default function YesNoModal({
  title,
  onProceed,
  onClose
}) {
  return <Modal className="px-4 flex items-center justify-center">
    <div className="max-w-[400px] w-full max-h-[70vh] overflow-y-auto bg-white text-left p-4 rounded-md relative">
      <X
        onClick={onClose}
        className="h-[20px] w-[20px] absolute right-4 top-4 cursor-pointer"
      />
      <h2 className="text-[20px] font-bold mb-4">{title}</h2>
      <button
        className="bg-green-600 text-white font-bold px-4 py-2 rounded-md"
        onClick={onProceed}>
        Yes
      </button>
      <button
        onClick={onClose}
        className="bg-red-600 text-white font-bold ml-2 px-4 py-2 rounded-md">
        No
      </button>
    </div>
  </Modal>
}