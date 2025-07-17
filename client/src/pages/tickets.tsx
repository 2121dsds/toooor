
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Ticket, Clock, User, AlertCircle } from "lucide-react";

export default function Tickets() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Mock data for tickets
  const tickets = [
    {
      id: 1,
      title: "مشكلة في تسجيل الدخول",
      description: "لا أستطيع تسجيل الدخول إلى المتجر",
      status: "open",
      priority: "high",
      storeName: "متجر الإلكترونيات الحديثة",
      assignedTo: "أحمد محمد",
      createdAt: "2024-03-20T10:30:00"
    },
    {
      id: 2,
      title: "مشكلة في المدفوعات",
      description: "العملاء لا يستطيعون إتمام عملية الدفع",
      status: "in_progress",
      priority: "urgent",
      storeName: "أزياء العصر",
      assignedTo: "فاطمة أحمد",
      createdAt: "2024-03-19T14:15:00"
    },
    {
      id: 3,
      title: "طلب ميزة جديدة",
      description: "أحتاج إضافة تقارير تفصيلية للمبيعات",
      status: "closed",
      priority: "medium",
      storeName: "مطعم الأصالة",
      assignedTo: "محمد علي",
      createdAt: "2024-03-18T09:45:00"
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      closed: "bg-green-100 text-green-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {t(status)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {priority}
      </Badge>
    );
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "urgent" || priority === "high") {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return <Clock className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Ticket className="w-8 h-8 text-orange-600" />
          {t("tickets")}
        </h1>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          تذكرة جديدة
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
            <SelectItem value="open">{t("open")}</SelectItem>
            <SelectItem value="in_progress">{t("in_progress")}</SelectItem>
            <SelectItem value="closed">{t("closed")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px] glass-card border-0 bg-white/60">
            <SelectValue placeholder="كل الأولويات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأولويات</SelectItem>
            <SelectItem value="low">منخفضة</SelectItem>
            <SelectItem value="medium">متوسطة</SelectItem>
            <SelectItem value="high">عالية</SelectItem>
            <SelectItem value="urgent">عاجلة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/70 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getPriorityIcon(ticket.priority)}
                  {ticket.title}
                </CardTitle>
                <div className="flex gap-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">{ticket.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">المتجر: </span>
                  <span className="font-medium">{ticket.storeName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">مُعيّن إلى: </span>
                  <span className="font-medium">{ticket.assignedTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">تاريخ الإنشاء: </span>
                  <span className="font-medium">
                    {new Date(ticket.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  {t("view")}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  {t("edit")}
                </Button>
                {ticket.status !== "closed" && (
                  <Button size="sm" variant="outline" className="flex-1 text-green-600 hover:text-green-700">
                    إغلاق
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
