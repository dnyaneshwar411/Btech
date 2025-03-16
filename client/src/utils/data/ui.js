import {
  Home,
  Package,
  ShoppingCart,
  Truck,
  Users,
  BarChart,
  Settings,
  ShoppingCartIcon,
  ShoppingBasket,
  Archive,
  Wrench,
  Search
} from "lucide-react";

export const sidebar = [
  {
    id: 1,
    icon: <Home className="h-4 w-4" />,
    title: "Dashboard",
    path: "/admin"
  },
  {
    id: 2,
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    title: "Sales",
    path: "/admin/sales"
  },
  {
    id: 3,
    icon: <Package className="h-4 w-4" />,
    title: "Jobs",
    path: "/admin/jobs",
  },
  {
    id: 4,
    icon: <ShoppingBasket className="h-4 w-4" />,
    title: "Purchase",
    path: "/admin/purchase",
    // children: [
    //   {
    //     id: 1,
    //     title: "All Orders",
    //     path: "/admin/orders/all"
    //   },
    //   {
    //     id: 2,
    //     title: "Pending",
    //     path: "/admin/orders/pending"
    //   },
    //   {
    //     id: 3,
    //     title: "Completed",
    //     path: "/admin/orders/completed"
    //   }
    // ]
  },
  {
    id: 5,
    icon: <Archive className="h-4 w-4" />,
    title: "Storage",
    path: "/admin/storage",
    // children: [
    //   {
    //     id: 1,
    //     title: "All Suppliers",
    //     path: "/admin/suppliers/all"
    //   },
    //   {
    //     id: 2,
    //     title: "Purchase Orders",
    //     path: "/admin/suppliers/purchase-orders"
    //   }
    // ]
  },
  {
    id: 6,
    icon: <Wrench className="h-4 w-4" />,
    title: "Production",
    path: "/admin/production"
  },
  {
    id: 600,
    icon: <Search className="h-4 w-4" />,
    title: "Quality Assurance",
    path: "/admin/quality-assurance"
  },
  {
    id: 700,
    icon: <Settings className="h-4 w-4" />,
    title: "Settings",
    path: "/admin/settings"
  }
];
