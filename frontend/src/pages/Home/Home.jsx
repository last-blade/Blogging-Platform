import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, X } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Badge } from "../../components/ui/Badge"
import { Card, CardContent } from "../../components/ui/Card"

export default function Home() {



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
                    "PixelPen has transformed the way I share my ideas. The platform is intuitive, and the community is incredibly supportive.",
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

    </div>
  )
}