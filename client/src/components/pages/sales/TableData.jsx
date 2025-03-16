import TableNoDataFound from "@/components/core/TableNoDataFound";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { productionStage } from "@/lib/formatter";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function TableData({
  data
}) {
  const router = useRouter();

  if (data.length === 0) return <TableNoDataFound colSpan="6" />

  return <TableBody>
    {data.map(item => <TableRow
      key={item.job_id}
      onClick={() => router.push(`/admin/jobs/${item.job_id}`)}
      className="cursor-pointer"
    >
      <TableCell className="font-medium">{item.job_id}</TableCell>
      <TableCell>{item.requested_by.name || "Pranav Dhadwad"}</TableCell>
      <TableCell>{item.sale_amount}</TableCell>
      <TableCell>{item.company_expense.reduce((acc, { amount = 0 }) => acc + amount, 0)}</TableCell>
      <TableCell>{productionStage(item.stage)}</TableCell>
      <TableCell>{format(new Date(item.createdAt), "dd/MM/yyyy")}</TableCell>
    </TableRow>
    )}
  </TableBody >
}