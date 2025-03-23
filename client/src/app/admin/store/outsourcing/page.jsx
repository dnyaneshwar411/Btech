import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const outsourcingData = [
  {
    id: 1,
    name: "Steel Rods",
    quantity: 500,
    urgent: true,
    outsourced_from: "Indiana Jones"
  },
  {
    id: 2,
    name: "Aluminum Sheets",
    quantity: 300,
    urgent: false,
    outsourced_from: "Indiana Jones"
  },
  {
    id: 3,
    name: "Copper Wires",
    quantity: 200,
    urgent: true,
    outsourced_from: "Indiana Jones"
  },
  {
    id: 4,
    name: "Plastic Granules",
    quantity: 1000,
    urgent: false,
    outsourced_from: "Indiana Jones"
  },
  {
    id: 5,
    name: "Glass Panels",
    quantity: 150,
    urgent: true,
    outsourced_from: "Indiana Jones"
  },
];

const storageLocations = [
  { id: "loc1", name: "Warehouse A", capacity: 2000, used: 1500 },
  { id: "loc2", name: "Warehouse B", capacity: 3000, used: 2400 },
  { id: "loc3", name: "Warehouse C", capacity: 1000, used: 500 },
  { id: "loc4", name: "Warehouse D", capacity: 5000, used: 4200 },
];


export default function Page() {
  return <div className="p-6 space-y-6">
    <h2 className="text-2xl font-semibold tracking-tight">Storage Outsourcing</h2>
    <Table className="border border-gray-200 rounded-lg shadow-sm">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Material</TableHead>
          <TableHead>Purchased From</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Urgency</TableHead>
          <TableHead>Store At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {outsourcingData.map((material) => (
          <TableRow key={material.id} className="hover:bg-gray-50 transition">
            <TableCell>{material.name}</TableCell>
            <TableCell>{material.outsourced_from}</TableCell>
            <TableCell>{material.quantity} units</TableCell>
            <TableCell>
              <Badge variant={material.urgent ? "destructive" : "default"}>
                {material.urgent ? "Urgent" : "Normal"}
              </Badge>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className="w-full border border-gray-300 rounded-md select-none">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
                  {storageLocations.map((location) => (
                    <SelectItem key={location.id} value={location.name}>
                      {location.name} ({location.capacity - location.used} units free)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
}