import { LayoutDashboard, Package, Users, FileText, Box, ShoppingBasket, Factory, ShieldCheck, Truck, CreditCard, Settings, UserCog } from "lucide-react";

export const sidebar = [
  {
    id: 1,
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "Dashboard",
    path: "/admin",
  },
  {
    id: 2,
    icon: <Package className="h-4 w-4" />,
    title: "Jobs",
    path: "/admin/jobs",
  },
  {
    id: 3,
    icon: <Users className="h-4 w-4" />,
    title: "Clients",
    path: "/admin/clients",
  },
  {
    id: 4,
    icon: <FileText className="h-4 w-4" />,
    title: "Invoices",
    path: "/admin/invoices",
  },
  {
    id: 5,
    icon: <Box className="h-4 w-4" />,
    title: "Materials",
    path: "/admin/materials",
  },
  {
    id: 6,
    icon: <ShoppingBasket className="h-4 w-4" />,
    title: "Purchase",
    path: "/admin/purchase",
    children: [
      { id: 1, title: "Material Requests", path: "/admin/purchase/requests" },
      { id: 2, title: "Approve Purchases", path: "/admin/purchase/approve" },
    ],
  },
  {
    id: 7,
    icon: <Factory className="h-4 w-4" />,
    title: "Store",
    path: "/admin/store",
    children: [
      { id: 1, title: "Storage Inventory", path: "/admin/store/inventory" },
      { id: 2, title: "Outsourcing Requests", path: "/admin/store/outsourcing" },
    ],
  },
  {
    id: 8,
    icon: <Factory className="h-4 w-4" />,
    title: "Production",
    path: "/admin/production",
    children: [
      { id: 1, title: "In Production", path: "/admin/production/ongoing" },
      { id: 2, title: "Sent Back from Quality", path: "/admin/production/rework" },
    ],
  },
  {
    id: 9,
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Quality Control",
    path: "/admin/quality",
    children: [
      { id: 1, title: "Pending Checks", path: "/admin/quality/pending" },
      { id: 2, title: "Rejected Jobs", path: "/admin/quality/rejected" },
    ],
  },
  {
    id: 10,
    icon: <Truck className="h-4 w-4" />,
    title: "Dispatch",
    path: "/admin/dispatch",
    children: [
      { id: 1, title: "Ready for Dispatch", path: "/admin/dispatch/ready" },
      { id: 2, title: "Dispatch History", path: "/admin/dispatch/history" },
    ],
  },
  {
    id: 11,
    icon: <CreditCard className="h-4 w-4" />,
    title: "Accounting",
    path: "/admin/accounts",
    children: [
      { id: 1, title: "Expense Tracking", path: "/admin/accounts/expenses" },
      { id: 2, title: "Financial Reports", path: "/admin/accounts/reports" },
    ],
  },
  {
    id: 12,
    icon: <UserCog className="h-4 w-4" />,
    title: "User Management",
    path: "/admin/users",
  },
  {
    id: 13,
    icon: <Settings className="h-4 w-4" />,
    title: "Settings",
    path: "/admin/settings",
    children: [
      { id: 1, title: "Company Details", path: "/admin/settings/company" },
      { id: 2, title: "Job Stages", path: "/admin/settings/stages" },
    ],
  },
];
