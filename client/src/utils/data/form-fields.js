export const clientDetailsFields = [
  { id: 1, label: "Name", name: "name", inputtype: 1 },
  { id: 2, label: "Email", name: "email", inputtype: 1, type: "email" },
  { id: 3, label: "Phone", name: "phone", inputtype: 1, type: "number" },
  { id: 4, label: "Address", name: "address", inputtype: 1 },
  { id: 5, label: "Company Name", name: "company_name", inputtype: 1 },
  {
    id: 6,
    label: "Status",
    name: "status",
    inputtype: 2,
    options: [
      { id: 1, name: "Active", value: "active" },
      { id: 2, name: "Inactive", value: "inactive" },
    ],
    defaultValue: "active"
  },
  {
    id: 7,
    label: "Type",
    name: "type",
    inputtype: 2,
    options: [
      { id: 1, name: "Individual", value: "individual" },
      { id: 2, name: "Group", value: "group" },
    ],
    defaultValue: "individual"
  },
];

export const materialFieldNames = [
  "name", "material_id", "description", "unit_price", "unit",
  "stock_quantity", "category", "supplier.name", "supplier.contact",
  "supplier.email", "supplier.phone", "status", "minimum_stock", "quantity_available"
];

export const materialFields = [
  { id: 1, label: "Name", name: "name", inputtype: 1 },
  { id: 2, label: "Material ID", name: "material_id", inputtype: 1 },
  { id: 3, label: "Description", name: "description", inputtype: 1 },
  { id: 4, label: "Unit Price", name: "unit_price", inputtype: 1, type: "number" },
  {
    id: 5,
    label: "Unit",
    name: "unit",
    inputtype: 2,
    options: [
      { id: 1, name: "kg", value: "kg" },
      { id: 2, name: "g", value: "g" },
      { id: 3, name: "l", value: "l" },
      { id: 4, name: "ml", value: "ml" },
      { id: 5, name: "m", value: "m" },
      { id: 6, name: "cm", value: "cm" },
      { id: 7, name: "Piece", value: "piece" },
      { id: 8, name: "Box", value: "box" },
      { id: 9, name: "Set", value: "set" },
    ],
    defaultValue: "piece",
  },
  { id: 6, label: "Stock Quantity", name: "stock_quantity", inputtype: 1, type: "number" },
  { id: 7, label: "Category", name: "category", inputtype: 1 },
  { id: 8, label: "Supplier Name", name: "supplier.name", inputtype: 1 },
  { id: 9, label: "Supplier Contact", name: "supplier.contact", inputtype: 1 },
  { id: 10, label: "Supplier Email", name: "supplier.email", inputtype: 1, type: "email" },
  { id: 11, label: "Supplier Phone", name: "supplier.phone", inputtype: 1, type: "number" },
  {
    id: 12,
    label: "Status",
    name: "status",
    inputtype: 2,
    options: [
      { id: 1, name: "Available", value: "available" },
      { id: 2, name: "Low Stock", value: "low_stock" },
      { id: 3, name: "Out of Stock", value: "out_of_stock" },
    ],
    defaultValue: "available",
  },
  { id: 13, label: "Minimum Stock", name: "minimum_stock", inputtype: 1, type: "number" },
  { id: 14, label: "Quantity Available", name: "quantity_available", inputtype: 1, type: "number" },
];
