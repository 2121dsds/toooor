import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  BellRing, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  Mail,
  MessageSquare,
  Calendar,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true
  });
  const navigate = useNavigate();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["/api/notifications"],
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'border-l-blue-500 bg-blue-50/50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50/50';
      case 'error':
        return 'border-l-red-500 bg-red-50/50';
      case 'success':
        return 'border-l-green-500 bg-green-50/50';
      default:
        return 'border-l-gray-500 bg-gray-50/50';
    }
  };

  // Mock notifications data since we don't have sample data
  const mockNotifications = [
    {
      id: 1,
      title: "New Message Received",
      message: "You have received a new message from Store #123",
      type: "info",
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      title: "Subscription Expiring",
      message: "Store #456 subscription will expire in 3 days",
      type: "warning",
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Payment of $99 received from Store #789",
      type: "success",
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance will begin at 2:00 AM UTC",
      type: "info",
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ];

  const [notificationsList, setNotificationsList] = useState(mockNotifications);
  const [tab, setTab] = useState<'all' | 'unread' | 'read'>('all');

  const handleDelete = (id: number) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id));
  };
  const handleMarkAsRead = (id: number) => {
    setNotificationsList((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };
  const filteredNotifications = notificationsList.filter((n) =>
    tab === 'all' ? true : tab === 'unread' ? !n.isRead : n.isRead
  );
  const unreadCount = notificationsList.filter((n) => !n.isRead).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-3xl border-0">
          <div className="mb-6">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BellRing className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="glass-card border-0 bg-white/60 backdrop-blur-sm"
            onClick={() => navigate("/system-settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Tabs value={tab} onValueChange={v => setTab(v as 'all' | 'unread' | 'read')} className="space-y-4">
            <TabsList className="glass-card border-0 bg-white/60 backdrop-blur-sm">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">No notifications</div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <div 
                    key={notification.id} 
                    className={`glass-card p-4 rounded-3xl border-0 border-l-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in ${getNotificationColor(notification.type)}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 text-xs">
                                New
                              </Badge>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.createdAt.toLocaleTimeString()}
                          </span>
                          {!notification.isRead && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-xs bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0">
            <h3 className="text-lg font-semibold text-foreground mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-foreground">Email Notifications</Label>
                </div>
                <Switch 
                  checked={notificationSettings.email}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, email: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-foreground">Push Notifications</Label>
                </div>
                <Switch 
                  checked={notificationSettings.push}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, push: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-foreground">SMS Notifications</Label>
                </div>
                <Switch 
                  checked={notificationSettings.sms}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, sms: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellRing className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-foreground">In-App Notifications</Label>
                </div>
                <Switch 
                  checked={notificationSettings.inApp}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, inApp: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border-0">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                onClick={() => setNotificationsList(prev => prev.map(n => ({ ...n, isRead: true })))}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-card border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                onClick={() => setNotificationsList([])}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear all notifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
