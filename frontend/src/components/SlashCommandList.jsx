"use client"

import { useState, useEffect, useRef } from "react"
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Quote,
  Minus,
  Table,
  Image,
  ChevronDown,
} from "lucide-react"

export function SlashCommandList({ query, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const commandListRef = useRef(null)

  const filteredItems = [
    {
      title: "Heading 1",
      icon: <Heading1 className="h-4 w-4" />,
      description: "Large section heading",
      command: () => {},
    },
    {
      title: "Heading 2",
      icon: <Heading2 className="h-4 w-4" />,
      description: "Medium section heading",
      command: () => {},
    },
    {
      title: "Heading 3",
      icon: <Heading3 className="h-4 w-4" />,
      description: "Small section heading",
      command: () => {},
    },
    {
      title: "Bullet List",
      icon: <List className="h-4 w-4" />,
      description: "Create a simple bullet list",
      command: () => {},
    },
    {
      title: "Numbered List",
      icon: <ListOrdered className="h-4 w-4" />,
      description: "Create a numbered list",
      command: () => {},
    },
    {
      title: "Task List",
      icon: <CheckSquare className="h-4 w-4" />,
      description: "Create a task list with checkboxes",
      command: () => {},
    },
    {
      title: "Code Block",
      icon: <Code className="h-4 w-4" />,
      description: "Add a code snippet",
      command: () => {},
    },
    {
      title: "Blockquote",
      icon: <Quote className="h-4 w-4" />,
      description: "Insert a quote or citation",
      command: () => {},
    },
    {
      title: "Horizontal Rule",
      icon: <Minus className="h-4 w-4" />,
      description: "Insert a horizontal divider",
      command: () => {},
    },
    {
      title: "Table",
      icon: <Table className="h-4 w-4" />,
      description: "Insert a table",
      command: () => {},
    },
    {
      title: "Image",
      icon: <Image className="h-4 w-4" />,
      description: "Upload or embed an image",
      command: () => {},
    },
    {
      title: "Dropdown",
      icon: <ChevronDown className="h-4 w-4" />,
      description: "Add collapsible content",
      command: () => {},
    },
  ].filter((item) => query === "" || item.title.toLowerCase().includes(query.toLowerCase()))

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((selectedIndex + 1) % filteredItems.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        onSelect(filteredItems[selectedIndex])
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, filteredItems, onSelect])

  // Scroll selected item into view
  useEffect(() => {
    if (commandListRef.current) {
      const selectedElement = commandListRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  if (filteredItems.length === 0) {
    return (
      <div className="rounded-md border bg-popover p-1 shadow-md">
        <div className="py-2 px-4 text-sm text-muted-foreground">No results found</div>
      </div>
    )
  }

  return (
    <div ref={commandListRef} className="rounded-md border bg-popover p-1 shadow-md w-[300px]">
      <div className="py-2 px-4 text-xs font-medium text-muted-foreground">
        {query ? `Search results for "${query}"` : "Suggested blocks"}
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={`flex items-center gap-2 rounded-sm px-4 py-2 text-sm ${
              selectedIndex === index ? "bg-accent text-accent-foreground" : "text-popover-foreground"
            } cursor-pointer`}
            onClick={() => onSelect(item)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <div className="flex h-5 w-5 items-center justify-center">{item.icon}</div>
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

