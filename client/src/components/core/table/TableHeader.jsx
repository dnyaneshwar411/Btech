export default function TableHeader({ headings }) {
  return (
    <thead>
      <tr>
        <th>Sr No</th>
        {headings?.map((heading, index) => <th key={index}>
          {heading}
        </th>)}
      </tr>
    </thead>
  )
}