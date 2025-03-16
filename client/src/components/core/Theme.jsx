"use client";
import {
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";

export default function Theme() {
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  return <button
    onClick={() => setDarkMode(prev => !prev)}
    className="p-1 hover:bg-gray-100 dark:hover:bg-base-card"
  >
    {darkMode
      ? <Sun className="h-5 w-5 text-text-primary" />
      : <Moon className="h-5 w-5 text-gray-600" />}
  </button>
}