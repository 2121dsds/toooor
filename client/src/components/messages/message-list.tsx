import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message } from "@shared/schema";
import { MessageSquare, Instagram, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";

interface MessageListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
  selectedMessage?: Message;
}

export function MessageList({ messages, onSelectMessage, selectedMessage }: MessageListProps) {
  const { t, language } = useLanguage();

  // State للفلترة والترتيب
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [timeSort, setTimeSort] = useState<'asc' | 'desc'>('desc');
  // State جديد للتحكم في فتح/إغلاق القوائم المنسدلة
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // استخراج كل المنصات وأنواع الرسائل الموجودة
  const allPlatforms = Array.from(new Set(messages.map(m => m.platform.toLowerCase())));
  const allStatuses = Array.from(new Set(messages.map(m => m.messageType)));

  // تطبيق الفلترة والترتيب
  let filteredMessages = messages;
  if (platformFilter) filteredMessages = filteredMessages.filter(m => m.platform.toLowerCase() === platformFilter);
  if (statusFilter) filteredMessages = filteredMessages.filter(m => m.messageType === statusFilter);
  filteredMessages = filteredMessages.slice().sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return timeSort === 'asc' ? aTime - bTime : bTime - aTime;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <SiWhatsapp className="w-5 h-5 text-green-500" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-purple-500" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return 'bg-green-500';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'facebook':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // دالة تعطي لون glow حسب المنصة
  function getGlowColor(platform: string, alpha = 1) {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return alpha === 1 ? '#22c55e' : 'rgba(34,197,94,0.18)'; // أخضر
      case 'instagram':
        return alpha === 1 ? '#a21caf' : 'rgba(162,28,175,0.18)'; // بنفسجي
      case 'facebook':
        return alpha === 1 ? '#2563eb' : 'rgba(37,99,235,0.18)'; // أزرق
      default:
        return alpha === 1 ? '#64748b' : 'rgba(100,116,139,0.18)'; // رمادي
    }
  }

  // دالة لخلفية شفافة متناسقة مع لون المنصة
  function getGlowBg(platform: string) {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return 'rgba(34,197,94,0.10)';
      case 'instagram':
        return 'rgba(162,28,175,0.10)';
      case 'facebook':
        return 'rgba(37,99,235,0.10)';
      default:
        return 'rgba(100,116,139,0.10)';
    }
  }

  return (
    <div className="glass-card border-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">{t("messages")}</h2>
          <div className="flex space-x-2">
            {/* زرار Platform مع قائمة منسدلة */}
            <div className="relative">
              <Button
                variant={platformFilter ? "default" : "ghost"}
                size="sm"
                className={`glass-card rounded-lg text-sm transition-colors duration-200
                  ${platformFilter === 'facebook' ? 'bg-blue-500/70 text-white shadow-lg shadow-blue-200/30 border-blue-400/60 dark:bg-blue-700/70 dark:text-white dark:shadow-lg dark:shadow-blue-900/40 dark:border-blue-600/60' : ''}
                  ${platformFilter === 'instagram' ? 'bg-gradient-to-br from-purple-500/80 to-pink-500/70 text-white shadow-lg shadow-purple-200/30 border-purple-400/60 dark:bg-gradient-to-br dark:from-purple-800/80 dark:to-pink-800/70 dark:text-white dark:shadow-lg dark:shadow-purple-900/40 dark:border-purple-700/60' : ''}
                  ${platformFilter === 'whatsapp' ? 'bg-green-500/70 text-white shadow-lg shadow-green-200/30 border-green-400/60 dark:bg-green-700/70 dark:text-white dark:shadow-lg dark:shadow-green-900/40 dark:border-green-600/60' : ''}
                  ${platformFilter && !['facebook','instagram','whatsapp'].includes(platformFilter) ? 'bg-primary text-white dark:bg-primary dark:text-white' : ''}
                `}
                onClick={() => setIsPlatformDropdownOpen((open) => !open)}
                onContextMenu={e => { e.preventDefault(); setPlatformFilter(null); setIsPlatformDropdownOpen(false); }}
              >
                {platformFilter ? (language === 'ar' ? t(platformFilter) : platformFilter.charAt(0).toUpperCase() + platformFilter.slice(1)) : (language === 'ar' ? 'المنصة' : t("platform"))}
              </Button>
              {isPlatformDropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 min-w-[120px]">
                  {allPlatforms.map(p => (
                    <div
                      key={p}
                      className={`px-4 py-2 cursor-pointer hover:bg-primary/10 ${platformFilter === p ? 'font-bold text-primary' : ''}`}
                      onClick={() => { setPlatformFilter(p); setIsPlatformDropdownOpen(false); }}
                    >
                      {language === 'ar' ? t(p) : p.charAt(0).toUpperCase() + p.slice(1)}
                    </div>
                  ))}
                  <div className="px-4 py-2 cursor-pointer text-muted-foreground hover:bg-red-100 dark:hover:bg-red-900/20" onClick={() => { setPlatformFilter(null); setIsPlatformDropdownOpen(false); }}>
                    {t("all")}
                  </div>
                </div>
              )}
            </div>
            {/* زرار Time */}
            <Button
              variant={timeSort === 'asc' ? "default" : "ghost"}
              size="sm"
              className={`glass-card rounded-lg text-sm ${timeSort === 'asc' ? 'bg-primary text-white' : ''}`}
              onClick={() => setTimeSort(timeSort === 'asc' ? 'desc' : 'asc')}
            >
              {language === 'ar' ? 'الوقت' : t("time")} {timeSort === 'asc' ? '↑' : '↓'}
            </Button>
            {/* زرار Status مع قائمة منسدلة */}
            <div className="relative">
              <Button
                variant={statusFilter ? "default" : "ghost"}
                size="sm"
                className={`glass-card rounded-lg text-sm ${statusFilter ? 'bg-primary text-white' : ''}`}
                onClick={() => setIsStatusDropdownOpen((open) => !open)}
                onContextMenu={e => { e.preventDefault(); setStatusFilter(null); setIsStatusDropdownOpen(false); }}
              >
                {statusFilter ? (language === 'ar' ? t(statusFilter) : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)) : (language === 'ar' ? 'الحالة' : t("status"))}
              </Button>
              {isStatusDropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 min-w-[120px]">
                  {allStatuses.map(s => (
                    <div
                      key={s}
                      className={`px-4 py-2 cursor-pointer hover:bg-primary/10 ${statusFilter === s ? 'font-bold text-primary' : ''}`}
                      onClick={() => { setStatusFilter(s); setIsStatusDropdownOpen(false); }}
                    >
                      {language === 'ar' ? t(s) : s.charAt(0).toUpperCase() + s.slice(1)}
                    </div>
                  ))}
                  <div className="px-4 py-2 cursor-pointer text-muted-foreground hover:bg-red-100 dark:hover:bg-red-900/20" onClick={() => { setStatusFilter(null); setIsStatusDropdownOpen(false); }}>
                    {t("all")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            selectedMessage?.id === message.id ? (
              <div key={message.id} className="relative z-40">
                <div
                  onClick={() => onSelectMessage(message)}
                  className="flex items-center space-x-3 p-2 glass-card rounded-full cursor-pointer scale-[1.01]"
                  style={{
                    border: `3px solid ${getGlowColor(message.platform)}`,
                    boxShadow: `0 0 16px 4px ${getGlowColor(message.platform)}, 0 0 0 6px ${getGlowColor(message.platform, 0.18)}`,
                    background: `${getGlowBg(message.platform)}`
                  }}
                >
                  <div className={`w-10 h-10 ${getPlatformColor(message.platform)} rounded-full flex items-center justify-center`}>
                    {getPlatformIcon(message.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-foreground font-medium truncate">{message.senderName}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{
                      (() => {
                        const userMessages = messages.filter(m => (m.senderId === message.senderId || m.senderName === message.senderName));
                        if (userMessages.length > 0) {
                          const last = userMessages.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b);
                          return last.content;
                        }
                        return message.content;
                      })()
                    }</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {language === 'ar'
                          ? message.messageType === 'promotional' ? 'ترويجي' : message.messageType === 'spam' ? 'بريد مزعج' : message.messageType === 'other' ? 'أخرى' : t(message.messageType)
                          : t(message.messageType)}
                      </Badge>
                      {message.isAiReply && (
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          {t("ai_reply")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={message.id}
                onClick={() => onSelectMessage(message)}
                className={`flex items-center space-x-3 p-3 glass-card rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/10`}
              >
                <div className={`w-10 h-10 ${getPlatformColor(message.platform)} rounded-full flex items-center justify-center`}>
                  {getPlatformIcon(message.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-foreground font-medium truncate">{message.senderName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{
                    (() => {
                      const userMessages = messages.filter(m => (m.senderId === message.senderId || m.senderName === message.senderName));
                      if (userMessages.length > 0) {
                        const last = userMessages.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b);
                        return last.content;
                      }
                      return message.content;
                    })()
                  }</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {language === 'ar'
                        ? message.messageType === 'promotional' ? 'ترويجي' : message.messageType === 'spam' ? 'بريد مزعج' : message.messageType === 'other' ? 'أخرى' : t(message.messageType)
                        : t(message.messageType)}
                    </Badge>
                    {message.isAiReply && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        {t("ai_reply")}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

<style>{`
.selected-glow {
  border: 3px solid #2563eb !important;
  background: rgba(37, 99, 235, 0.10) !important;
  box-shadow: 0 0 16px 4px #3b82f6, 0 0 0 6px rgba(59,130,246,0.18);
  z-index: 30;
}
`}</style>
