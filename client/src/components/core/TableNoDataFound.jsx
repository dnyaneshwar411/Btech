import {
  TableBody,
  TableCell,
  TableRow
} from "../ui/table";

export default function TableNoDataFound({
  colSpan
}) {
  return <TableBody className="h-40 text-center font-bold">
    <TableRow>
      <TableCell colSpan={colSpan}>No item found</TableCell>
    </TableRow>
  </TableBody>
}