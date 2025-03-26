"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { X } from "lucide-react"

export function TableMenu({ onSelect, onClose }) {
  const [hoveredCell, setHoveredCell] = useState({ row: 0, col: 0 })
  const maxRows = 5
  const maxCols = 5

  return (
    <div className="rounded-md border bg-popover p-1 shadow-md">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-sm font-medium">Insert Table</p>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: maxRows * maxCols }).map((_, index) => {
            const row = Math.floor(index / maxCols)
            const col = index % maxCols
            const isHovered = row <= hoveredCell.row && col <= hoveredCell.col

            return (
              <div
                key={index}
                className={`h-6 w-6 rounded-sm border ${isHovered ? "bg-primary border-primary" : "bg-muted"}`}
                onMouseEnter={() => setHoveredCell({ row, col })}
                onClick={() => onSelect(row + 1, col + 1)}
              />
            )
          })}
        </div>
        <p className="mt-2 text-center text-sm">
          {hoveredCell.row + 1} x {hoveredCell.col + 1} table
        </p>
      </div>
    </div>
  )
}

