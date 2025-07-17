
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, CreditCard, Calendar, Store, DollarSign } from "lucide-react";

export default function Subscriptions() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for subscriptions
  const subscriptions = [
    {
      id: 1,
      storeName: "متجر الإلكترونيات الحديثة",
      planType: "premium",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      amount: 299.99
    },
    {
      id: 2,
      storeName: "أزياء العصر",
      planType: "basic",
      status: "active",
      startDate: "2024-02-10",
      endDate: "2024-11-30",
      amount: 99.99
    },
    {
      id: 3,
      storeName: "مطعم الأصالة",
      planType: "enterprise",
      status: "expired",
      startDate: "2024-01-20",
      endDate: "2024-10-15",
      amount: 599.99
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {t(status)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-purple-600" />
          {t("subscriptions")}
        </h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          {t("add")} {t("subscriptions")}
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
            <SelectItem value="expired">منتهية</SelectItem>
            <SelectItem value="cancelled">ملغية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubscriptions.map((subscription) => (
          <Card key={subscription.id} className="glass-card border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  {subscription.storeName}
                </CardTitle>
                {getStatusBadge(subscription.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">نوع الخطة</div>
                  <Badge variant="outline" className="capitalize">
                    {subscription.planType}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">المبلغ</div>
                  <div className="flex items-center gap-1 font-bold text-green-600">
                    <DollarSign className="w-4 h-4" />
                    {subscription.amount}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ البداية:</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {subscription.startDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {subscription.endDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  {t("edit")}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  {t("view")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
