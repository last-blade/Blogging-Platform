
import { useState } from "react";
import { Bell, BookOpen, Bookmark, Home, Layout, LogOut, Menu, PenTool, Search, Settings, TrendingUp, User, Plus} from 'lucide-react'
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Input } from "../../components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/DropdownMenu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui//Tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/Sheet"
import { Separator } from "../../components/ui/Separator"

function TopBar() {
    const trendingTopics = [
        { name: "Artificial Intelligence", count: 1243 },
        { name: "Web Development", count: 982 },
        { name: "Productivity", count: 756 },
        { name: "UX Design", count: 621 },
        { name: "Remote Work", count: 543 }
      ]
    const user = {
        name: "Alex Johnson",
        username: "alexjohnson",
        avatar: "https://via.placeholder.com/150",
        bio: "Writer, tech enthusiast, and coffee lover. Sharing thoughts on technology, productivity, and life.",
        followers: 1248,
        following: 356,
        posts: 42,
        stats: {
          views: 24689,
          likes: 1872,
          comments: 342
        }
      }
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
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

            <a href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                  P
                </div>
              </div>
              <span className="text-xl font-bold hidden md:inline-block">
                PixelPen
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="#"
                className="flex items-center gap-1 font-medium text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </a>
              <a
                href="#"
                className="flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Reading List
              </a>
              <a
                href="#"
                className="flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </a>
              <a
                href="#"
                className="flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bookmark className="h-4 w-4" />
                Bookmarks
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or authors..."
                className="pl-9 w-[300px] h-9 rounded-full bg-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              className="hidden md:flex items-center gap-2"
              onClick={() => setShowNewPostModal(true)}
            >
              <PenTool className="h-4 w-4" />
              Write
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowNewPostModal(true)}
            >
              <PenTool className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Layout className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <PenTool className="mr-2 h-4 w-4" />
                  <span>My Posts</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Saved</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">P</div>
                </div>
                <span className="text-xl font-bold">PixelPen</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md bg-primary/10 text-primary font-medium">
                <Home className="h-5 w-5" />
                Home
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors">
                <BookOpen className="h-5 w-5" />
                Reading List
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors">
                <TrendingUp className="h-5 w-5" />
                Trending
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors">
                <Bookmark className="h-5 w-5" />
                Bookmarks
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors">
                <User className="h-5 w-5" />
                Profile
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors">
                <Settings className="h-5 w-5" />
                Settings
              </a>
              <Separator />
              <div className="px-2 py-2">
                <p className="text-sm font-medium mb-2">Topics to follow</p>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      {topic.name}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                    <Plus className="h-3 w-3 mr-1" />
                    More
                  </Badge>
                </div>
              </div>
              <Separator />
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-5 w-5" />
                Log out
              </a>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default TopBar;
