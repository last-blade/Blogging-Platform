"use client"

import { Button } from "../components/ui/Button"
import { X } from "lucide-react"

export function ColorSelector({ onSelect, onClose }) {
  const colors = [
    { name: "Default", value: "#ffff8a" },
    { name: "Red", value: "#fecaca" },
    { name: "Green", value: "#bbf7d0" },
    { name: "Blue", value: "#bfdbfe" },
    { name: "Purple", value: "#e9d5ff" },
    { name: "Pink", value: "#fbcfe8" },
    { name: "Orange", value: "#fed7aa" },
  ]

  return (
    <div className="rounded-md border bg-popover p-1 shadow-md">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-sm font-medium">Highlight Color</p>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {colors.map((color) => (
          <button
            key={color.name}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            onClick={() => onSelect(color.value)}
            title={color.name}
          >
            <div className="h-6 w-6 rounded-sm border" style={{ backgroundColor: color.value }} />
          </button>
        ))}
      </div>
    </div>
  )
}