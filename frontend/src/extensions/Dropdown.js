import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { DropdownComponent } from "../components/DropdownComponent"

export default Node.create({
  name: "dropdown",

  group: "block",

  content: "block+",

  defining: true,

  addAttributes() {
    return {
      summary: {
        default: "Click to expand",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "details",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["details", mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DropdownComponent)
  },

  addCommands() {
    return {
      insertDropdown:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Dropdown content goes here...",
                  },
                ],
              },
            ],
          })
        },
    }
  },
})

