import React from "react";

import { useLanguage } from "@/hooks/use-language";
import { AlertTriangle, BarChart3, CreditCard, Mail, MessageSquare, Star, Store, TrendingUp, Users, CheckCircle } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Lottie from 'react-lottie-player';
import lottieJson from '../../../attached_assets/lexP6tSSOZ.json';

export default function Dashboard() {
  const { t, language } = useLanguage();

  // بيانات وهمية
  const stats = {
    totalStores: 120,
    activeSubscriptions: 80,
    expiredSubscriptions: 40,
    replyRate: "92%",
    customerRating: 4.7,
    totalMessages: 3200,
    totalSent: 1800,
    totalReceived: 1400,
    alerts: [
      { type: "warning", message: t("alert_subscription_expired") },
      { type: "danger", message: t("alert_low_activity") },
      { type: "info", message: t("alert_new_report") }
    ]
  };

  // بيانات وهمية للشارت
  const activityData = [
    { name: 'يناير', activity: 100 },
    { name: 'فبراير', activity: 120 },
    { name: 'مارس', activity: 110 },
    { name: 'أبريل', activity: 130 },
    { name: 'مايو', activity: 140 },
    { name: 'يونيو', activity: 150 },
    { name: 'يوليو', activity: 160 },
    { name: 'أغسطس', activity: 170 },
    { name: 'سبتمبر', activity: 180 },
    { name: 'أكتوبر', activity: 190 },
    { name: 'نوفمبر', activity: 200 },
    { name: 'ديسمبر', activity: 210 },
  ];

  return (
    <>
      <div className="space-y-8 max-w-7xl mx-auto py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">مرحباً بك في لوحة التحكم</h1>
          <p className="text-xl text-muted-foreground">نظرة عامة على أداء أعمالك</p>
          
        </div>

        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl border-0 liquid-hover">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A259FF] to-[#FF66C4] rounded-xl flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A259FF] to-[#FF66C4] rounded-xl opacity-20 blur-sm"></div>
                <Store className="w-6 h-6 relative z-10" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stats.totalStores}</span>
              <span className="text-lg text-muted-foreground">{t("total_stores")}</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border-0 liquid-hover">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF66FF] to-[#FFD166] rounded-xl flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF66FF] to-[#FFD166] rounded-xl opacity-20 blur-sm"></div>
                <CreditCard className="w-6 h-6 relative z-10" />
              </div>
              <span className="text-2xl font-bold text-foreground">{stats.activeSubscriptions} / {stats.expiredSubscriptions}</span>
              <span className="text-lg text-muted-foreground">{t("subscriptions_active_expired")}</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border-0 liquid-hover">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD166] to-[#A259FF] rounded-xl flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD166] to-[#A259FF] rounded-xl opacity-20 blur-sm"></div>
                <Mail className="w-6 h-6 relative z-10" />
              </div>
              <span className="text-2xl font-bold text-foreground">{stats.replyRate}</span>
              <span className="text-lg text-muted-foreground">{t("reply_rate")}</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border-0 liquid-hover">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A259FF] to-[#FFD166] rounded-xl flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A259FF] to-[#FFD166] rounded-xl opacity-20 blur-sm"></div>
                <Star className="w-6 h-6 relative z-10" />
              </div>
              <span className="text-2xl font-bold text-foreground">{stats.customerRating}</span>
              <span className="text-lg text-muted-foreground">{t("customer_rating")}</span>
            </div>
          </div>
        </div>

        {/* Messages KPIs and Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl border-0">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF66FF] to-[#A259FF] rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <span className="text-4xl font-bold text-foreground mb-2">{stats.totalMessages}</span>
                              <span className="text-xl text-muted-foreground mb-4">{t("total_messages_sent_received")}</span>
              <div className="flex gap-8 mt-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-foreground">{stats.totalSent}</span>
                                      <p className="text-sm text-muted-foreground">{t("sent")}</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-foreground">{stats.totalReceived}</span>
                                      <p className="text-sm text-muted-foreground">{t("received")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-3xl border-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A259FF] to-[#FF66C4] rounded-xl flex items-center justify-center mr-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xl font-semibold text-foreground">{t("platform_activity_chart")}</span>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.3)" />
                    <XAxis dataKey="name" stroke="#a088c9" />
                    <YAxis stroke="#a088c9" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="url(#gradient)" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#A259FF' }} 
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A259FF" />
                        <stop offset="50%" stopColor="#FF66C4" />
                        <stop offset="100%" stopColor="#FFD166" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="glass-card p-8 rounded-3xl border-0">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD166] to-[#FF66C4] rounded-xl flex items-center justify-center mr-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{t("important_alerts")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.alerts.map((alert, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    alert.type === "warning" ? "bg-yellow-500" : 
                    alert.type === "danger" ? "bg-red-500" : 
                    "bg-blue-500"
                  }`}></div>
                  <span className="text-sm font-medium text-muted-foreground capitalize">{alert.type}</span>
                </div>
                <p className="text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lottie animation bottom right */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 40,
        width: 'min(38vw, 320px)',
        height: 'min(38vw, 320px)',
        pointerEvents: 'none',
        opacity: 0.92,
      }}>
        <Lottie
          loop
          play
          animationData={lottieJson}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* SVG Filter for Glass Distortion */}
      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="mapped"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}
