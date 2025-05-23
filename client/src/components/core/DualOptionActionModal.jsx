import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

export default function DualOptionActionModal({
  children,
  description,
  action
}) {
  const [loading, setLoading] = useState(false);
  const closeBtnRef = useRef();

  return <AlertDialog>
    {children}
    <AlertDialogContent className="!max-w-[450px] text-center border-0 px-0 overflow-auto gap-0">
      <AlertDialogTitle className="text-[24px]">Are you sure?</AlertDialogTitle>
      {description && <AlertDialogDescription className="text-[var(--dark-1)]/50 mb-4">{description}</AlertDialogDescription>}
      <div>
        <AlertDialogCancel
          ref={closeBtnRef}
          className="mr-2 py-[9px] px-4 rounded-[8px]"
        >
          Cancel
        </AlertDialogCancel>
        <Button onClick={() => action(setLoading, closeBtnRef)} disabled={loading}>Confirm</Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>

}