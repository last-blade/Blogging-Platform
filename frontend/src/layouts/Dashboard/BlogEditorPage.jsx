"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Mention from "@tiptap/extension-mention"
import Color from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import FontFamily from "@tiptap/extension-font-family"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
// import { lowlight } from "lowlight"
import Dropdown from "../../extensions/Dropdown"
import SlashCommand from "../../extensions/SlashCommand"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ImageIcon,
  LinkIcon,
  Code,
  TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Check,
  ChevronDown,
  X,
  Save,
  Eye,
  Upload,
  ArrowLeft,
  MoreHorizontal,
  Send,
  Globe,
  Lock,
  Users,
  Menu,
  Palette,
  Sparkles,
  Maximize,
  Minimize,
  LayoutGrid,
  Undo,
  Redo,
  Smile,
  AtSign,
  CheckSquare,
  Slash,
  Loader2,
} from "lucide-react"

import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Badge } from "../../components/ui/Badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/Tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/Sheet"
import { Separator } from "../../components/ui/Separator"
import { Switch } from "../../components/ui/Switch"
import { Label } from "../../components/ui/Label"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/PopOver"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog"
import { TextArea } from "../../components/ui/TextArea"
import { Progress } from "../../components/ui/Progress"
import { cn } from "../../utils/utils"
import { SlashCommandList } from "../../components/SlashCommandList"
import { MentionList } from "../../components/MentionList"
import { ColorSelector } from "../../components/ColorSelector"
import { TableMenu } from "../../components/TableMenu"
import { ImageUploader } from "../../components/ImageUploader"
import { EmojiPicker } from "../../components/EmojiPicker"
// import { AIAssistant } from "../../components/ai-assistant"
// import { TemplateGallery } from "./components/template-gallery"
// import { CommandMenu } from "./components/command-menu"

// Custom extension to handle slash commands properly
const CustomSlashCommand = SlashCommand.configure({
  suggestion: {
    char: "/",
    command: ({ editor, range, props }) => {
      // Delete the slash character
      editor.chain().focus().deleteRange(range).run()
      // Execute the command
      props.command({ editor, range })
    },
  },
})

