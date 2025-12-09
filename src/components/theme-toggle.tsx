"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2 p-1 border-2 border-border bg-muted rounded-full w-fit">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-all ${
          theme === "light" 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition-all ${
          theme === "system" 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="System mode"
      >
        <Laptop className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-all ${
          theme === "dark" 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}
