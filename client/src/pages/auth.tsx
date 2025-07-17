
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react";

interface AuthProps {
  onAuth?: () => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
    // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation
      if (!loginData.email || !loginData.password) {
        throw new Error("Please fill in all fields");
      }

      if (loginData.email === "admin@example.com" && loginData.password === "password") {
        // Success - call the auth handler
        if (onAuth) {
          onAuth();
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
    setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validation
      if (!registerData.firstName || !registerData.lastName || !registerData.email || 
          !registerData.phone || !registerData.password || !registerData.confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (registerData.password !== registerData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!registerData.agreeToTerms) {
        throw new Error("Please agree to the terms and conditions");
      }

      // Success - call the auth handler
    if (onAuth) {
      onAuth();
    }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const updateLoginData = (field: string, value: string | boolean) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateRegisterData = (field: string, value: string | boolean) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FF0080] via-[#FFD6FF] to-[#C6ACFF] dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl border-0 shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-black/10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "ar" ? "مرحباً بك في سارة" : "Welcome to Sara"}
          </h1>
                      <p className="text-muted-foreground">
            {language === "ar" ? "سجل دخولك لإدارة أعمالك" : "Sign in to manage your business"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-card grid w-full grid-cols-2 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-black/30 data-[state=active]:text-foreground dark:data-[state=active]:text-gray-200"
            >
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-black/30 data-[state=active]:text-foreground dark:data-[state=active]:text-gray-200"
            >
              {language === "ar" ? "إنشاء حساب" : "Register"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                    value={loginData.email}
                    onChange={(e) => updateLoginData("email", e.target.value)}
                    className="glass-card pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                    value={loginData.password}
                    onChange={(e) => updateLoginData("password", e.target.value)}
                    className="glass-card pr-10 pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={loginData.rememberMe}
                    onChange={(e) => updateLoginData("rememberMe", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    {language === "ar" ? "تذكرني" : "Remember me"}
                  </Label>
                </div>
                <Button type="button" variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto">
                  {language === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full glass-card bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{language === "ar" ? "جاري تسجيل الدخول..." : "Signing in..."}</span>
                  </div>
                ) : (
                  <span>{language === "ar" ? "تسجيل الدخول" : "Sign In"}</span>
                )}
              </Button>

                              <div className="text-center text-sm text-muted-foreground">
                <span>{language === "ar" ? "للاختبار: admin@example.com / password" : "For testing: admin@example.com / password"}</span>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-muted-foreground dark:text-gray-300">
                    {language === "ar" ? "الاسم الأول" : "First Name"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={language === "ar" ? "الاسم الأول" : "First name"}
                      value={registerData.firstName}
                      onChange={(e) => updateRegisterData("firstName", e.target.value)}
                      className="glass-card pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
            </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-muted-foreground dark:text-gray-300">
                    {language === "ar" ? "اسم العائلة" : "Last Name"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={language === "ar" ? "اسم العائلة" : "Last name"}
                      value={registerData.lastName}
                      onChange={(e) => updateRegisterData("lastName", e.target.value)}
                      className="glass-card pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                    value={registerData.email}
                    onChange={(e) => updateRegisterData("email", e.target.value)}
                    className="glass-card pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "رقم الهاتف" : "Phone"}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={language === "ar" ? "أدخل رقم الهاتف" : "Enter phone number"}
                    value={registerData.phone}
                    onChange={(e) => updateRegisterData("phone", e.target.value)}
                    className="glass-card pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter password"}
                    value={registerData.password}
                    onChange={(e) => updateRegisterData("password", e.target.value)}
                    className="glass-card pr-10 pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-muted-foreground dark:text-gray-300">
                  {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                </Label>
                  <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={language === "ar" ? "أكد كلمة المرور" : "Confirm password"}
                    value={registerData.confirmPassword}
                    onChange={(e) => updateRegisterData("confirmPassword", e.target.value)}
                    className="glass-card pr-10 pl-10 border-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-foreground dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={registerData.agreeToTerms}
                  onChange={(e) => updateRegisterData("agreeToTerms", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  {language === "ar" ? "أوافق على الشروط والأحكام" : "I agree to the terms and conditions"}
                </Label>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full glass-card bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{language === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."}</span>
                  </div>
                ) : (
                  <span>{language === "ar" ? "إنشاء حساب" : "Create Account"}</span>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
