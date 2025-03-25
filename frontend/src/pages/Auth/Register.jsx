"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Github, Twitter, Check, X } from "lucide-react"

import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { Checkbox } from "../../components/ui/Checkbox"
import { Separator } from "../../components/ui/Separator"
import { Progress } from "../../components/ui/Progress"
import Logo from "../../components/Logo"


function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ name, email, password, confirmPassword, agreeTerms })
  }

  useEffect(() => {
    // Check password criteria
    const criteria = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    }

    setPasswordCriteria(criteria)

    // Calculate password strength (0-100)
    const metCriteria = Object.values(criteria).filter(Boolean).length
    setPasswordStrength(metCriteria * 20)
  }, [password])

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak"
    if (passwordStrength <= 40) return "Weak"
    if (passwordStrength <= 60) return "Medium"
    if (passwordStrength <= 80) return "Strong"
    return "Very Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 20) return "bg-destructive"
    if (passwordStrength <= 40) return "bg-destructive/80"
    if (passwordStrength <= 60) return "bg-yellow-500"
    if (passwordStrength <= 80) return "bg-green-500/80"
    return "bg-green-500"
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]"></div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full max-w-md">
        <div className="text-center mb-8">
            <Logo />
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-muted-foreground mt-2">Sign up to get started with PixelPen</p>
        </div>

        <Card className="border-border/40 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>

                {password && (
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">{getPasswordStrengthText()}</span>
                      <span className="text-xs">{passwordStrength}%</span>
                    </div>
                    <Progress value={passwordStrength} className={`h-1 ${getPasswordStrengthColor()}`} />

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center gap-2 text-xs">
                        {passwordCriteria.minLength ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={passwordCriteria.minLength ? "text-foreground" : "text-muted-foreground"}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordCriteria.hasUppercase ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={passwordCriteria.hasUppercase ? "text-foreground" : "text-muted-foreground"}>
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordCriteria.hasLowercase ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={passwordCriteria.hasLowercase ? "text-foreground" : "text-muted-foreground"}>
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordCriteria.hasNumber ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={passwordCriteria.hasNumber ? "text-foreground" : "text-muted-foreground"}>
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {passwordCriteria.hasSpecial ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={passwordCriteria.hasSpecial ? "text-foreground" : "text-muted-foreground"}>
                          Special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 ${confirmPassword && password !== confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={setAgreeTerms} className="mt-1" />
                <label htmlFor="terms" className="text-sm leading-tight">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!agreeTerms || password !== confirmPassword || passwordStrength < 60}
              >
                Create account
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Register;