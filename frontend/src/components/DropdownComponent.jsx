"use client"

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function DropdownComponent({ node, updateAttributes }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NodeViewWrapper className="my-4">
      <div className="border rounded-md overflow-hidden">
        <button
          className="flex items-center justify-between w-full p-3 bg-muted/50 hover:bg-muted transition-colors text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium">{node.attrs.summary}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {isOpen && (
          <div className="p-3 border-t">
            <NodeViewContent className="prose dark:prose-invert" />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}

