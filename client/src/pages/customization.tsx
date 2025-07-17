import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Layout, 
  Type, 
  Monitor,
  Smartphone,
  Globe,
  Save,
  RotateCcw,
  Eye,
  Settings
} from "lucide-react";

export default function Customization() {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [borderRadius, setBorderRadius] = useState([12]);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [glassOpacity, setGlassOpacity] = useState([10]);
  const [fontSize, setFontSize] = useState("medium");
  const [layoutDensity, setLayoutDensity] = useState("comfortable");
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableGlassmorphism, setEnableGlassmorphism] = useState(true);

  const colorPresets = [
    { name: "Blue", color: "#3B82F6" },
    { name: "Purple", color: "#8B5CF6" },
    { name: "Green", color: "#10B981" },
    { name: "Orange", color: "#F59E0B" },
    { name: "Red", color: "#EF4444" },
    { name: "Pink", color: "#EC4899" }
  ];

  const handleSaveSettings = () => {
    // Handle saving customization settings
    console.log("Saving settings...");
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setTheme("light");
    setPrimaryColor("#3B82F6");
    setBorderRadius([12]);
    setAnimationSpeed([1]);
    setGlassOpacity([10]);
    setFontSize("medium");
    setLayoutDensity("comfortable");
    setEnableAnimations(true);
    setEnableGlassmorphism(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">UI Customization</h2>
                              <p className="text-muted-foreground">Personalize your dashboard experience</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleResetSettings}
              className="glass-card border-0 bg-white/60 backdrop-blur-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customization Controls */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="appearance" className="space-y-4">
            <TabsList className="glass-card border-0 bg-white/60 backdrop-blur-sm">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              {/* Theme Selection */}
              <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Theme
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        theme === "light" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-br from-[#FF0080] to-[#FFD6FF] rounded-lg mb-2"></div>
                      <p className="text-sm font-medium text-center text-foreground">Light</p>
                    </div>
                    <div 
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        theme === "dark" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-2"></div>
                      <p className="text-sm font-medium text-center text-foreground">Dark</p>
                    </div>
                    <div 
                      onClick={() => setTheme("auto")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        theme === "auto" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-r from-[#FF0080] via-[#FFD6FF] to-[#C6ACFF] rounded-lg mb-2"></div>
                      <p className="text-sm font-medium text-center text-foreground">Auto</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Customization */}
              <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Primary Color
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setPrimaryColor(preset.color)}
                        className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${
                          primaryColor === preset.color ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                        }`}
                        style={{ backgroundColor: preset.color }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Custom Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10 rounded-lg border-0"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 glass-card border-0 bg-white/60 backdrop-blur-sm"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Type className="w-5 h-5 mr-2" />
                    Typography
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Border Radius</Label>
                    <Slider
                      value={borderRadius}
                      onValueChange={setBorderRadius}
                      max={20}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Current: {borderRadius[0]}px</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              {/* Layout Density */}
              <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Layout className="w-5 h-5 mr-2" />
                    Layout Density
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      onClick={() => setLayoutDensity("compact")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        layoutDensity === "compact" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        <div className="space-y-1">
                          <div className="h-2 bg-gray-400 rounded w-8"></div>
                          <div className="h-2 bg-gray-400 rounded w-6"></div>
                          <div className="h-2 bg-gray-400 rounded w-4"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center text-foreground">Compact</p>
                    </div>
                    <div 
                      onClick={() => setLayoutDensity("comfortable")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        layoutDensity === "comfortable" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-2 flex items-center justify-center">
                        <div className="space-y-2">
                          <div className="h-3 bg-blue-400 rounded w-10"></div>
                          <div className="h-3 bg-blue-400 rounded w-8"></div>
                          <div className="h-3 bg-blue-400 rounded w-6"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center text-foreground">Comfortable</p>
                    </div>
                    <div 
                      onClick={() => setLayoutDensity("spacious")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        layoutDensity === "spacious" 
                          ? 'border-purple-500 bg-purple-100/50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-2 flex items-center justify-center">
                        <div className="space-y-3">
                          <div className="h-4 bg-green-400 rounded w-12"></div>
                          <div className="h-4 bg-green-400 rounded w-10"></div>
                          <div className="h-4 bg-green-400 rounded w-8"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center text-foreground">Spacious</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {/* Animation Settings */}
              <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Animation Settings
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground">Enable Animations</Label>
                    <Switch checked={enableAnimations} onCheckedChange={setEnableAnimations} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Animation Speed</Label>
                    <Slider
                      value={animationSpeed}
                      onValueChange={setAnimationSpeed}
                      max={2}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Current: {animationSpeed[0]}x</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground">Enable Glassmorphism</Label>
                    <Switch checked={enableGlassmorphism} onCheckedChange={setEnableGlassmorphism} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Glass Opacity</Label>
                    <Slider
                      value={glassOpacity}
                      onValueChange={setGlassOpacity}
                      max={20}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Current: {glassOpacity[0]}%</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
                <h4 className="font-semibold text-foreground mb-2">Sample Card</h4>
                                  <p className="text-muted-foreground text-sm mb-3">This is how your cards will look with the current settings.</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Sample Button
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sample User</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Device Preview
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                                    <Monitor className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Desktop</span>
              </div>
              <div className="flex items-center space-x-2">
                                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
