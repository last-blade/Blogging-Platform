import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Bookmark, ChevronDown, Edit, Heart, Image, MessageSquare, MoreHorizontal, PenTool, Plus, Share2, Sparkles, Users, X } from 'lucide-react'

import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Badge } from "../../components/ui/Badge"
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"

import { ScrollArea } from "../../components/ui/ScrollArea"
import { Progress } from "../../components/ui/Progress"


function Explore() {
      const [notificationsOpen, setNotificationsOpen] = useState(false)
      const [searchQuery, setSearchQuery] = useState("")
      const [activeTab, setActiveTab] = useState("for-you")
      const [showNewPostModal, setShowNewPostModal] = useState(false)
      
      // Mock user data
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
      
      // Mock notifications
      const notifications = [
        {
          id: 1,
          type: "like",
          user: "Sarah Miller",
          avatar: "https://via.placeholder.com/40?text=SM",
          content: "liked your post",
          post: "The Future of Web Development",
          time: "2m ago",
          read: false
        },
        {
          id: 2,
          type: "comment",
          user: "David Chen",
          avatar: "https://via.placeholder.com/40?text=DC",
          content: "commented on your post",
          post: "10 Productivity Tips for Developers",
          time: "15m ago",
          read: false
        },
        {
          id: 3,
          type: "follow",
          user: "Emma Wilson",
          avatar: "https://via.placeholder.com/40?text=EW",
          content: "started following you",
          time: "1h ago",
          read: true
        },
        {
          id: 4,
          type: "mention",
          user: "James Rodriguez",
          avatar: "https://via.placeholder.com/40?text=JR",
          content: "mentioned you in a comment",
          post: "The Art of Storytelling",
          time: "3h ago",
          read: true
        },
        {
          id: 5,
          type: "like",
          user: "Olivia Parker",
          avatar: "https://via.placeholder.com/40?text=OP",
          content: "liked your post",
          post: "Understanding Modern JavaScript",
          time: "5h ago",
          read: true
        }
      ]
      
      // Mock feed posts
      const feedPosts = [
        {
          id: 1,
          author: {
            name: "Emma Wilson",
            username: "emmawilson",
            avatar: "https://via.placeholder.com/40?text=EW"
          },
          title: "The Evolution of User Interface Design",
          excerpt: "From skeuomorphism to flat design to neumorphism, UI design has evolved dramatically over the past decade. Let's explore the journey and what might come next.",
          coverImage: "https://media.licdn.com/dms/image/v2/D5612AQEA-cSdzGBKUw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1727764283682?e=2147483647&v=beta&t=RNHiLbYlDgQ77xn3f5Uhf6RnTWTx8kRT3HPLOtnhk30",
          tags: ["Design", "UI/UX", "Technology"],
          readTime: "8 min read",
          publishedAt: "2 hours ago",
          likes: 243,
          comments: 42,
          bookmarked: true
        },
        {
          id: 2,
          author: {
            name: "David Chen",
            username: "davidchen",
            avatar: "https://via.placeholder.com/40?text=DC"
          },
          title: "Building Scalable React Applications: Best Practices",
          excerpt: "As your React application grows, maintaining code quality and performance becomes challenging. Here are the strategies I've learned from scaling applications to millions of users.",
          coverImage:"https://cdn.buttercms.com/HvF5RV19RbmdDZzHY0OH",
          tags: ["React", "JavaScript", "Web Development"],
          readTime: "12 min read",
          publishedAt: "Yesterday",
          likes: 187,
          comments: 35,
          bookmarked: false
        },
        {
          id: 3,
          author: {
            name: "Sophia Rodriguez",
            username: "sophiarodriguez",
            avatar: "https://via.placeholder.com/40?text=SR"
          },
          title: "The Psychology of Color in Digital Marketing",
          excerpt: "Colors influence our emotions and behaviors more than we realize. Learn how to strategically use color psychology to enhance your digital marketing campaigns.",
          coverImage: "https://media.licdn.com/dms/image/v2/D5612AQEUOU0tszTGJw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1734710925090?e=2147483647&v=beta&t=3pc8w5QEh6UmwI4hmhJpcbS8fVoqoKqsUV_K6NYGgHg",
          tags: ["Marketing", "Psychology", "Design"],
          readTime: "6 min read",
          publishedAt: "2 days ago",
          likes: 312,
          comments: 28,
          bookmarked: false
        }
      ]
      
      // Mock trending topics
      const trendingTopics = [
        { name: "Artificial Intelligence", count: 1243 },
        { name: "Web Development", count: 982 },
        { name: "Productivity", count: 756 },
        { name: "UX Design", count: 621 },
        { name: "Remote Work", count: 543 }
      ]
      
      // Mock suggested writers
      const suggestedWriters = [
        {
          name: "Michael Park",
          username: "michaelpark",
          avatar: "https://via.placeholder.com/40?text=MP",
          bio: "AI researcher and tech writer",
          followers: 12.4
        },
        {
          name: "Jasmine Lee",
          username: "jasminelee",
          avatar: "https://via.placeholder.com/40?text=JL",
          bio: "UX designer and accessibility advocate",
          followers: 8.7
        },
        {
          name: "Robert Turner",
          username: "robertturner",
          avatar: "https://via.placeholder.com/40?text=RT",
          bio: "Full-stack developer and educator",
          followers: 15.2
        }
      ]
      
      // Mock drafts
      const drafts = [
        {
          id: 1,
          title: "The Rise of No-Code Development Platforms",
          lastEdited: "Today, 10:23 AM",
          progress: 65
        },
        {
          id: 2,
          title: "Mastering CSS Grid Layout",
          lastEdited: "Yesterday, 4:17 PM",
          progress: 90
        }
      ]
    
      const fadeIn = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.4 }
        }
      }
      
      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }
      
      const slideUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.4 }
        }
      }
  return (
    <div className="min-h-screen bg-background flex justify-center border border-green-600">
    {/* Main Content */}
    <main className="container px-4 md:px-6 py-20 flex justify-center border border-yellow-500">
      {/* Main Feed */}
      <div className="md:col-span-6 space-y-6 border border-red-600">
        <Tabs defaultValue="for-you" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="for-you" 
              className={`px-4 py-2 border-b-2 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "for-you" ? "border-primary font-medium" : "border-transparent text-muted-foreground"}`}
            >
              For You
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className={`px-4 py-2 border-b-2 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "following" ? "border-primary font-medium" : "border-transparent text-muted-foreground"}`}
            >
              Following
            </TabsTrigger>
            <TabsTrigger 
              value="recent" 
              className={`px-4 py-2 border-b-2 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "recent" ? "border-primary font-medium" : "border-transparent text-muted-foreground"}`}
            >
              Recent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you" className="mt-6 space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {feedPosts.map((post) => (
                <motion.div key={post.id} variants={slideUp} className="mb-8">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.author.name}</p>
                              <p className="text-xs text-muted-foreground">@{post.author.username} · {post.publishedAt}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">{post.title}</h3>
                          <p className="text-muted-foreground">{post.excerpt}</p>
                        </div>
                      </div>
                      
                      <img 
                        src={post.coverImage || "/placeholder.svg"} 
                        alt={post.title} 
                        className="w-full h-[200px] md:h-[300px] object-cover"
                      />
                      
                      <div className="p-4 md:p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Heart className={`h-4 w-4 ${post.liked ? "fill-primary text-primary" : ""}`} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={post.bookmarked ? "text-primary" : ""}
                          >
                            <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-primary" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center">
              <Button variant="outline" className="gap-2">
                Load more
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="following" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Follow writers to see their content here</h3>
              <p className="text-muted-foreground mb-6 max-w-md">When you follow writers, their posts will appear in your Following feed.</p>
              <Button>Discover writers to follow</Button>
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6 max-w-md">We're working on bringing you the most recent content from across the platform.</p>
              <Button variant="outline">Explore trending topics</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Right Sidebar - Trending & Suggestions */}
      <aside className="hidden md:block md:col-span-3 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Trending Topics</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium">{topic.name}</p>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    {topic.count}+ posts
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
              View all topics
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Writers to Follow</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedWriters.map((writer, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={writer.avatar} alt={writer.name} />
                    <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{writer.name}</p>
                    <p className="text-xs text-muted-foreground">@{writer.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{writer.bio}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Follow
                </Button>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-primary">
              Show more
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Reading List</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">The Art of Productive Writing</p>
                  <p className="text-xs text-muted-foreground">5 min read</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">10 VS Code Extensions for Developers</p>
                  <p className="text-xs text-muted-foreground">8 min read</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
              View reading list
            </Button>
          </CardContent>
        </Card>
        
        <div className="text-xs text-muted-foreground space-y-2">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Status</a>
            <a href="#" className="hover:underline">Writers</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">About</a>
          </div>
          <p>© 2023 PixelPen. All rights reserved.</p>
        </div>
      </aside>
    </main>
  </div>
  )
}

export default Explore