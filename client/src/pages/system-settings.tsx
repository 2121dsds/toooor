
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Database, Mail, Shield, Bell, Globe } from "lucide-react";

export default function SystemSettings() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    siteName: "منصة إدارة المتاجر",
    adminEmail: "admin@example.com",
    enableNotifications: true,
    enableBackups: true,
    maxStores: 1000,
    defaultLanguage: "ar",
    maintenanceMode: false,
    autoBackupInterval: "daily"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-8 h-8 text-gray-600" />
          {t("system_settings")}
        </h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          {t("save")}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="backup">النسخ الاحتياطي</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="glass-card border-0 bg-white/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                الإعدادات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">اسم الموقع</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">البريد الإلكتروني للإدارة</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxStores">الحد الأقصى للمتاجر</Label>
                <Input
                  id="maxStores"
                  type="number"
                  value={settings.maxStores}
                  onChange={(e) => handleSettingChange("maxStores", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">اللغة الافتراضية</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleSettingChange("defaultLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass-card border-0 bg-white/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>كلمة المرور الافتراضية للمدراء الجدد</Label>
                <Input type="password" placeholder="********" />
              </div>

              <div className="space-y-2">
                <Label>مدة انتهاء الجلسة (بالدقائق)</Label>
                <Input type="number" placeholder="60" />
              </div>

              <div className="flex items-center justify-between">
                <Label>تفعيل المصادقة الثنائية</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label>تسجيل محاولات تسجيل الدخول</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="glass-card border-0 bg-white/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>تفعيل الإشعارات</Label>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>إشعارات البريد الإلكتروني</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label>إشعارات التذاكر الجديدة</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label>إشعارات انتهاء الاشتراكات</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="glass-card border-0 bg-white/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                النسخ الاحتياطي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>تفعيل النسخ الاحتياطي التلقائي</Label>
                <Switch
                  checked={settings.enableBackups}
                  onCheckedChange={(checked) => handleSettingChange("enableBackups", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>فترة النسخ الاحتياطي</Label>
                <Select
                  value={settings.autoBackupInterval}
                  onValueChange={(value) => handleSettingChange("autoBackupInterval", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">كل ساعة</SelectItem>
                    <SelectItem value="daily">يومياً</SelectItem>
                    <SelectItem value="weekly">أسبوعياً</SelectItem>
                    <SelectItem value="monthly">شهرياً</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  إنشاء نسخة احتياطية الآن
                </Button>
                <Button variant="outline" className="flex-1">
                  استعادة من نسخة احتياطية
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
