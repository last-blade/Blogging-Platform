import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, } from 'lucide-react'
import { useNavigate } from "react-router-dom"; 
import { loginUser } from "../../api/authApi";
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { Separator } from "../../components/ui/Separator"
import { Checkbox } from "../../components/ui/Checkbox"
import Logo from "../../components/Logo"


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ 
        email: identifier.includes("@") ? identifier : undefined, 
        username: identifier.includes("@") ? undefined : identifier, 
        password 
      });
      
      // document.cookie = `token=${response.data.token}; path=/`;

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]"></div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
            <Logo />
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        <Card className="border-border/40 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-medium">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="identifier" 
                    type="text" 
                    placeholder="email or username" 
                    className="pl-10"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>


              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
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
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <Button variant="outline" className="w-full">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="mr-2 h-4 w-4"
                />
                Continue with Google
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <a href="/terms" className="underline underline-offset-2 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  )
}

export default Login;