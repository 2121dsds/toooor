
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, BookOpen, Play, Clock, Users } from "lucide-react";

export default function Tutorials() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for tutorials
  const tutorials = [
    {
      id: 1,
      title: "كيفية إنشاء متجر جديد",
      description: "تعلم كيفية إنشاء وإعداد متجر جديد على المنصة",
      category: "getting_started",
      duration: "5 دقائق",
      views: 1250,
      thumbnail: "/api/placeholder/300/200",
      difficulty: "مبتدئ"
    },
    {
      id: 2,
      title: "إدارة المنتجات والمخزون",
      description: "دليل شامل لإدارة المنتجات وتتبع المخزون",
      category: "management",
      duration: "8 دقائق",
      views: 980,
      thumbnail: "/api/placeholder/300/200",
      difficulty: "متوسط"
    },
    {
      id: 3,
      title: "استخدام الذكاء الاصطناعي للردود",
      description: "كيفية تفعيل وتخصيص الردود الذكية للعملاء",
      category: "ai_features",
      duration: "6 دقائق",
      views: 1500,
      thumbnail: "/api/placeholder/300/200",
      difficulty: "متقدم"
    },
    {
      id: 4,
      title: "تحليل البيانات والتقارير",
      description: "فهم واستخدام لوحة التحليلات والتقارير",
      category: "analytics",
      duration: "10 دقائق",
      views: 750,
      thumbnail: "/api/placeholder/300/200",
      difficulty: "متوسط"
    },
    {
      id: 5,
      title: "إعداد المدفوعات والاشتراكات",
      description: "كيفية إعداد وسائل الدفع والاشتراكات",
      category: "payments",
      duration: "7 دقائق",
      views: 1100,
      thumbnail: "/api/placeholder/300/200",
      difficulty: "مبتدئ"
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || tutorial.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "مبتدئ": return "bg-green-100 text-green-800";
      case "متوسط": return "bg-yellow-100 text-yellow-800";
      case "متقدم": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          {t("tutorials")}
        </h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          إضافة درس جديد
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-card border-0 bg-white/60"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px] glass-card border-0 bg-white/60">
            <SelectValue placeholder="كل الفئات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الفئات</SelectItem>
            <SelectItem value="getting_started">البداية</SelectItem>
            <SelectItem value="management">الإدارة</SelectItem>
            <SelectItem value="ai_features">الذكاء الاصطناعي</SelectItem>
            <SelectItem value="analytics">التحليلات</SelectItem>
            <SelectItem value="payments">المدفوعات</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <Card key={tutorial.id} className="glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/70 transition-all group">
            <CardHeader className="pb-3">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Play className="w-12 h-12 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                </div>
                <Badge className={getDifficultyColor(tutorial.difficulty)} variant="outline">
                  {tutorial.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">
                {tutorial.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tutorial.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{tutorial.views} مشاهدة</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  <Play className="w-4 h-4 mr-1" />
                  مشاهدة
                </Button>
                <Button size="sm" variant="outline">
                  {t("edit")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="glass-card border-0 bg-white/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tutorials.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الدروس</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 bg-white/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {tutorials.reduce((sum, t) => sum + t.views, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 bg-white/60">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {tutorials.reduce((sum, t) => sum + parseInt(t.duration), 0)} دقيقة
                </p>
                <p className="text-sm text-muted-foreground">إجمالي المدة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