export default function BlogEditorPage() {
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [fullscreenMode, setFullscreenMode] = useState(false)
  const [visibility, setVisibility] = useState("public")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [slashMenuOpen, setSlashMenuOpen] = useState(false)
  const [slashCommand, setSlashCommand] = useState("")
  const [slashCommandPosition, setSlashCommandPosition] = useState({ x: 0, y: 0 })
  const [mentionMenuOpen, setMentionMenuOpen] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 })
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const [colorMenuPosition, setColorMenuPosition] = useState({ x: 0, y: 0 })
  const [tableMenuOpen, setTableMenuOpen] = useState(false)
  const [tableMenuPosition, setTableMenuPosition] = useState({ x: 0, y: 0 })
  const [imageUploaderOpen, setImageUploaderOpen] = useState(false)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [editorReady, setEditorReady] = useState(false)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [templateGalleryOpen, setTemplateGalleryOpen] = useState(false)
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [currentFont, setCurrentFont] = useState("Inter")
  const [currentFontSize, setCurrentFontSize] = useState(16)
  const [currentTheme, setCurrentTheme] = useState("light")
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ x: 0, y: 0 })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const editorRef = useRef(null)
  const titleInputRef = useRef(null)

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "https://ui.shadcn.com/avatars/01.png",
  }

  // Mock suggested users for mentions
  const suggestedUsers = [
    { id: 1, name: "Sarah Miller", username: "sarahmiller", avatar: "https://ui.shadcn.com/avatars/02.png" },
    { id: 2, name: "David Chen", username: "davidchen", avatar: "https://ui.shadcn.com/avatars/03.png" },
    { id: 3, name: "Emma Wilson", username: "emmawilson", avatar: "https://ui.shadcn.com/avatars/04.png" },
    { id: 4, name: "James Rodriguez", username: "jamesrodriguez", avatar: "https://ui.shadcn.com/avatars/05.png" },
    { id: 5, name: "Olivia Parker", username: "oliviaparker", avatar: "https://ui.shadcn.com/avatars/06.png" },
  ]

  // Filter users based on mention query
  const filteredUsers = suggestedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(mentionQuery.toLowerCase()),
  )

  // TipTap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "editor-link",
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `Heading ${node.attrs.level}...`
          }
          return "Start writing or type / for commands..."
        },
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      // CodeBlockLowlight.configure({
      //   lowlight,
      //   HTMLAttributes: {
      //     class: "editor-code-block",
      //   },
      // }),
      TextStyle,
      Color,
      FontFamily,
      Subscript,
      Superscript,
      Dropdown,
      CustomSlashCommand,
      Mention.configure({
        HTMLAttributes: {
          class: "editor-mention",
        },
        suggestion: {
          items: ({ query }) => {
            setMentionQuery(query)
            return filteredUsers
          },
          onEnter: (item) => {
            editor
              .chain()
              .focus()
              .insertMention({
                id: item.id,
                label: `@${item.username}`,
              })
              .run()
            setMentionMenuOpen(false)
            return true
          },
          onExit: () => {
            setMentionMenuOpen(false)
          },
          onStart: (props) => {
            setMentionMenuOpen(true)
            const { view } = props.editor
            const { from } = view.state.selection
            const coords = view.coordsAtPos(from)
            setMentionPosition({
              x: coords.left,
              y: coords.bottom + window.scrollY,
            })
          },
        },
      }),
    ],
    content: `
      <p></p>
    `,
    onUpdate: ({ editor }) => {
      // Update word count and reading time
      const text = editor.getText()
      const words = text.split(/\s+/).filter((word) => word.length > 0)
      setWordCount(words.length)
      setReadingTime(Math.ceil(words.length / 200)) // Assuming 200 words per minute reading speed

      // Auto-save
      if (autoSaveEnabled) {
        debouncedSave()
      }
    },
    onTransaction: () => {
      // Check if slash command is active
      if (editor) {
        const { selection } = editor.state
        const { empty, from } = selection

        if (!empty) return

        const textBeforeCursor = editor.state.doc.textBetween(Math.max(0, from - 1), from)

        if (textBeforeCursor === "/") {
          // Slash command is triggered
          setSlashMenuOpen(true)
          const coords = editor.view.coordsAtPos(from)
          setSlashCommandPosition({
            x: coords.left,
            y: coords.bottom + window.scrollY,
          })
        }
      }
    },
  })

  useEffect(() => {
    if (editor) {
      setEditorReady(true)
    }
  }, [editor])

  // Focus on title input when component mounts
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [])

  // Simulate upload progress
  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 0
          }
          return prev + 10
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [isUploading])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        saveContent()
      }

      // Cmd/Ctrl + K to open command menu
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandMenuOpen(true)
      }

      // Esc to exit fullscreen
      if (e.key === "Escape" && fullscreenMode) {
        e.preventDefault()
        setFullscreenMode(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [fullscreenMode])

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(() => {
      saveContent()
    }, 2000),
    [title, subtitle, editor],
  )

  // Save content function
  const saveContent = () => {
    if (!editor || !title) return

    setIsSaving(true)

    // Simulate API call to save content
    setTimeout(() => {
      setIsSaving(false)
      setLastSaved(new Date())
      console.log("Content saved:", {
        title,
        subtitle,
        content: editor.getHTML(),
        tags,
        coverImage,
      })
    }, 1000)
  }

  // Handle tag input
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Handle cover image upload
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

      const reader = new FileReader()
      reader.onload = (e) => {
        setTimeout(() => {
          setCoverImage(e.target.result)
          setIsUploading(false)
          setUploadProgress(100)
        }, 1500) // Simulate delay
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle publish
  const handlePublish = () => {
    if (!title) {
      alert("Please add a title to your post")
      return
    }

    // Save before publishing
    saveContent()

    // Simulate publishing
    console.log("Publishing post:", {
      title,
      subtitle,
      content: editor.getHTML(),
      tags,
      coverImage,
      visibility,
    })

    // Close dialog
    setPublishDialogOpen(false)

    // Show success message or redirect
    alert("Post published successfully!")
  }

  // Insert link
  const insertLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
      // If text is selected, it will be converted to a link
      // If no text is selected and linkText is provided, insert a new link with the provided text
      if (linkText && editor.state.selection.empty) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      }
    }
    setLinkDialogOpen(false)
    setLinkUrl("")
    setLinkText("")
  }

  // Insert table
  const insertTable = (rows, cols) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    setTableMenuOpen(false)
  }

  // Insert image
  const insertImage = (url) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
    setImageUploaderOpen(false)
  }

  // Insert emoji
  const insertEmoji = (emoji) => {
    editor.chain().focus().insertContent(emoji).run()
    setEmojiPickerOpen(false)
  }

  // Toggle text formatting
  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run()
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run()
  const toggleSubscript = () => editor.chain().focus().toggleSubscript().run()
  const toggleSuperscript = () => editor.chain().focus().toggleSuperscript().run()

  // Toggle text alignment
  const setTextAlign = (align) => editor.chain().focus().setTextAlign(align).run()

  // Toggle lists
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
  const toggleTaskList = () => editor.chain().focus().toggleTaskList().run()

  // Set heading level
  const toggleHeading = (level) => editor.chain().focus().toggleHeading({ level }).run()

  // Insert horizontal rule
  const insertHorizontalRule = () => editor.chain().focus().setHorizontalRule().run()

  // Set font family
  const setFontFamily = (font) => {
    editor.chain().focus().setFontFamily(font).run()
    setCurrentFont(font)
  }

  // Set text color
  const setTextColor = (color) => {
    editor.chain().focus().setColor(color).run()
  }

  // Undo/Redo
  const undo = () => editor.chain().focus().undo().run()
  const redo = () => editor.chain().focus().redo().run()

  // Check if format is active
  const isActive = (type, options = {}) => {
    if (!editor) return false
    return editor.isActive(type, options)
  }

  // Format current date
  const formatDate = (date) => {
    if (!date) return ""
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Debounce helper function
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Editor toolbar button component
  const ToolbarButton = ({ onClick, active, disabled, children, tooltip }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={cn("h-9 w-9 p-0 rounded-full", active && "bg-primary/10 text-primary")}
          >
            {children}
            <span className="sr-only">{tooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div
      className={cn(
        "min-h-screen bg-background transition-all duration-300",
        fullscreenMode && "fixed inset-0 z-50 bg-background",
      )}
    >
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          fullscreenMode && "hidden",
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to dashboard</span>
              </a>
            </Button>

            <div className="hidden md:block">
              <a href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                    B
                  </div>
                </div>
                <span className="text-xl font-bold">Blogify</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              {isSaving ? (
                <div className="flex items-center">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  Saved at {formatDate(lastSaved)}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex items-center gap-1 rounded-full"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4" />
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{previewMode ? "Switch to edit mode" : "Preview your post"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1 rounded-full"
                onClick={saveContent}
              >
                <Save className="h-4 w-4" />
                Save
              </Button>

              <Button
                size="sm"
                className="hidden md:flex items-center gap-1 rounded-full"
                onClick={() => setPublishDialogOpen(true)}
              >
                <Send className="h-4 w-4" />
                Publish
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setPreviewMode(!previewMode)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {previewMode ? "Edit" : "Preview"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={saveContent}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPublishDialogOpen(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Publish
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFullscreenMode(!fullscreenMode)}>
                    {fullscreenMode ? (
                      <>
                        <Minimize className="h-4 w-4 mr-2" />
                        Exit Fullscreen
                      </>
                    ) : (
                      <>
                        <Maximize className="h-4 w-4 mr-2" />
                        Fullscreen
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAiAssistantOpen(true)}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Assistant
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTemplateGalleryOpen(true)}>
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Templates
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Avatar className="h-8 w-8 border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                    B
                  </div>
                </div>
                <span className="text-xl font-bold">Blogify</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <nav className="flex flex-col space-y-4">
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </a>
              <Separator />
              <div className="px-2 py-2">
                <p className="text-sm font-medium mb-2">Editor Settings</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-save" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Auto-save
                    </Label>
                    <Switch id="auto-save" checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-toggle" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Dark Mode
                    </Label>
                    <Switch
                      id="theme-toggle"
                      checked={currentTheme === "dark"}
                      onCheckedChange={(checked) => setCurrentTheme(checked ? "dark" : "light")}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="px-2 py-2">
                <p className="text-sm font-medium mb-2">Actions</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      saveContent()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setPreviewMode(!previewMode)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {previewMode ? "Edit" : "Preview"}
                  </Button>
                  <Button
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setPublishDialogOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className={cn("container px-4 md:px-6 py-6 max-w-5xl mx-auto", fullscreenMode && "max-w-none px-8 py-8")}>
        {/* Fullscreen Toggle */}
        {fullscreenMode && (
          <div className="fixed top-4 right-4 z-50">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setFullscreenMode(false)}>
              <Minimize className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Cover Image */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-4 shadow-lg">
              <img
                src={coverImage || "/placeholder.svg"}
                alt="Cover"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 rounded-full"
                onClick={() => setCoverImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:bg-muted/30 transition-all duration-300 mb-4 group"
              onClick={() => document.getElementById("cover-image-upload").click()}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-primary group-hover:text-primary/80" />
                </div>
                <p className="font-medium text-lg">Add a cover image</p>
                <p className="text-sm text-muted-foreground">Recommended size: 1600 x 840px</p>
                <Button variant="outline" size="sm" className="mt-2 rounded-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <input
                id="cover-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageUpload}
              />
            </div>
          )}

          {isUploading && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Uploading...</p>
                <p className="text-sm font-medium">{uploadProgress}%</p>
              </div>
              <Progress value={uploadProgress} className="h-1" />
            </div>
          )}
        </div>

        {/* Title and Subtitle */}
        <div className="mb-8 space-y-4">
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold focus:outline-none bg-transparent placeholder:text-muted-foreground/50 transition-all duration-200 focus:text-primary"
          />
          <input
            type="text"
            placeholder="Subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-xl md:text-2xl text-muted-foreground focus:outline-none bg-transparent placeholder:text-muted-foreground/50 transition-all duration-200 focus:text-foreground"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 rounded-full">
                {tag}
                <Button variant="ghost" size="sm" className="h-4 w-4 ml-1 p-0" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="h-8 w-[150px] text-sm rounded-full border-dashed focus:border-primary"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
        </div>

        {/* Editor Toolbar */}
        {!previewMode && editorReady && (
          <div className="sticky top-[65px] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-full mb-6 shadow-sm">
            <div className="flex flex-wrap items-center p-1 gap-1 overflow-x-auto scrollbar-hide">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1 px-3 text-sm rounded-full">
                    {isActive("heading", { level: 1 }) && "H1"}
                    {isActive("heading", { level: 2 }) && "H2"}
                    {isActive("heading", { level: 3 }) && "H3"}
                    {isActive("heading", { level: 4 }) && "H4"}
                    {isActive("heading", { level: 5 }) && "H5"}
                    {isActive("heading", { level: 6 }) && "H6"}
                    {!isActive("heading", { level: 1 }) &&
                      !isActive("heading", { level: 2 }) &&
                      !isActive("heading", { level: 3 }) &&
                      !isActive("heading", { level: 4 }) &&
                      !isActive("heading", { level: 5 }) &&
                      !isActive("heading", { level: 6 }) &&
                      "Normal"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
                    Normal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(1)}>
                    <Heading1 className="h-4 w-4 mr-2" />
                    Heading 1
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(2)}>
                    <Heading2 className="h-4 w-4 mr-2" />
                    Heading 2
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(3)}>
                    <Heading3 className="h-4 w-4 mr-2" />
                    Heading 3
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(4)}>Heading 4</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(5)}>Heading 5</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(6)}>Heading 6</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton onClick={toggleBold} active={isActive("bold")} disabled={!editor} tooltip="Bold (⌘B)">
                <Bold className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleItalic}
                active={isActive("italic")}
                disabled={!editor}
                tooltip="Italic (⌘I)"
              >
                <Italic className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleUnderline}
                active={isActive("underline")}
                disabled={!editor}
                tooltip="Underline (⌘U)"
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToolbarButton>

              <Popover open={colorMenuOpen} onOpenChange={setColorMenuOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-9 w-9 p-0 rounded-full", isActive("highlight") && "bg-primary/10 text-primary")}
                  >
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="center">
                  <ColorSelector
                    onSelect={(color) => {
                      editor.chain().focus().toggleHighlight({ color }).run()
                      setColorMenuOpen(false)
                    }}
                    onClose={() => setColorMenuOpen(false)}
                  />
                </PopoverContent>
              </Popover>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton
                onClick={() => setTextAlign("left")}
                active={isActive({ textAlign: "left" })}
                disabled={!editor}
                tooltip="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setTextAlign("center")}
                active={isActive({ textAlign: "center" })}
                disabled={!editor}
                tooltip="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setTextAlign("right")}
                active={isActive({ textAlign: "right" })}
                disabled={!editor}
                tooltip="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setTextAlign("justify")}
                active={isActive({ textAlign: "justify" })}
                disabled={!editor}
                tooltip="Justify"
              >
                <AlignJustify className="h-4 w-4" />
              </ToolbarButton>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton
                onClick={toggleBulletList}
                active={isActive("bulletList")}
                disabled={!editor}
                tooltip="Bullet List"
              >
                <List className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleOrderedList}
                active={isActive("orderedList")}
                disabled={!editor}
                tooltip="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleTaskList}
                active={isActive("taskList")}
                disabled={!editor}
                tooltip="Task List"
              >
                <CheckSquare className="h-4 w-4" />
              </ToolbarButton>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton
                onClick={() => setLinkDialogOpen(true)}
                active={isActive("link")}
                disabled={!editor}
                tooltip="Insert Link (⌘K)"
              >
                <LinkIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton onClick={() => setImageUploaderOpen(true)} disabled={!editor} tooltip="Insert Image">
                <ImageIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton onClick={() => setTableMenuOpen(true)} disabled={!editor} tooltip="Insert Table">
                <TableIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={isActive("codeBlock")}
                disabled={!editor}
                tooltip="Code Block"
              >
                <Code className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton onClick={insertHorizontalRule} disabled={!editor} tooltip="Horizontal Rule">
                <Minus className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton onClick={() => setEmojiPickerOpen(true)} disabled={!editor} tooltip="Insert Emoji">
                <Smile className="h-4 w-4" />
              </ToolbarButton>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton onClick={undo} disabled={!editor || !editor.can().undo()} tooltip="Undo (⌘Z)">
                <Undo className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton onClick={redo} disabled={!editor || !editor.can().redo()} tooltip="Redo (⌘⇧Z)">
                <Redo className="h-4 w-4" />
              </ToolbarButton>

              <Separator orientation="vertical" className="h-6 ml-auto" />

              <ToolbarButton onClick={() => setAiAssistantOpen(true)} disabled={!editor} tooltip="AI Assistant">
                <Sparkles className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setFullscreenMode(!fullscreenMode)}
                tooltip={fullscreenMode ? "Exit Fullscreen" : "Fullscreen"}
              >
                {fullscreenMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </ToolbarButton>
            </div>

            <div className="px-3 py-1 text-xs text-muted-foreground border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Slash className="h-3 w-3 mr-1" />
                  <span>for commands</span>
                </div>
                <div className="flex items-center">
                  <AtSign className="h-3 w-3 mr-1" />
                  <span>for mentions</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>{wordCount} words</div>
                <div>~{readingTime} min read</div>
              </div>
            </div>
          </div>
        )}

        {/* Editor Content */}
        <div
          className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            previewMode ? "border rounded-xl p-6 shadow-sm" : "",
          )}
        >
          <div
            ref={editorRef}
            className={cn(
              "min-h-[500px] focus:outline-none",
              previewMode ? "pointer-events-none" : "",
              "editor-container", // Custom class for styling
            )}
            style={{
              fontFamily: currentFont,
              fontSize: `${currentFontSize}px`,
            }}
          >
            {editor && (
              <>
                <EditorContent editor={editor} />

                {/* Bubble Menu */}
                {editor && (
                  <BubbleMenu
                    editor={editor}
                    tippyOptions={{
                      duration: 100,
                      animation: "scale",
                    }}
                    className="bg-background rounded-full border shadow-md p-1 flex items-center gap-1"
                  >
                    <ToolbarButton onClick={toggleBold} active={isActive("bold")} tooltip="Bold">
                      <Bold className="h-3.5 w-3.5" />
                    </ToolbarButton>

                    <ToolbarButton onClick={toggleItalic} active={isActive("italic")} tooltip="Italic">
                      <Italic className="h-3.5 w-3.5" />
                    </ToolbarButton>

                    <ToolbarButton onClick={toggleUnderline} active={isActive("underline")} tooltip="Underline">
                      <UnderlineIcon className="h-3.5 w-3.5" />
                    </ToolbarButton>

                    <ToolbarButton onClick={() => setLinkDialogOpen(true)} active={isActive("link")} tooltip="Link">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </ToolbarButton>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 p-0 rounded-full">
                          <Highlighter className="h-3.5 w-3.5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2" align="center">
                        <ColorSelector
                          onSelect={(color) => {
                            editor.chain().focus().toggleHighlight({ color }).run()
                          }}
                          onClose={() => {}}
                        />
                      </PopoverContent>
                    </Popover>
                  </BubbleMenu>
                )}

                {/* Floating Menu */}
                {editor && (
                  <FloatingMenu
                    editor={editor}
                    tippyOptions={{
                      duration: 100,
                      animation: "scale",
                      placement: "bottom-start",
                    }}
                    className="bg-background rounded-lg border shadow-md p-2 flex flex-col gap-1"
                  >
                    <div className="text-xs text-muted-foreground mb-1 px-2">Add content</div>
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={() => toggleHeading(1)}
                      >
                        <Heading1 className="h-3.5 w-3.5 mr-2" />
                        Heading 1
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={() => toggleHeading(2)}
                      >
                        <Heading2 className="h-3.5 w-3.5 mr-2" />
                        Heading 2
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={toggleBulletList}
                      >
                        <List className="h-3.5 w-3.5 mr-2" />
                        Bullet List
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={toggleOrderedList}
                      >
                        <ListOrdered className="h-3.5 w-3.5 mr-2" />
                        Numbered List
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={() => setImageUploaderOpen(true)}
                      >
                        <ImageIcon className="h-3.5 w-3.5 mr-2" />
                        Image
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 px-2 text-xs"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                      >
                        <Code className="h-3.5 w-3.5 mr-2" />
                        Code Block
                      </Button>
                    </div>
                  </FloatingMenu>
                )}
              </>
            )}
          </div>
        </div>

        {/* Slash Command Menu */}
        <AnimatePresence>
          {slashMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed z-50"
              style={{
                left: slashCommandPosition.x,
                top: slashCommandPosition.y,
              }}
            >
              <SlashCommandList
                query={slashCommand}
                onSelect={(item) => {
                  item.command()
                  setSlashMenuOpen(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mention Menu */}
        <AnimatePresence>
          {mentionMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed z-50"
              style={{
                left: mentionPosition.x,
                top: mentionPosition.y,
              }}
            >
              <MentionList
                users={filteredUsers}
                onSelect={(user) => {
                  editor
                    .chain()
                    .focus()
                    .insertMention({
                      id: user.id,
                      label: `@${user.username}`,
                    })
                    .run()
                  setMentionMenuOpen(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emoji Picker */}
        <AnimatePresence>
          {emojiPickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <EmojiPicker onSelect={insertEmoji} onClose={() => setEmojiPickerOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Menu */}
        <AnimatePresence>
          {tableMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <TableMenu onSelect={insertTable} onClose={() => setTableMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>Add a link to your content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">Text (optional)</Label>
              <Input
                id="text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="rounded-md"
              />
              <p className="text-xs text-muted-foreground">Leave empty to use the selected text</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={insertLink} disabled={!linkUrl} className="rounded-full">
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Uploader Dialog */}
      <Dialog open={imageUploaderOpen} onOpenChange={setImageUploaderOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>Upload an image or provide a URL</DialogDescription>
          </DialogHeader>
          <ImageUploader onInsert={insertImage} onCancel={() => setImageUploaderOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* AI Assistant Dialog */}
      <Dialog open={aiAssistantOpen} onOpenChange={setAiAssistantOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Writing Assistant
            </DialogTitle>
            <DialogDescription>Get help with your writing using AI</DialogDescription>
          </DialogHeader>
          {/* <AIAssistant editor={editor} onClose={() => setAiAssistantOpen(false)} /> */}
        </DialogContent>
      </Dialog>

      {/* Template Gallery Dialog */}
      <Dialog open={templateGalleryOpen} onOpenChange={setTemplateGalleryOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Template Gallery
            </DialogTitle>
            <DialogDescription>Choose a template to get started quickly</DialogDescription>
          </DialogHeader>
          {/* <TemplateGallery editor={editor} onClose={() => setTemplateGalleryOpen(false)} /> */}
        </DialogContent>
      </Dialog>

      {/* Command Menu */}
      {/* <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} editor={editor} /> */}

      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Post</DialogTitle>
            <DialogDescription>Your post will be published to your blog</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={visibility === "public" ? "default" : "outline"}
                  className="w-full justify-start rounded-lg"
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Public
                </Button>
                <Button
                  variant={visibility === "private" ? "default" : "outline"}
                  className="w-full justify-start rounded-lg"
                  onClick={() => setVisibility("private")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Private
                </Button>
                <Button
                  variant={visibility === "limited" ? "default" : "outline"}
                  className="w-full justify-start rounded-lg"
                  onClick={() => setVisibility("limited")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Limited
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>SEO Description</Label>
              <TextArea
                placeholder="Brief description for search engines (optional)"
                className="resize-none rounded-lg"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                This will be used in search results and when sharing on social media
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="comments-enabled">Enable comments</Label>
                <Switch id="comments-enabled" defaultChecked />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishDialogOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handlePublish} className="rounded-full">
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Styles */}
      <style jsx global>{`
        .editor-container {
          transition: all 0.3s ease;
        }
        
        .editor-container:focus-within {
          outline: none;
        }
        
        .editor-container p {
          margin-bottom: 1em;
          transition: background-color 0.3s ease;
        }
        
        .editor-container h1, 
        .editor-container h2, 
        .editor-container h3, 
        .editor-container h4, 
        .editor-container h5, 
        .editor-container h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
          line-height: 1.2;
        }
        
        .editor-container h1 {
          font-size: 2.5em;
        }
        
        .editor-container h2 {
          font-size: 2em;
        }
        
        .editor-container h3 {
          font-size: 1.5em;
        }
        
        .editor-container ul, 
        .editor-container ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .editor-container ul li, 
        .editor-container ol li {
          margin-bottom: 0.5em;
        }
        
        .editor-container blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
        
        .editor-container pre {
          background-color: hsl(var(--muted));
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin-bottom: 1em;
        }
        
        .editor-container code {
          font-family: monospace;
          background-color: hsl(var(--muted));
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
        
        .editor-container .editor-code-block {
          background-color: hsl(var(--muted));
          border-radius: 0.5em;
          margin-bottom: 1em;
        }
        
        .editor-container img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1em 0;
          transition: transform 0.3s ease;
        }
        
        .editor-container img:hover {
          transform: scale(1.01);
        }
        
        .editor-container table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1em;
        }
        
        .editor-container th, 
        .editor-container td {
          border: 1px solid hsl(var(--border));
          padding: 0.5em;
        }
        
        .editor-container th {
          background-color: hsl(var(--muted));
          font-weight: 600;
        }
        
        .editor-container .editor-link {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-decoration-thickness: 0.1em;
          text-underline-offset: 0.2em;
          transition: all 0.2s ease;
        }
        
        .editor-container .editor-link:hover {
          text-decoration-thickness: 0.2em;
        }
        
        .editor-container .editor-mention {
          color: hsl(var(--primary));
          font-weight: 500;
          background-color: hsl(var(--primary) / 0.1);
          padding: 0.1em 0.3em;
          border-radius: 0.25em;
          white-space: nowrap;
        }
        
        .editor-container ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }
        
        .editor-container ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5em;
        }
        
        .editor-container ul[data-type="taskList"] li > label {
          margin-right: 0.5em;
          user-select: none;
        }
        
        .editor-container ul[data-type="taskList"] li > div {
          flex: 1;
        }
        
        .ProseMirror-focused {
          outline: none;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground) / 0.5);
          pointer-events: none;
          height: 0;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

