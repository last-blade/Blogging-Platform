"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"

export function MentionList({ users, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const mentionListRef = useRef(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((selectedIndex + 1) % users.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((selectedIndex - 1 + users.length) % users.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        onSelect(users[selectedIndex])
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, users, onSelect])

  // Scroll selected item into view
  useEffect(() => {
    if (mentionListRef.current) {
      const selectedElement = mentionListRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  if (users.length === 0) {
    return (
      <div className="rounded-md border bg-popover p-1 shadow-md">
        <div className="py-2 px-4 text-sm text-muted-foreground">No users found</div>
      </div>
    )
  }

  return (
    <div ref={mentionListRef} className="rounded-md border bg-popover p-1 shadow-md w-[250px]">
      <div className="max-h-[200px] overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={user.id}
            data-index={index}
            className={`flex items-center gap-2 rounded-sm px-3 py-2 text-sm ${
              selectedIndex === index ? "bg-accent text-accent-foreground" : "text-popover-foreground"
            } cursor-pointer`}
            onClick={() => onSelect(user)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

