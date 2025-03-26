"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Mention from "@tiptap/extension-mention";
// import {lowlight} from 'lowlight';

import Dropdown from "../../extensions/Dropdown";
import SlashCommand from "../../extensions/SlashCommand";
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
  Clock,
  ArrowLeft,
  MoreHorizontal,
  Send,
  Globe,
  Lock,
  Users,
  Menu,
} from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/Tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/Sheet";
import { Separator } from "../../components/ui/Separator";
import { Switch } from "../../components/ui/Switch";
import { Label } from "../../components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { TextArea } from "../../components/ui/TextArea";
import { cn } from "../../utils/utils";
import { SlashCommandList } from "../../components/SlashCommandList";
import { MentionList } from "../../components/MentionList";
import { ColorSelector } from "../../components/ColorSelector";
import { TableMenu } from "../../components/TableMenu";
import { ImageUploader } from "../../components/ImageUploader";

export default function BlogEditorPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashCommand, setSlashCommand] = useState("");
  const [slashCommandPosition, setSlashCommandPosition] = useState({
    x: 0,
    y: 0,
  });
  const [mentionMenuOpen, setMentionMenuOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 });
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [colorMenuPosition, setColorMenuPosition] = useState({ x: 0, y: 0 });
  const [tableMenuOpen, setTableMenuOpen] = useState(false);
  const [tableMenuPosition, setTableMenuPosition] = useState({ x: 0, y: 0 });
  const [imageUploaderOpen, setImageUploaderOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [editorReady, setEditorReady] = useState(false);

  const editorRef = useRef(null);
  const titleInputRef = useRef(null);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "https://via.placeholder.com/150",
  };

  // Mock suggested users for mentions
  const suggestedUsers = [
    {
      id: 1,
      name: "Sarah Miller",
      username: "sarahmiller",
      avatar: "https://via.placeholder.com/40?text=SM",
    },
    {
      id: 2,
      name: "David Chen",
      username: "davidchen",
      avatar: "https://via.placeholder.com/40?text=DC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://via.placeholder.com/40?text=EW",
    },
    {
      id: 4,
      name: "James Rodriguez",
      username: "jamesrodriguez",
      avatar: "https://via.placeholder.com/40?text=JR",
    },
    {
      id: 5,
      name: "Olivia Parker",
      username: "oliviaparker",
      avatar: "https://via.placeholder.com/40?text=OP",
    },
  ];

  // Filter users based on mention query
  const filteredUsers = suggestedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  // TipTap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      Highlight,
      Typography,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Start writing your story...",
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
      //   CodeBlockLowlight.configure({
      //     lowlight,
      //   }),
      Dropdown,
      SlashCommand.configure({
        suggestion: {
          items: () => [
            {
              title: "Heading 1",
              command: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            },
            {
              title: "Heading 2",
              command: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            },
            {
              title: "Heading 3",
              command: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            },
            {
              title: "Bullet List",
              command: () => editor.chain().focus().toggleBulletList().run(),
            },
            {
              title: "Numbered List",
              command: () => editor.chain().focus().toggleOrderedList().run(),
            },
            {
              title: "Task List",
              command: () => editor.chain().focus().toggleTaskList().run(),
            },
            {
              title: "Code Block",
              command: () => editor.chain().focus().toggleCodeBlock().run(),
            },
            {
              title: "Blockquote",
              command: () => editor.chain().focus().toggleBlockquote().run(),
            },
            {
              title: "Horizontal Rule",
              command: () => editor.chain().focus().setHorizontalRule().run(),
            },
            { title: "Table", command: () => setTableMenuOpen(true) },
            { title: "Image", command: () => setImageUploaderOpen(true) },
            {
              title: "Dropdown",
              command: () => editor.chain().focus().insertDropdown().run(),
            },
          ],
          onEnter: (item) => {
            item.command();
            setSlashMenuOpen(false);
            return true;
          },
          onExit: () => {
            setSlashMenuOpen(false);
          },
          onStart: (props) => {
            setSlashCommand(props.query);
            setSlashMenuOpen(true);
            const { view } = props.editor;
            const { from } = view.state.selection;
            const coords = view.coordsAtPos(from);
            setSlashCommandPosition({
              x: coords.left,
              y: coords.bottom + window.scrollY,
            });
          },
          onUpdate: (props) => {
            setSlashCommand(props.query);
          },
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          items: ({ query }) => {
            setMentionQuery(query);
            return filteredUsers;
          },
          onEnter: (item) => {
            editor
              .chain()
              .focus()
              .insertMention({
                id: item.id,
                label: `@${item.username}`,
              })
              .run();
            setMentionMenuOpen(false);
            return true;
          },
          onExit: () => {
            setMentionMenuOpen(false);
          },
          onStart: (props) => {
            setMentionMenuOpen(true);
            const { view } = props.editor;
            const { from } = view.state.selection;
            const coords = view.coordsAtPos(from);
            setMentionPosition({
              x: coords.left,
              y: coords.bottom + window.scrollY,
            });
          },
        },
      }),
    ],
    content: `
      <p>Start writing your story...</p>
    `,
    onUpdate: ({ editor }) => {
      // Update word count and reading time
      const text = editor.getText();
      const words = text.split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
      setReadingTime(Math.ceil(words.length / 200)); // Assuming 200 words per minute reading speed

      // Auto-save
      if (autoSaveEnabled) {
        debouncedSave();
      }
    },
    onTransaction: () => {
      // Check if slash command is active
      if (editor) {
        const { selection } = editor.state;
        const { empty, from } = selection;

        if (!empty) return;

        const textBeforeCursor = editor.state.doc.textBetween(
          Math.max(0, from - 1),
          from
        );

        if (textBeforeCursor === "/") {
          // Slash command is triggered
          setSlashMenuOpen(true);
          const coords = editor.view.coordsAtPos(from);
          setSlashCommandPosition({
            x: coords.left,
            y: coords.bottom + window.scrollY,
          });
        }
      }
    },
  });

  useEffect(() => {
    if (editor) {
      setEditorReady(true);
    }
  }, [editor]);

  // Focus on title input when component mounts
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(() => {
      saveContent();
    }, 2000),
    [title, subtitle, editor]
  );

  // Save content function
  const saveContent = () => {
    if (!editor || !title) return;

    setIsSaving(true);

    // Simulate API call to save content
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      console.log("Content saved:", {
        title,
        subtitle,
        content: editor.getHTML(),
        tags,
        coverImage,
      });
    }, 1000);
  };

  // Handle tag input
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle cover image upload
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle publish
  const handlePublish = () => {
    if (!title) {
      alert("Please add a title to your post");
      return;
    }

    // Save before publishing
    saveContent();

    // Simulate publishing
    console.log("Publishing post:", {
      title,
      subtitle,
      content: editor.getHTML(),
      tags,
      coverImage,
      visibility,
    });

    // Close dialog
    setPublishDialogOpen(false);

    // Show success message or redirect
    alert("Post published successfully!");
  };

  // Insert link
  const insertLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      // If text is selected, it will be converted to a link
      // If no text is selected and linkText is provided, insert a new link with the provided text
      if (linkText && editor.state.selection.empty) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      }
    }
    setLinkDialogOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  // Insert table
  const insertTable = (rows, cols) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    setTableMenuOpen(false);
  };

  // Insert image
  const insertImage = (url) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setImageUploaderOpen(false);
  };

  // Toggle text formatting
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run();

  // Toggle text alignment
  const setTextAlign = (align) =>
    editor.chain().focus().setTextAlign(align).run();

  // Toggle lists
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();

  // Set heading level
  const toggleHeading = (level) =>
    editor.chain().focus().toggleHeading({ level }).run();

  // Insert horizontal rule
  const insertHorizontalRule = () =>
    editor.chain().focus().setHorizontalRule().run();

  // Check if format is active
  const isActive = (type, options = {}) => {
    if (!editor) return false;
    return editor.isActive(type, options);
  };

  // Format current date
  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Debounce helper function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Editor toolbar button component
  const ToolbarButton = ({ onClick, active, disabled, children, tooltip }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn("h-8 w-8 p-0", active && "bg-muted text-primary")}
          >
            {children}
            <span className="sr-only">{tooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to dashboard</span>
              </a>
            </Button>

            <div className="hidden md:block">
              <a href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                    P
                  </div>
                </div>
                <span className="text-xl font-bold">PixelPen</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              {isSaving ? (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 animate-pulse" />
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
                      className="hidden md:flex items-center gap-1"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4" />
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {previewMode
                        ? "Switch to edit mode"
                        : "Preview your post"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1"
                onClick={saveContent}
              >
                <Save className="h-4 w-4" />
                Save
              </Button>

              <Button
                size="sm"
                className="hidden md:flex items-center gap-1"
                onClick={() => setPublishDialogOpen(true)}
              >
                <Send className="h-4 w-4" />
                Publish
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 md:hidden"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setPreviewMode(!previewMode)}
                  >
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                    P
                  </div>
                </div>
                <span className="text-xl font-bold">PixelPen</span>
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
                    <Label
                      htmlFor="auto-save"
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Auto-save
                    </Label>
                    <Switch
                      id="auto-save"
                      checked={autoSaveEnabled}
                      onCheckedChange={setAutoSaveEnabled}
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
                      saveContent();
                      setMobileMenuOpen(false);
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
                      setPreviewMode(!previewMode);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {previewMode ? "Edit" : "Preview"}
                  </Button>
                  <Button
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setPublishDialogOpen(true);
                      setMobileMenuOpen(false);
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
      <main className="container px-4 md:px-6 py-6 max-w-5xl mx-auto">
        {/* Cover Image */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] mb-4">
              <img
                src={coverImage || "/placeholder.svg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8"
                onClick={() => setCoverImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors mb-4"
              onClick={() =>
                document.getElementById("cover-image-upload").click()
              }
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Add a cover image</p>
                <p className="text-sm text-muted-foreground">
                  Recommended size: 1600 x 840px
                </p>
                <Button variant="outline" size="sm" className="mt-2">
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
        </div>

        {/* Title and Subtitle */}
        <div className="mb-8 space-y-4">
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold focus:outline-none bg-transparent placeholder:text-muted-foreground/50"
          />
          <input
            type="text"
            placeholder="Subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-xl md:text-2xl text-muted-foreground focus:outline-none bg-transparent placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => removeTag(tag)}
                >
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
                className="h-8 w-[150px] text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to add a tag
          </p>
        </div>

        {/* Editor Toolbar */}
        {!previewMode && editorReady && (
          <div className="sticky top-[65px] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg mb-4">
            <div className="flex flex-wrap items-center p-1 gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-2 text-sm"
                  >
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
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setParagraph().run()}
                  >
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
                  <DropdownMenuItem onClick={() => toggleHeading(4)}>
                    Heading 4
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(5)}>
                    Heading 5
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleHeading(6)}>
                    Heading 6
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton
                onClick={toggleBold}
                active={isActive("bold")}
                disabled={!editor}
                tooltip="Bold"
              >
                <Bold className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleItalic}
                active={isActive("italic")}
                disabled={!editor}
                tooltip="Italic"
              >
                <Italic className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleUnderline}
                active={isActive("underline")}
                disabled={!editor}
                tooltip="Underline"
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={toggleHighlight}
                active={isActive("highlight")}
                disabled={!editor}
                tooltip="Highlight"
              >
                <Highlighter className="h-4 w-4" />
              </ToolbarButton>

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

              <Separator orientation="vertical" className="h-6" />

              <ToolbarButton
                onClick={() => setLinkDialogOpen(true)}
                active={isActive("link")}
                disabled={!editor}
                tooltip="Insert Link"
              >
                <LinkIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setImageUploaderOpen(true)}
                disabled={!editor}
                tooltip="Insert Image"
              >
                <ImageIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => setTableMenuOpen(true)}
                disabled={!editor}
                tooltip="Insert Table"
              >
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

              <ToolbarButton
                onClick={insertHorizontalRule}
                disabled={!editor}
                tooltip="Horizontal Rule"
              >
                <Minus className="h-4 w-4" />
              </ToolbarButton>
            </div>

            <div className="px-3 py-1 text-xs text-muted-foreground border-t flex items-center justify-between">
              <div>
                Type{" "}
                <kbd className="px-1 py-0.5 bg-muted rounded border">/</kbd> for
                commands
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
            previewMode ? "border rounded-lg p-6" : ""
          )}
        >
          <div
            ref={editorRef}
            className={cn(
              "min-h-[500px]",
              previewMode ? "pointer-events-none" : ""
            )}
          >
            {editor && <EditorContent editor={editor} />}
          </div>
        </div>

        {/* Slash Command Menu */}
        <AnimatePresence>
          {slashMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed z-50"
              style={{
                left: slashCommandPosition.x,
                top: slashCommandPosition.y,
              }}
            >
              <SlashCommandList
                query={slashCommand}
                onSelect={(item) => {
                  item.command();
                  setSlashMenuOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mention Menu */}
        <AnimatePresence>
          {mentionMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
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
                    .run();
                  setMentionMenuOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Color Menu */}
        <AnimatePresence>
          {colorMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed z-50"
              style={{
                left: colorMenuPosition.x,
                top: colorMenuPosition.y,
              }}
            >
              <ColorSelector
                onSelect={(color) => {
                  editor.chain().focus().toggleHighlight({ color }).run();
                  setColorMenuOpen(false);
                }}
                onClose={() => setColorMenuOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Menu */}
        <AnimatePresence>
          {tableMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed z-50"
              style={{
                left: tableMenuPosition.x || window.innerWidth / 2 - 100,
                top: tableMenuPosition.y || window.innerHeight / 2 - 100,
              }}
            >
              <TableMenu
                onSelect={insertTable}
                onClose={() => setTableMenuOpen(false)}
              />
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">Text (optional)</Label>
              <Input
                id="text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use the selected text
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink} disabled={!linkUrl}>
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
            <DialogDescription>
              Upload an image or provide a URL
            </DialogDescription>
          </DialogHeader>
          <ImageUploader
            onInsert={insertImage}
            onCancel={() => setImageUploaderOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish Post</DialogTitle>
            <DialogDescription>
              Your post will be published to your blog
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={visibility === "public" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Public
                </Button>
                <Button
                  variant={visibility === "private" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setVisibility("private")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Private
                </Button>
                <Button
                  variant={visibility === "limited" ? "default" : "outline"}
                  className="w-full justify-start"
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
                className="resize-none"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                This will be used in search results and when sharing on social
                media
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
            <Button
              variant="outline"
              onClick={() => setPublishDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
