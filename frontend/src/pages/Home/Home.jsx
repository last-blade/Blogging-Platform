"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, Search, X, Moon, Sun } from "lucide-react"

import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Badge } from "../../components/ui/Badge"
import { Card, CardContent } from "../../components/ui/Card"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:h-20 md:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                P
              </div>
            </div>
            <span className="text-xl font-bold">PixelPen</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-9 w-[200px] lg:w-[300px] h-9 rounded-full bg-muted"
              />
            </div>
            <Button size="sm">Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container px-4 py-4 mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-9 w-full h-9 rounded-full bg-muted" />
              </div>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Explore
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Categories
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  About
                </a>
              </nav>
              <Button className="w-full">Sign In</Button>
              <Moon size={20}/>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>

          <div className="container px-4 mx-auto md:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
                <Badge className="mb-4" variant="outline">
                  ✨ The Future of Blogging
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
                  Share Your Story With The World
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Discover a platform where ideas flourish, stories captivate, and voices resonate. Join our community
                  of passionate writers and readers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2">
                    Start Writing <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Articles
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-background w-8 h-8">
                        <AvatarImage src={`https://via.placeholder.com/32x32?text=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">10,000+</span> writers already joined
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative lg:h-[500px] hidden lg:block"
              >
                <div className="absolute top-0 right-0 w-full max-w-md p-1 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-lg shadow-xl">
                  {/* <img
                    src="https://via.placeholder.com/600x400?text=Featured+Blog"
                    alt="Featured blog post"
                    className="w-full h-auto rounded"
                  /> */}
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      Technology
                    </Badge>
                    <h3 className="text-lg font-semibold mb-1">The Future of AI in Content Creation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      How artificial intelligence is revolutionizing the way we create and consume content...
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="https://via.placeholder.com/24x24" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Jane Doe • 5 min read</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 left-0 w-full max-w-sm p-1 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-lg shadow-xl">
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      Lifestyle
                    </Badge>
                    <h3 className="text-lg font-semibold mb-1">Minimalism: Less is More</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Exploring how minimalist principles can transform your life and increase happiness...
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="https://via.placeholder.com/24x24" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Mark Smith • 3 min read</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge variant="outline" className="mb-4">
                  Featured Content
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trending Articles</h2>
              </div>
              <Button variant="ghost" className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
                View all articles <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "The Art of Storytelling in the Digital Age",
                  category: "Writing",
                  image: "https://hbr.org/resources/images/article_assets/2021/05/A_May21_14_Storytelling-4-Ways_Ruby-Taylor.png",
                  author: "Alex Johnson",
                  time: "7 min read",
                },
                {
                  title: "10 Productivity Hacks for Busy Writers",
                  category: "Productivity",
                  image: "https://www.activtrak.com/wp-content/uploads/2024/11/blog-productivity-hacks-q4-24.jpg",
                  author: "Sarah Williams",
                  time: "5 min read",
                },
                {
                  title: "How to Build a Loyal Readership from Scratch",
                  category: "Marketing",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuGKWnQYmSLR9Ql8IoY_06-yazMAbsUywfsg&s",
                  author: "Michael Chen",
                  time: "8 min read",
                },
              ].map((post, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge>{post.category}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={`https://via.placeholder.com/24x24?text=${post.author.charAt(0)}`} />
                              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{post.author}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-8 md:hidden">
              <Button variant="outline" className="flex items-center gap-2">
                View all articles <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 mx-auto md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4">
                Discover
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Explore by Category</h2>
              <p className="text-muted-foreground">
                Find content that matches your interests from our diverse collection of topics
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { name: "Technology", count: 120, icon: "💻" },
                { name: "Lifestyle", count: 85, icon: "🌿" },
                { name: "Travel", count: 64, icon: "✈️" },
                { name: "Food", count: 92, icon: "🍕" },
                { name: "Health", count: 78, icon: "💪" },
                { name: "Business", count: 56, icon: "📊" },
                { name: "Art & Design", count: 43, icon: "🎨" },
                { name: "Science", count: 37, icon: "🔬" },
              ].map((category, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <a href="#" className="block">
                    <Card className="h-full transition-all hover:shadow-md hover:bg-primary/5">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="flex-shrink-0 text-3xl">{category.icon}</div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.count} articles</p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto md:px-8">
            <div className="relative overflow-hidden rounded-xl bg-primary/10 p-8 md:p-12">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.2),transparent_70%)]"></div>

              <div className="grid gap-8 md:grid-cols-2 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="mb-4">Stay Updated</Badge>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Subscribe to Our Newsletter</h2>
                  <p className="text-muted-foreground mb-6">
                    Get the latest articles, resources, and insights delivered directly to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input placeholder="Enter your email" className="bg-background" />
                    <Button>Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="hidden md:block"
                >
                  <img
                    src="https://sendgrid.com/content/dam/sendgrid/legacy/2021/09/Untitled-design-53.png"
                    alt="Newsletter illustration"
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 mx-auto md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">What Our Community Says</h2>
              <p className="text-muted-foreground">
                Join thousands of writers and readers who have found their home on our platform
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  quote:
                    "Blogify has transformed the way I share my ideas. The platform is intuitive, and the community is incredibly supportive.",
                  author: "Jessica Miller",
                  role: "Travel Blogger",
                },
                {
                  quote:
                    "As a tech writer, I've tried many platforms, but none compare to the reach and engagement I get here. The analytics tools are fantastic!",
                  author: "David Chen",
                  role: "Tech Writer",
                },
                {
                  quote:
                    "The quality of content on this platform is outstanding. I've discovered so many talented writers and diverse perspectives.",
                  author: "Sophia Rodriguez",
                  role: "Reader",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="text-primary mb-4">{"★".repeat(5)}</div>
                      <p className="mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://via.placeholder.com/40x40?text=${testimonial.author.charAt(0)}`} />
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4">Get Started Today</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-6">
                Ready to Share Your Voice with the World?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of writers and readers. Create, connect, and grow with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Create Your Account <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="container px-4 py-12 mx-auto md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                    P
                  </div>
                </div>
                <span className="text-xl font-bold">PixelPen</span>
              </a>
              <p className="text-sm text-muted-foreground mb-4">
                A modern platform for writers and readers to connect, create, and discover amazing content.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Featured Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Authors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Writing Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Style Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Content Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    DMCA
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} PixelPen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}