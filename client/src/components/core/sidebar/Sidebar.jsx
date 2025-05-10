"use client";
import { sidebar } from "@/utils/data/ui";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Package,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return <div
    className={`h-screen bg-gray-100 dark:bg-base-secondary shadow-lg transition-all duration-300 ease-in-out relative flex flex-col overflow-x-hidden border-r border-gray-200 dark:border-base-border fixed md:static top-0 ${sidebarOpen ? "w-64 left-0" : "w-0 left-[-100%]"} md:w-64`}
  >

    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-base-border">
      <div className="min-h-20 flex items-center">
        <Package className="h-10 w-6 text-accent-primary" />
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

    <aside className="h-full mt-5 px-2 overflow-y-auto">
      {sidebar.map(item => item.children
        ? <ParentSidebar
          key={item.id}
          item={item}
        />
        : <SidebarItem
          key={item.id}
          currentPath={pathname}
          {...item}
        />
      )}
    </aside>

    <div className=" pt-4">
      <button className="w-[calc(100%-32px)] bg-white dakr:bg-black hover:bg-gray-200 dark:hover:bg-base-card font-bold text-left px-4 py-2 mt-auto m-4 flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  </div>

}

function ParentSidebar({
  item
}) {
  const pathname = usePathname()

  return <SidebarItemWithChildren
    key={item.id}
    {...item}
    isActive={pathname.includes(item.path)}
    defaultOpen={pathname.includes(item.path)}
  >
    {item.children.map(children => <SidebarSubItem
      key={children.id}
      currentPath={pathname}
      {...children}
    />)}
  </SidebarItemWithChildren>
}

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