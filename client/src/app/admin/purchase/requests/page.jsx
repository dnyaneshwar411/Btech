"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import AddPurchaseModal from "@/components/pages/purchase/AddPurchaseModal";
import ContentLoader from "@/components/core/ContentLoader";
import ContentError from "@/components/core/ContentError";
import useSWR, { mutate } from "swr";
import { fetchData, sendData } from "@/api/server";
import DualOptionActionModal from "@/components/core/DualOptionActionModal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function PurchaseRequestsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const { isLoading, error, data } = useSWR("purchases/requests", () => fetchData("purchase"));
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const purchases = data.data
    .filter(purchase => purchase.status === "requested")

  async function approvePurchase(setLoading, btnRef, _id) {
    try {
      setLoading(true);
      const response = await sendData(`purchase/${_id}`, { status: "approved" }, "PUT");
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
        <h1 className="text-2xl font-semibold">Materials Requested</h1>
        <div className="flex gap-4">
          <Input placeholder="Search Purchase ID..." className="md:min-w-[350px]" />
          <Button variant="outline">Filter</Button>
          <AddPurchaseModal />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Requested Date</TableHead>
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
                  description="Is this purchse approved?"
                  action={(setLoading, btnRef) => approvePurchase(setLoading, btnRef, purchase._id)}
                >
                  <AlertDialogTrigger className="text-green-600 font-bold">Approve</AlertDialogTrigger>
                </DualOptionActionModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg rounded-none">
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
            <Button variant="default" onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
