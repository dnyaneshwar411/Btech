export default function TableData({ data }) {
  return <tbody>
    {data.map((row, index) => <tr
      key={index}
    >
      {index}
    </tr>)}
  </tbody>
}