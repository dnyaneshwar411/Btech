import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const storageData = [
  {
    id: 1,
    name: "Warehouse A",
    capacity: 5000,
    used: 4500,
    filled: true,
    materials: [
      { id: "m1", name: "Steel Rods", quantity: 1200, last_updated: "2024-03-20" },
      { id: "m2", name: "Copper Wires", quantity: 800, last_updated: "2024-03-18" },
      { id: "m3", name: "Plastic Granules", quantity: 2500, last_updated: "2024-03-15" },
    ],
  },
  {
    id: 2,
    name: "Warehouse B",
    capacity: 3000,
    used: 2200,
    filled: false,
    materials: [
      { id: "m4", name: "Aluminum Sheets", quantity: 900, last_updated: "2024-03-22" },
      { id: "m5", name: "Glass Panels", quantity: 500, last_updated: "2024-03-19" },
      { id: "m6", name: "Rubber Sheets", quantity: 800, last_updated: "2024-03-17" },
    ],
  },
  {
    id: 3,
    name: "Warehouse C",
    capacity: 7000,
    used: 6500,
    filled: true,
    materials: [
      { id: "m7", name: "Wood Planks", quantity: 3000, last_updated: "2024-03-21" },
      { id: "m8", name: "Cement Bags", quantity: 2500, last_updated: "2024-03-16" },
      { id: "m9", name: "Iron Pipes", quantity: 1000, last_updated: "2024-03-14" },
    ],
  },
  {
    id: 4,
    name: "Warehouse D",
    capacity: 4000,
    used: 1800,
    filled: false,
    materials: [
      { id: "m10", name: "Bricks", quantity: 900, last_updated: "2024-03-23" },
      { id: "m11", name: "Tiles", quantity: 500, last_updated: "2024-03-20" },
      { id: "m12", name: "Paint Cans", quantity: 400, last_updated: "2024-03-18" },
    ],
  },
];

export default function Page() {
  return <div className="md:p-6 space-y-6">
    <h2 className="text-2xl font-semibold tracking-tight">Storage Inventory</h2>

    <Accordion type="single" defaultValue="location-1">
      <div className="grid grid-cols-1 lg:grid- cols-2 items-start gap-4">
        {storageData.map((location) => (
          <AccordionItem key={location.id} value={`location-${location.id}`} className="bg-[#FAFAFA] hover:[&_.progress]:opacity-100 border-b-0 border-1">
            <AccordionTrigger className="bg-gray-100 text-lg font-medium p-4 items-center justify-between">
              <div>{location.name}</div>
              <Badge variant={location.filled ? "destructive" : "default"} className="ml-auto">
                {location.filled ? "Full" : "Available"}
              </Badge>
            </AccordionTrigger>
            <Progress value={(location.used / location.capacity) * 100} className="progress h-[3px] mb-0 opacity-10" />
            <AccordionContent className="p-4">
              <Table className="border border-gray-200 rounded-lg shadow-sm">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {location.materials.map((material) => (
                    <TableRow key={material.id} className="hover:bg-gray-50 transition">
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.quantity} units</TableCell>
                      <TableCell>{new Date(material.last_updated).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  </div>
}