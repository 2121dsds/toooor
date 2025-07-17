
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Eye, Pause, Play, Store, Users, Calendar, MapPin, Crown } from "lucide-react";

export default function Stores() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  // Mock data for stores
  const stores = [
    {
      id: 1,
      name: "متجر الإلكترونيات الحديثة",
      owner: "أحمد محمد",
      city: "الرياض",
      status: "active",
      subscriptionType: "premium",
      registrationDate: "2024-01-15",
      expiresAt: "2024-12-31"
    },
    {
      id: 2,
      name: "أزياء العصر",
      owner: "فاطمة أحمد",
      city: "جدة",
      status: "active",
      subscriptionType: "basic",
      registrationDate: "2024-02-10",
      expiresAt: "2024-11-30"
    },
    {
      id: 3,
      name: "مطعم الأصالة",
      owner: "محمد علي",
      city: "الدمام",
      status: "suspended",
      subscriptionType: "enterprise",
      registrationDate: "2024-01-20",
      expiresAt: "2024-10-15"
    },
    {
      id: 4,
      name: "صيدلية الشفاء",
      owner: "سارة خالد",
      city: "الرياض",
      status: "active",
      subscriptionType: "premium",
      registrationDate: "2024-03-05",
      expiresAt: "2025-01-20"
    },
    {
      id: 5,
      name: "متجر الهدايا المميزة",
      owner: "عبدالله حسن",
      city: "جدة",
      status: "pending",
      subscriptionType: "basic",
      registrationDate: "2024-03-20",
      expiresAt: "2024-09-30"
    }
  ];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || store.status === statusFilter;
    const matchesCity = cityFilter === "all" || store.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {t(status)}
      </Badge>
    );
  };

  const getSubscriptionIcon = (type: string) => {
    if (type === "enterprise") return <Crown className="w-4 h-4 text-purple-600" />;
    if (type === "premium") return <Crown className="w-4 h-4 text-yellow-600" />;
    return <Store className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Store className="w-8 h-8 text-blue-600" />
          {t("stores")}
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          {t("add_store")}
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
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] glass-card border-0 bg-white/60">
            <SelectValue placeholder={t("all_status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all_status")}</SelectItem>
            <SelectItem value="active">{t("active")}</SelectItem>
            <SelectItem value="suspended">{t("suspended")}</SelectItem>
            <SelectItem value="pending">{t("pending")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-[180px] glass-card border-0 bg-white/60">
            <SelectValue placeholder={t("all_cities")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all_cities")}</SelectItem>
            <SelectItem value="الرياض">{t("riyadh")}</SelectItem>
            <SelectItem value="جدة">{t("jeddah")}</SelectItem>
            <SelectItem value="الدمام">{t("dammam")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/70 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getSubscriptionIcon(store.subscriptionType)}
                  {store.name}
                </CardTitle>
                {getStatusBadge(store.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{t("store_owner")}: {store.owner}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{t("city")}: {store.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{t("registration_date")}: {store.registrationDate}</span>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">{t("subscription_info")}</h4>
                <div className="flex items-center justify-between text-xs">
                  <span>{t("expires_at")}: {store.expiresAt}</span>
                  <Badge variant="outline" className="text-xs">
                    {store.subscriptionType}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  {t("go_to_dashboard")}
                </Button>
                {store.status === "active" ? (
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
