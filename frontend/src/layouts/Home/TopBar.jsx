import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { motion } from 'framer-motion'

function TopBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    const handleDarkMode = () => {
      if(isDarkMode == true){
        setDarkMode(false)
      }
      else{
        setDarkMode(true)
      }
    }

  return (
    <div>
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
            <div className='flex gap-7 bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-full'>
            {
              isDarkMode == true 
              ? 
              <div className='bg-white w-6 h-6 flex justify-center items-center rounded-2xl' onClick={handleDarkMode}>
                <Moon size={15} className='cursor-pointer text-black rounded-2xl'/>
              </div>
              :
              <div className='bg-white w-6 h-6 flex justify-center items-center rounded-2xl' onClick={handleDarkMode}>
                <Sun size={15} className='cursor-pointer text-black rounded-2xl'/>
              </div>
            }
            </div>
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
              <Button className="w-full">Login</Button>
            </div>
          </motion.div>
        )}
      </header>
    </div>
  )
}

export default TopBar