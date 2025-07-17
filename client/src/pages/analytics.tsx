import { useQuery } from "@tanstack/react-query";
import { LineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { MetricCard } from "@/components/cards/metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, BarChart2, TrendingUp, List, FileText, Trash } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart as ReLineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import React from "react"; // Added missing import for React

export default function Analytics() {
  const { t, language } = useLanguage();
  // بيانات وهمية
  const stores = [
    { id: 1, name: language === 'ar' ? 'متجر الرياض' : 'Riyadh Store' },
    { id: 2, name: language === 'ar' ? 'متجر جدة' : 'Jeddah Store' },
    { id: 3, name: language === 'ar' ? 'متجر الدمام' : 'Dammam Store' },
  ];
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedRange, setSelectedRange] = useState('7d');
  // بيانات النشاط لكل متجر
  const activityData = [
    { store: stores[0].name, activity: 120 },
    { store: stores[1].name, activity: 95 },
    { store: stores[2].name, activity: 60 },
  ];
  // بيانات المتاجر الأكثر مبيعاً
  const topSales = [
    { store: stores[0].name, sales: 3200 },
    { store: stores[1].name, sales: 2100 },
    { store: stores[2].name, sales: 1800 },
  ];
  // بيانات الكلمات المفتاحية
  const keywords = [
    { word: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery', count: 42 },
    { word: language === 'ar' ? 'خصم' : 'Discount', count: 37 },
    { word: language === 'ar' ? 'دعم' : 'Support', count: 29 },
  ];
  // بيانات وهمية للبطاقات الإحصائية
  const kpiCards = [
    {
      title: language === 'ar' ? 'إجمالي النشاط' : 'Total Activity',
      value: 275,
      icon: <BarChart2 className="w-7 h-7 text-blue-500" />, // معدل النشاط
      trend: '+12%',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: language === 'ar' ? 'أعلى مبيعات' : 'Top Sales',
      value: 3200,
      icon: <TrendingUp className="w-7 h-7 text-green-500" />, // المبيعات
      trend: '+8%',
      color: 'from-green-400 to-green-600',
    },
    {
      title: language === 'ar' ? 'الكلمات الشائعة' : 'Top Keywords',
      value: 42,
      icon: <List className="w-7 h-7 text-purple-500" />, // الكلمات المفتاحية
      trend: '+5%',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: language === 'ar' ? 'تقارير مُصدّرة' : 'Exported Reports',
      value: 7,
      icon: <FileText className="w-7 h-7 text-pink-500" />, // التقارير
      trend: '+2',
      color: 'from-pink-400 to-pink-600',
    },
  ];

  // Dummy data for charts
  const activityLineData = [
    { name: 'Jan', activity: 100 },
    { name: 'Feb', activity: 120 },
    { name: 'Mar', activity: 110 },
    { name: 'Apr', activity: 130 },
    { name: 'May', activity: 140 },
    { name: 'Jun', activity: 150 },
    { name: 'Jul', activity: 160 },
    { name: 'Aug', activity: 170 },
    { name: 'Sep', activity: 180 },
    { name: 'Oct', activity: 190 },
    { name: 'Nov', activity: 200 },
    { name: 'Dec', activity: 210 },
  ];

  const salesDonutData = [
    { name: 'متجر الرياض', value: 3200 },
    { name: 'متجر جدة', value: 2100 },
    { name: 'متجر الدمام', value: 1800 },
  ];

  const keywordsBarData = [
    { name: 'توصيل سريع', count: 42 },
    { name: 'خصم', count: 37 },
    { name: 'دعم', count: 29 },
  ];

  // عدل بيانات التقارير ليكون فيها count
  const reportsLineData = [
    { date: '2023-10-01', count: 2 },
    { date: '2023-10-02', count: 4 },
    { date: '2023-10-03', count: 1 },
    { date: '2023-10-04', count: 3 },
  ];

  // بيانات وهمية متغيرة حسب الفلاتر
  const filteredActivityData = useMemo(() => {
    let base = [
      { store: stores[0].name, activity: 120 },
      { store: stores[1].name, activity: 95 },
      { store: stores[2].name, activity: 60 },
    ];
    if (selectedStore !== 'all') base = base.filter(row => row.store === stores.find(s => s.id+'' === selectedStore)?.name);
    // غير القيم حسب الفلتر الزمني (مجرد مثال وهمي)
    if (selectedRange === '30d') base = base.map(row => ({ ...row, activity: row.activity + 30 }));
    if (selectedRange === '90d') base = base.map(row => ({ ...row, activity: row.activity + 60 }));
    if (selectedRange === '1y') base = base.map(row => ({ ...row, activity: row.activity + 120 }));
    return base;
  }, [selectedStore, selectedRange, stores]);

  const filteredTopSales = useMemo(() => {
    let base = [
      { store: stores[0].name, sales: 3200 },
      { store: stores[1].name, sales: 2100 },
      { store: stores[2].name, sales: 1800 },
    ];
    if (selectedStore !== 'all') base = base.filter(row => row.store === stores.find(s => s.id+'' === selectedStore)?.name);
    if (selectedRange === '30d') base = base.map(row => ({ ...row, sales: row.sales + 500 }));
    if (selectedRange === '90d') base = base.map(row => ({ ...row, sales: row.sales + 1200 }));
    if (selectedRange === '1y') base = base.map(row => ({ ...row, sales: row.sales + 2500 }));
    return base;
  }, [selectedStore, selectedRange, stores]);

  const filteredKeywords = useMemo(() => {
    let base = [
      { word: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery', count: 42 },
      { word: language === 'ar' ? 'خصم' : 'Discount', count: 37 },
      { word: language === 'ar' ? 'دعم' : 'Support', count: 29 },
    ];
    if (selectedRange === '30d') base = base.map(row => ({ ...row, count: row.count + 10 }));
    if (selectedRange === '90d') base = base.map(row => ({ ...row, count: row.count + 20 }));
    if (selectedRange === '1y') base = base.map(row => ({ ...row, count: row.count + 40 }));
    return base;
  }, [selectedRange, language]);

  // بيانات KPIs متغيرة
  const filteredKpiCards = useMemo(() => [
    {
      title: language === 'ar' ? 'إجمالي النشاط' : 'Total Activity',
      value: filteredActivityData.reduce((acc, row) => acc + row.activity, 0),
      icon: <BarChart2 className="w-10 h-10 text-white drop-shadow-lg animate-float" />, // معدل النشاط
      trend: '+12%',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: language === 'ar' ? 'أعلى مبيعات' : 'Top Sales',
      value: filteredTopSales.length > 0 ? Math.max(...filteredTopSales.map(r => r.sales)) : 0,
      icon: <TrendingUp className="w-10 h-10 text-white drop-shadow-lg animate-float" />, // المبيعات
      trend: '+8%',
      color: 'from-green-400 to-green-600',
    },
    {
      title: language === 'ar' ? 'الكلمات الشائعة' : 'Top Keywords',
      value: filteredKeywords.length > 0 ? filteredKeywords[0].count : 0,
      icon: <List className="w-10 h-10 text-white drop-shadow-lg animate-float" />, // الكلمات المفتاحية
      trend: '+5%',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: language === 'ar' ? 'تقارير مُصدّرة' : 'Exported Reports',
      value: 7,
      icon: <FileText className="w-7 h-7 text-pink-500 animate-float" />, // التقارير
      trend: '+2',
      color: 'from-pink-400 to-pink-600',
    },
  ], [filteredActivityData, filteredTopSales, filteredKeywords, language]);

  // بيانات الشارتات متغيرة
  const filteredActivityLineData = useMemo(() => {
    // مثال: غير القيم حسب الفلتر
    return [
      { name: 'Jan', activity: 100 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Feb', activity: 120 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Mar', activity: 110 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Apr', activity: 130 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'May', activity: 140 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Jun', activity: 150 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Jul', activity: 160 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Aug', activity: 170 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Sep', activity: 180 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Oct', activity: 190 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Nov', activity: 200 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
      { name: 'Dec', activity: 210 + (selectedRange === '30d' ? 20 : selectedRange === '90d' ? 40 : selectedRange === '1y' ? 80 : 0) },
    ];
  }, [selectedRange]);

  const filteredSalesDonutData = useMemo(() => {
    return filteredTopSales.map(row => ({ name: row.store, value: row.sales }));
  }, [filteredTopSales]);

  const filteredKeywordsBarData = useMemo(() => {
    return filteredKeywords.map(row => ({ name: row.word, count: row.count }));
  }, [filteredKeywords]);

  // بدّل بيانات جدول التقارير لتكون:
  const reportsTableData = [
    {
      name: language === 'ar' ? 'تقرير المبيعات الشهري' : 'Monthly Sales Report',
      date: '2023-10-01',
    },
    {
      name: language === 'ar' ? 'تقرير النشاط اليومي' : 'Daily Activity Report',
      date: '2023-10-02',
    },
  ];

  return (
    <div className="space-y-8">
      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredKpiCards.map((card, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.color} shadow-lg animate-float`}>
                {React.cloneElement(card.icon, { className: 'w-7 h-7 text-white' })}
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                <div className="text-lg text-muted-foreground">{card.title}</div>
                <div className="text-xs text-green-500 mt-1">{card.trend}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mt-2">
        <Select value={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="glass-card rounded-xl border-0 bg-white/60 backdrop-blur-sm w-44">
            <SelectValue placeholder={t("time_range")}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">{t("last_7_days")}</SelectItem>
            <SelectItem value="30d">{t("last_30_days")}</SelectItem>
            <SelectItem value="90d">{t("last_90_days")}</SelectItem>
            <SelectItem value="1y">{t("last_year")}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStore} onValueChange={setSelectedStore}>
          <SelectTrigger className="glass-card rounded-xl border-0 bg-white/60 backdrop-blur-sm w-44">
            <SelectValue placeholder={t("store_filter")}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all_stores")}</SelectItem>
            {stores.map(s => <SelectItem key={s.id} value={s.id+''}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* شبكة التحليلات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 h-auto">
        {/* مربع النشاط */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in flex flex-col aspect-square min-h-[340px] min-w-[340px]">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <BarChart2 className="w-8 h-8" /> {t("activity_tab")}
            </h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 h-full w-full flex flex-col justify-center overflow-auto">
              <table className="w-full h-full text-base rounded-xl glass-card table-fixed no-scale-on-hover">
                <thead>
                  <tr className="border-b border-gray-200 bg-white/60">
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("store")}</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("activity_rate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivityData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-purple-100/50 transition-all">
                      <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{row.store}</td>
                      <td className="py-3 px-4 text-muted-foreground font-bold">{row.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex-1 flex items-center justify-center h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={filteredActivityLineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line type="monotone" dataKey="activity" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-3 mt-2 w-full px-4 pb-2">
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> PDF</Button>
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> Excel</Button>
          </div>
        </div>
        {/* مربع المبيعات */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in flex flex-col aspect-square min-h-[340px] min-w-[340px]">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <TrendingUp className="w-8 h-8" /> {t("sales_tab")}
            </h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 h-full w-full flex flex-col justify-center overflow-auto">
              <table className="w-full h-full text-base rounded-xl glass-card table-fixed no-scale-on-hover">
                <thead>
                  <tr className="border-b border-gray-200 bg-white/60">
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">#</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("store")}</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("sales")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTopSales.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-green-100/50 transition-all">
                      <td className="py-3 px-4 text-muted-foreground font-bold">{idx+1}</td>
                      <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" /> {row.store}
                      </td>
                      <td className="py-3 px-4 text-green-700 font-bold">{row.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex-1 flex items-center justify-center h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredSalesDonutData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    label
                  >
                    {filteredSalesDonutData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={["#22c55e", "#3b82f6", "#a21caf"][idx % 3]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-3 mt-2 w-full px-4 pb-2">
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> PDF</Button>
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> Excel</Button>
          </div>
        </div>
        {/* مربع الكلمات المفتاحية */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in flex flex-col aspect-square min-h-[340px] min-w-[340px]">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
              <List className="w-8 h-8" /> {t("keywords_tab")}
            </h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 h-full w-full flex flex-col justify-center overflow-auto">
              <table className="w-full h-full text-base rounded-xl glass-card table-fixed no-scale-on-hover">
                <thead>
                  <tr className="border-b border-gray-200 bg-white/60">
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("keyword")}</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("count")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-purple-100/50 transition-all">
                      <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{row.word}</td>
                      <td className="py-3 px-4 text-muted-foreground font-bold">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex-1 flex items-center justify-center h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredKeywordsBarData} layout="vertical">
                  <XAxis type="number" stroke="#a21caf" fontSize={12} />
                  <YAxis type="category" dataKey="name" width={80} stroke="#a21caf" fontSize={14} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="count" fill="#a21caf" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-3 mt-2 w-full px-4 pb-2">
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> PDF</Button>
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> Excel</Button>
          </div>
        </div>
        {/* مربع التقارير */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in flex flex-col aspect-square min-h-[340px] min-w-[340px]">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
              <FileText className="w-8 h-8" /> {t("reports_tab")}
            </h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 h-full w-full flex flex-col justify-center overflow-auto">
              <table className="w-full h-full text-base rounded-xl glass-card table-fixed no-scale-on-hover">
                <thead>
                  <tr className="border-b border-gray-200 bg-white/60">
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("report_name")}</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap text-foreground">{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsTableData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-pink-100/50 transition-all">
                      <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{row.name}</td>
                      <td className="py-3 px-4 text-muted-foreground font-bold">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex-1 flex items-center justify-center h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={reportsLineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#ec4899" fontSize={12} />
                  <YAxis stroke="#ec4899" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899' }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-3 mt-2 w-full px-4 pb-2">
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> PDF</Button>
            <Button className="w-1/2 text-base" variant="outline"><Download className="w-5 h-5 mr-2" /> Excel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
