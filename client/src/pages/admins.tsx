import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCog, 
  Plus, 
  Search, 
  Shield, 
  Key, 
  Settings,
  Eye,
  Edit,
  Ban,
  Crown,
  Users,
  Activity
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Admins() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  // تأكد من أن newAdmin.permissions هو string[]
  const [newAdmin, setNewAdmin] = useState<{
    username: string;
    email: string;
    role: string;
    permissions: string[];
  }>({
    username: "",
    email: "",
    role: "admin",
    permissions: []
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  const permissions = [
    { id: "user_management", name: "User Management", description: "Create, edit, and delete users" },
    { id: "store_management", name: "Store Management", description: "Manage store accounts and subscriptions" },
    { id: "analytics", name: "Analytics Access", description: "View system analytics and reports" },
    { id: "settings", name: "System Settings", description: "Modify system configuration" },
    { id: "billing", name: "Billing Management", description: "Handle payments and subscriptions" },
    { id: "support", name: "Support Access", description: "Access support tickets and customer data" }
  ];

  // بيانات وهمية في حال عدم وجود بيانات من الـ API
  const mockAdmins = [
    {
      id: 1,
      username: "admin1",
      email: "admin1@email.com",
      role: "super_admin",
      permissions: ["user_management", "store_management", "analytics", "settings"]
    },
    {
      id: 2,
      username: "admin2",
      email: "admin2@email.com",
      role: "admin",
      permissions: ["user_management", "support"]
    }
  ];
  // users قد تكون undefined أو object فارغ، لذلك نتحقق من النوع
  const adminUsers: any[] = Array.isArray(users)
    ? users.filter((user: any) => user.role === "admin" || user.role === "super_admin")
    : mockAdmins;

  const filteredAdmins = adminUsers.filter((admin: any) => {
    const matchesSearch = admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || admin.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'admin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="w-4 h-4" />;
      case 'admin':
        return <Shield className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  // أدوار جديدة
  const roles = [
    { value: "read_only", label: t("read_only") },
    { value: "store_manager", label: t("store_manager") },
    { value: "data_analyst", label: t("data_analyst") },
    { value: "support_agent", label: t("support_agent") },
    { value: "admin", label: t("admin") },
    { value: "super_admin", label: t("super_admin") }
  ];

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState<any>(null);
  // إضافة state لعرض تفاصيل المسؤول
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewAdmin, setViewAdmin] = useState<any>(null);
  // إضافة state لعرض Dialog تغيير الصلاحيات
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [permissionAdmin, setPermissionAdmin] = useState<any>(null);
  // إضافة state لعرض Dialog الحظر
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [banAdmin, setBanAdmin] = useState<any>(null);
  // قائمة المسؤولين القابلة للتعديل
  const [adminState, setAdminState] = useState(adminUsers);

  // إضافة مسؤول جديد
  const handleAddAdmin = () => {
    setIsAddingAdmin(false);
    setNewAdmin({ username: "", email: "", role: "read_only", permissions: [] });
  };

  // تعديل مسؤول
  const handleEditAdmin = () => {
    setAdminState(adminState.map((a) => a.id === editAdmin.id ? editAdmin : a));
    setIsEditDialogOpen(false);
    setEditAdmin(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-3xl border-0">
          <div className="mb-6">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
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
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{t("admin_management")}</h2>
              <p className="text-muted-foreground">{t("manage_admins_desc")}</p>
            </div>
          </div>
          <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                {t("add_admin")}
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-0 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground">{t("add_new_admin")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground">{t("username")}</Label>
                    <Input
                      value={newAdmin.username}
                      onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                      className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground">{t("email")}</Label>
                    <Input
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">{t("role")}</Label>
                  <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                    <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">{t("permissions")}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {permissions.map((permission) => (
                      <label key={permission.id} className="flex items-center space-x-2 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                        <input
                          type="checkbox"
                          checked={newAdmin.permissions.includes(permission.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAdmin({
                                ...newAdmin,
                                permissions: [...newAdmin.permissions, permission.id]
                              });
                            } else {
                              setNewAdmin({
                                ...newAdmin,
                                permissions: newAdmin.permissions.filter(p => p !== permission.id)
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">{permission.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingAdmin(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={handleAddAdmin} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    {t("add")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-3xl border-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t("search_admins")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-0 bg-white/60 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_roles")}</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Admins List */}
      <div className="glass-card p-6 rounded-3xl border-0">
        <div className="space-y-4">
          {filteredAdmins.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between p-4 rounded-2xl glass-card border-0 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {admin.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{admin.username}</h3>
                  <p className="text-muted-foreground">{admin.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleIcon(admin.role)}
                    <Badge className={getRoleColor(admin.role)}>
                      {t(admin.role)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setViewAdmin(admin);
                    setIsViewDialogOpen(true);
                  }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditAdmin(admin);
                    setIsEditDialogOpen(true);
                  }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setPermissionAdmin(admin);
                    setIsPermissionDialogOpen(true);
                  }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <Key className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBanAdmin(admin);
                    setIsBanDialogOpen(true);
                  }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <Ban className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Admin Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("admin_details")}</DialogTitle>
          </DialogHeader>
          {viewAdmin && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                    {viewAdmin.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{viewAdmin.username}</h3>
                  <p className="text-muted-foreground">{viewAdmin.email}</p>
                  <Badge className={getRoleColor(viewAdmin.role)}>
                    {t(viewAdmin.role)}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t("permissions")}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {viewAdmin.permissions.map((permission: string) => (
                    <div key={permission} className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <span className="text-sm text-muted-foreground">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("edit_admin")}</DialogTitle>
          </DialogHeader>
          {editAdmin && (
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">{t("username")}</Label>
                <Input
                  value={editAdmin.username}
                  onChange={(e) => setEditAdmin({ ...editAdmin, username: e.target.value })}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <Label className="text-foreground">{t("email")}</Label>
                <Input
                  value={editAdmin.email}
                  onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <Label className="text-foreground">{t("role")}</Label>
                <Select value={editAdmin.role} onValueChange={(value) => setEditAdmin({ ...editAdmin, role: value })}>
                  <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleEditAdmin} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("manage_permissions")}</DialogTitle>
          </DialogHeader>
          {permissionAdmin && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                    <input
                      type="checkbox"
                      checked={permissionAdmin.permissions.includes(permission.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissionAdmin({
                            ...permissionAdmin,
                            permissions: [...permissionAdmin.permissions, permission.id]
                          });
                        } else {
                          setPermissionAdmin({
                            ...permissionAdmin,
                            permissions: permissionAdmin.permissions.filter((p: string) => p !== permission.id)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-muted-foreground">{permission.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ban Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("ban_admin")}</DialogTitle>
          </DialogHeader>
          {banAdmin && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("confirm_ban_admin")} <strong>{banAdmin.username}</strong>?
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  {t("ban")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
