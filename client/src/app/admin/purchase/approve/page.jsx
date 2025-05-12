"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import useSWR, { mutate } from "swr";
import { fetchData, sendData } from "@/api/server";
import ContentLoader from "@/components/core/ContentLoader";
import ContentError from "@/components/core/ContentError";
import DualOptionActionModal from "@/components/core/DualOptionActionModal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

const nextStage = {
  "approved": {
    status: "dispatched",
    title: "To Dispatch"
  },
  "dispatched": {
    status: "completed",
    title: "To Complete"
  }
}

export default function PurchasesApprovedPage() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const { isLoading, error, data } = useSWR("purchases/requests", () => fetchData("purchase"));
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const purchases = data.data
    .filter(purchase => ["approved", "dispatched"].includes(purchase.status))

  async function approvePurchase(setLoading, btnRef, _id, status) {
    try {
      setLoading(true);
      const response = await sendData(`purchase/${_id}`, { status }, "PUT");
      console.log(response)
      if (!response.success) throw new Error(response.error);
      mutate("purchases/requests");
      toast.success(response.message || "Successfull!");
      btnRef.current.click();
    } catch (error) {
      toast.error(error.message || "Try again later!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Approved Purchases</h1>
        <div className="flex gap-4">
          <Input placeholder="Search Purchase ID..." className="md:min-w-[350px]" />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Approved Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase._id}>
              <TableCell>{purchase?.requested_material?.material_id}</TableCell>
              <TableCell>{purchase?.requested_material?.name}</TableCell>
              <TableCell>{purchase.requested_material_quantity}</TableCell>
              <TableCell>₹{purchase.purchase_cost}</TableCell>
              <TableCell>{format(new Date(purchase.requested_date), "dd MMM yyyy")}</TableCell>
              <TableCell className="flex gap-2">
                <DualOptionActionModal
                  description="Are you sure to change the status?"
                  action={(setLoading, btnRef) => approvePurchase(setLoading, btnRef, purchase._id, nextStage[purchase.status].status)}
                >
                  <AlertDialogTrigger className="text-green-600 font-bold">{nextStage[purchase.status].title}</AlertDialogTrigger>
                </DualOptionActionModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Purchase Details - {selectedPurchase?._id}</DialogTitle>
          </DialogHeader>
          <div>
            <Card className="bg-[#FAFAFA] p-4 mb-4 gap-2 rounded-none hover:bg-gray-100">
              <p><strong>Seller:</strong> {selectedPurchase?.seller.name}</p>
              <p><strong>Email:</strong> {selectedPurchase?.seller.email}</p>
              <p><strong>Contact:</strong> {selectedPurchase?.seller.contact}</p>
            </Card>
            <Card className="bg-[#FAFAFA] p-4 gap-2 rounded-none hover:bg-gray-100">
              <p><strong>Material:</strong> {selectedPurchase?.requested_material.name}</p>
              <p><strong>Quantity:</strong> {selectedPurchase?.requested_material_quantity}</p>
              <p><strong>Cost:</strong> ₹{selectedPurchase?.purchase_cost}</p>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="default">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}