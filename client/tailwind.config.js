/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./pages/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Primary Colors (Dark Base)
        base: {
          background: "#121212", // Deep Charcoal Black
          secondary: "#1E1E1E", // Soft Dark Gray
          card: "#252525", // Dark Slate Gray
          border: "#333333", // Muted Dark Gray
        },
        // Text Colors
        text: {
          primary: "#E0E0E0", // Soft Off-White for Readability
          secondary: "#B0B0B0", // Muted Gray for Subtext
          disabled: "#6D6D6D", // Subtle Gray for Less Important Info
        },
        // Accent Colors
        accent: {
          primary: "#4CAF50", // Modern Green for Success & Highlights
          secondary: "#FF9800", // Vibrant Amber for Warnings
          danger: "#F44336", // Muted Red for Errors
          info: "#2196F3", // Soft Blue for Informational Alerts
        },
        // Button & Interactive Elements
        button: {
          primary: "#4CAF50", // Slightly Brighter Green
          secondary: "#333333", // Blended with Background
          "primary-hover": "#5DBF61", // Lighter shade of primary
          "secondary-hover": "#444444", // Lighter shade of secondary
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

