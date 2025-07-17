
import { useParams } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Users, MessageSquare, TrendingUp, Calendar, MapPin } from "lucide-react";

export default function StoreDashboard() {
  const { id } = useParams();
  const { t } = useLanguage();

  // Mock store data
  const store = {
    id: parseInt(id || "1"),
    name: "متجر الإلكترونيات الحديثة",
    owner: "أحمد محمد",
    city: "الرياض",
    status: "active",
    subscriptionType: "premium",
    registrationDate: "2024-01-15",
    expiresAt: "2024-12-31"
  };

  const stats = [
    {
      title: "إجمالي الرسائل",
      value: "1,247",
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
      change: "+12%"
    },
    {
      title: "العملاء النشطين",
      value: "342",
      icon: Users,
      color: "from-green-500 to-green-600",
      change: "+8%"
    },
    {
      title: "معدل الاستجابة",
      value: "94%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      change: "+5%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Store Header */}
      <div className="glass-card p-6 rounded-3xl border-0 bg-white/60 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Store className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{store.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {store.owner}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {store.city}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {store.registrationDate}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-green-100 text-green-800 mb-2">
              {t(store.status)}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {store.subscriptionType} • ينتهي في {store.expiresAt}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/70 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-green-600 mt-1">{stat.change} من الشهر الماضي</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>الرسائل الأخيرة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">عميل {i + 1}</div>
                  <div className="text-xs text-muted-foreground">استفسار عن المنتج...</div>
                </div>
                <div className="text-xs text-muted-foreground">منذ {i + 1} ساعة</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
              <span className="text-sm">رسائل اليوم</span>
              <span className="font-bold text-blue-600">23</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
              <span className="text-sm">ردود الذكاء الاصطناعي</span>
              <span className="font-bold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
              <span className="text-sm">متوسط وقت الاستجابة</span>
              <span className="font-bold text-purple-600">2.5 دقيقة</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
