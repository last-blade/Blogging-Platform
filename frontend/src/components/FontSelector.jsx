"use client"

import { Button } from "./ui/Button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export function FontSelector({ onSelect, currentFont }) {
  const fonts = [
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Merriweather", value: "Merriweather, serif" },
    { name: "Roboto Mono", value: "Roboto Mono, monospace" },
    { name: "Playfair Display", value: "Playfair Display, serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif" },
    { name: "Montserrat", value: "Montserrat, sans-serif" },
    { name: "Lora", value: "Lora, serif" },
    { name: "Source Code Pro", value: "Source Code Pro, monospace" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="rounded-lg border bg-popover p-2 shadow-lg w-[200px]"
    >
      <div className="py-1 px-2 text-xs font-medium text-muted-foreground">Font Family</div>
      <div className="max-h-[300px] overflow-y-auto">
        {fonts.map((font) => (
          <Button
            key={font.name}
            variant="ghost"
            className="w-full justify-between px-2 py-1.5 text-sm h-auto"
            onClick={() => onSelect(font.value)}
            style={{ fontFamily: font.value }}
          >
            {font.name}
            {currentFont === font.value && <Check className="h-4 w-4 ml-2" />}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

