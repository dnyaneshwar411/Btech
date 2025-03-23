import TableNoDataFound from "@/components/core/TableNoDataFound";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function TableData({
  data
}) {
  if (data.length === 0) return <TableNoDataFound colSpan="6" />

  return <TableBody>
    {data.map((item, index) => <TableRow
      key={index}
      className="cursor-pointer"
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.material_id}</TableCell>
      <TableCell>{item.quantity_available}</TableCell>
      <TableCell>{item.storage.length}</TableCell>
      <TableCell>{item.availability ? <>Yes</> : <>No</>}</TableCell>
    </TableRow>
    )}
  </TableBody >
}