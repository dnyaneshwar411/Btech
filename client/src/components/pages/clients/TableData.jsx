import TableNoDataFound from "@/components/core/TableNoDataFound";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function TableData({
  data
}) {
  if (data.length === 0) return <TableNoDataFound colSpan="6" />

  return <TableBody>
    {data.map((item, index) => <TableRow key={item.email}>
      <TableCell>{index}</TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.jobs.length}</TableCell>
    </TableRow>
    )}
  </TableBody >
}