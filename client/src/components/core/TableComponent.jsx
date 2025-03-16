import {
  Table,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";

export default function TableComponent({
  headers,
  component
}) {
  return <Table>
    <TableHeader>
      <TableRow>
        {headers.map((heading, index) => <TableHead
          key={index}
          className="w-[100px]"
        >
          {heading}
        </TableHead>)}
      </TableRow>
    </TableHeader>
    {component}
  </Table>

}