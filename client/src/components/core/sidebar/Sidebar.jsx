"use client";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  Truck,
  Home,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  return <div
    className={`bg-gray-100 dark:bg-base-secondary shadow-lg transition-all duration-300 ease-in-out relative overflow-hidden border-r border-gray-200 dark:border-base-border fixed md:static top-0 ${sidebarOpen ? "w-64 left-0" : "w-0 left-[-100%]"} md:w-64`}>

    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-base-border">
      <div className="flex items-center">
        <Package className="h-6 w-6 text-accent-primary" />
        <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-text-primary">Inventory</span>
      </div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`p-1 hover:bg-gray-100 dark:hover:bg-base-card md:hidden ${!sidebarOpen && "fixed left-2 top-4"}`}
      >
        {sidebarOpen
          ? <X className="h-6 w-6 text-gray-600 dark:text-text-primary" />
          : <Menu className="h-6 w-6 text-gray-600 dark:text-text-primary" />}
      </button>
    </div>

    {/* Sidebar Navigation */}
    <nav className="mt-5 px-2">
      <SidebarItem icon={<Home className="h-4 w-4" />} title="Sales" path="/admin/sales" currentPath={pathname} />

      <SidebarItemWithChildren
        icon={<Package className="h-4 w-4" />}
        title="Inventory"
        isActive={pathname.includes("/inventory")}
        defaultOpen={pathname.includes("/inventory")}
      >
        <SidebarSubItem title="Products" path="/inventory/products" currentPath={pathname} />
        <SidebarSubItem title="Categories" path="/inventory/categories" currentPath={pathname} />
        <SidebarSubItem title="Stock Levels" path="/inventory/stock" currentPath={pathname} />
      </SidebarItemWithChildren>

      <SidebarItemWithChildren
        icon={<ShoppingCart className="h-4 w-4" />}
        title="Orders"
        isActive={pathname.includes("/orders")}
        defaultOpen={pathname.includes("/orders")}
      >
        <SidebarSubItem title="All Orders" path="/orders/all" currentPath={pathname} />
        <SidebarSubItem title="Pending" path="/orders/pending" currentPath={pathname} />
        <SidebarSubItem title="Completed" path="/orders/completed" currentPath={pathname} />
      </SidebarItemWithChildren>

      <SidebarItemWithChildren
        icon={<Truck className="h-4 w-4" />}
        title="Suppliers"
        isActive={pathname.includes("/suppliers")}
        defaultOpen={pathname.includes("/suppliers")}
      >
        <SidebarSubItem title="All Suppliers" path="/suppliers/all" currentPath={pathname} />
        <SidebarSubItem title="Purchase Orders" path="/suppliers/purchase-orders" currentPath={pathname} />
      </SidebarItemWithChildren>

      <SidebarItem
        icon={<Users className="h-4 w-4" />}
        title="Customers"
        path="/customers"
        currentPath={pathname}
      />

      <SidebarItem icon={<BarChart className="h-4 w-4" />} title="Reports" path="/reports" currentPath={pathname} />

      <SidebarItem
        icon={<Settings className="h-4 w-4" />}
        title="Settings"
        path="/settings"
        currentPath={pathname}
      />
    </nav>
  </div>

}

// Single sidebar item component
function SidebarItem({ icon, title, path, currentPath }) {
  const isActive = path === currentPath

  return (
    <Link
      href={path}
      className={`
        flex items-center py-2 px-3 mb-1 transition-colors
        ${isActive
          ? "bg-green-50 dark:bg-base-card text-accent-primary"
          : "text-gray-700 dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-base-card"
        }
      `}
    >
      <span className={`${isActive ? "text-accent-primary" : "text-gray-500 dark:text-text-secondary"}`}>{icon}</span>
      <span className="ml-3">{title}</span>
    </Link>
  )
}

// Sidebar item with children (collapsible)
function SidebarItemWithChildren({ icon, title, children, isActive, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center py-2 px-3 transition-colors
          ${isActive
            ? "bg-green-50 dark:bg-base-card text-accent-primary"
            : "text-gray-700 dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-base-card"
          }
        `}
      >
        <span className={`${isActive ? "text-accent-primary" : "text-gray-500 dark:text-text-secondary"}`}>{icon}</span>
        <span className="ml-3 flex-1 text-left">{title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {isOpen && <div className="ml-4 mt-1 pl-2 border-l border-gray-200 dark:border-base-border">{children}</div>}
    </div>
  )
}

// Sidebar sub-item component
function SidebarSubItem({ title, path, currentPath }) {
  const isActive = path === currentPath

  return (
    <Link
      href={path}
      className={`
        flex items-center py-2 px-3 mb-1 transition-colors text-sm
        ${isActive
          ? "bg-green-50 dark:bg-base-card text-accent-primary"
          : "text-gray-700 dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-base-card"
        }
      `}
    >
      <div className={`w-1.5 h-1.5 mr-2 ${isActive ? "bg-accent-primary" : "bg-gray-400 dark:bg-text-disabled"}`}></div>
      <span>{title}</span>
    </Link>
  )
}