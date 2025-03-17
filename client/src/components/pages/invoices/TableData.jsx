import TableNoDataFound from "@/components/core/TableNoDataFound";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function TableData({
  data
}) {
  if (data.length === 0) return <TableNoDataFound colSpan="6" />

  return <TableBody>
    {data.map((item, index) => <TableRow key={index}>
      <TableCell>{index}</TableCell>
      <TableCell className="font-medium">{item.client}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{format(new Date(item.due_date), "dd-MM-yyyy")}</TableCell>
      <TableCell>{item.generated_by}</TableCell>
    </TableRow>
    )}
  </TableBody>
}