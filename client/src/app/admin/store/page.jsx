export default function Page() {
  return <div>
    <ul className="list-disc">
      <li>Listing of the products currently stored in racks</li>
      <li>searching by location, product name / id</li>
      <li>pagination</li>
      <li>
        actions -
        <ul className="list-disc pl-4">
          <li>move the item to other location</li>
          <li>remove item from the location</li>
          <li>add a product to a specific location</li>
        </ul>
      </li>
    </ul>
  </div>
}