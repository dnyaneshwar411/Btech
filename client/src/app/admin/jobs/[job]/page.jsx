"use client";

import { fetchData, sendData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import DualOptionActionModal from "@/components/core/DualOptionActionModal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const { isLoading, error, data } = useSWR(`jobs/${params.job}`, () => fetchData(`jobs/${params.job}`))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const job = data.data;

  async function deleteJob(setLoading, btnRef) {
    try {
      setLoading(true);
      const response = await sendData(`jobs/${params.job}`, {}, "DElETE");
      console.log(response)
      if (!response.success) throw new Error(response.error);
      mutate("jobs");
      toast.success(response.message || "Successfully deleted the item!");
      router.push("/admin/jobs");
      btnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Try again later!");
    } finally {
      setLoading(false);
    }
  }

  return <div>
    <DualOptionActionModal
      description="Are you sure you want to delete the job."
      action={(setLoading, btnRef) => deleteJob(setLoading, btnRef)}
    >
      <AlertDialogTrigger className="text-white bg-red-700 leading-[1] font-bold px-4 py-2 rounded-[8px]">
        Delete
      </AlertDialogTrigger>
    </DualOptionActionModal>
    <ul className="list-disc">
      <li>all the relevant details for the job</li>
      <li>companuy expenses for the job</li>
      <li>quality checks for the job if the stage is reached</li>
      <li>stage history</li>
      <li>relevant actions that can be taken on the job</li>
    </ul>
  </div>
}