import React from 'react'

function Footer() {
  return (
    <div>
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

export default Footer