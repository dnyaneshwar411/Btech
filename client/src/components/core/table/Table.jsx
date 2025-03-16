import TableData from "./TableData";
import TableHeader from "./TableHeader";

export default function Table() {
  return <table className="min-w-full bg-white whitespace-nowrap border-collapse [&_td]:border-[1px] [&_th]:border-[1px] [&_td]:border-[#DEDEDE] [&_td]:px-2 [&_th]:px-2 [&_td]:py-1 [&_th]:py-1">
    <TableHeader headings={["heading 1", "heading 2", "heading 3"]} />
    <TableData data={[]} />
  </table>
}