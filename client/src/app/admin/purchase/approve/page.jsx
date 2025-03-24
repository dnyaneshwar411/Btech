"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const approvedPurchases = [
  {
    _id: "PUR-002",
    seller: { name: "XYZ Traders", email: "xyz@traders.com", contact: "9988776655" },
    purchase_cost: 12000,
    requested_material: { name: "Aluminium Sheets" },
    requested_material_quantity: 250,
    status: "approved",
    requested_date: new Date("2024-03-15")
  }
];

export default function PurchasesApprovedPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setOpenDialog(true);
  };

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
          {approvedPurchases.map((purchase) => (
            <TableRow key={purchase._id}>
              <TableCell>{purchase._id}</TableCell>
              <TableCell>{purchase.requested_material.name}</TableCell>
              <TableCell>{purchase.requested_material_quantity}</TableCell>
              <TableCell>₹{purchase.purchase_cost}</TableCell>
              <TableCell>{format(new Date(purchase.requested_date), "dd MMM yyyy")}</TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={() => handleViewDetails(purchase)} variant="outline" className="px-4 py-2 rounded-none">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
            <Button variant="default" onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}