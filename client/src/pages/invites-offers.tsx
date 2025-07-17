import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/hooks/use-language";
import { Plus, Gift, BarChart2, UserPlus, Trash, Edit, Save } from "lucide-react";

export default function InvitesOffers() {
  const { t, language } = useLanguage();
  // بيانات وهمية للدعوات
  const [invites, setInvites] = useState([
    { id: 1, email: "user1@email.com", invitedBy: "admin1", status: "pending", sentAt: "2024-06-01" },
    { id: 2, email: "user2@email.com", invitedBy: "admin2", status: "accepted", sentAt: "2024-05-28" },
    { id: 3, email: "user3@email.com", invitedBy: "admin1", status: "expired", sentAt: "2024-05-20" },
  ]);
  // بيانات وهمية لأكواد الخصم
  const [codes, setCodes] = useState([
    { id: 1, code: "INVITE2024", type: "دعوة", value: "مجاني", used: 3, expiresAt: "2024-07-01" },
    { id: 2, code: "DISCOUNT20", type: "خصم", value: "20%", used: 12, expiresAt: "2024-08-01" },
    { id: 3, code: "SUMMER50", type: "خصم", value: "50%", used: 5, expiresAt: "2024-09-01" },
  ]);
  // بيانات وهمية للتقارير
  const [reports] = useState([
    { id: 1, name: language === 'ar' ? "تقرير استخدام الدعوات" : "Invite Usage Report", count: 15, date: "2024-06-01" },
    { id: 2, name: language === 'ar' ? "تقرير أكواد الخصم" : "Discount Codes Report", count: 20, date: "2024-06-01" },
  ]);
  // إضافة دعوة جديدة
  const [newInvite, setNewInvite] = useState("");
  const handleAddInvite = () => {
    if (!newInvite.trim()) return;
    setInvites([...invites, { id: Date.now(), email: newInvite, invitedBy: "admin1", status: "pending", sentAt: new Date().toISOString().slice(0, 10) }]);
    setNewInvite("");
  };
  // إضافة كود خصم جديد
  const [newCode, setNewCode] = useState({ code: "", type: "خصم", value: "", expiresAt: "" });
  const handleAddCode = () => {
    if (!newCode.code.trim() || !newCode.value.trim()) return;
    setCodes([...codes, { id: Date.now(), ...newCode, used: 0 }]);
    setNewCode({ code: "", type: "خصم", value: "", expiresAt: "" });
  };
  // حذف دعوة
  const handleDeleteInvite = (id: number) => setInvites(invites.filter(i => i.id !== id));
  // حذف كود خصم
  const handleDeleteCode = (id: number) => setCodes(codes.filter(c => c.id !== id));

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{language === 'ar' ? "الدعوات والعروض" : "Invites & Offers"}</h1>
        <p className="text-lg text-muted-foreground mb-2">{language === 'ar' ? "إدارة الدعوات وأكواد الخصم والتقارير التسويقية" : "Manage user invites, discount codes, and marketing reports"}</p>
      </div>
      <Tabs defaultValue="invites" className="space-y-4">
        <TabsList className="glass-card border-0 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="invites">{language === 'ar' ? "الدعوات" : "Invites"}</TabsTrigger>
          <TabsTrigger value="codes">{language === 'ar' ? "أكواد الخصم" : "Discount Codes"}</TabsTrigger>
          <TabsTrigger value="reports">{language === 'ar' ? "تقارير" : "Reports"}</TabsTrigger>
        </TabsList>
        {/* Tab: Invites */}
        <TabsContent value="invites" className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
            <div className="flex items-center mb-4 gap-2">
              <UserPlus className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-foreground">{language === 'ar' ? "تتبع دعوات المستخدمين" : "User Invite Tracking"}</h3>
            </div>
            <div className="flex gap-2 mb-4">
              <Input value={newInvite} onChange={e => setNewInvite(e.target.value)} placeholder={language === 'ar' ? "أدخل بريد المستخدم..." : "Enter user email..."} />
              <Button onClick={handleAddInvite} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"><Plus className="w-4 h-4 mr-1" />{language === 'ar' ? "إرسال دعوة" : "Send Invite"}</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead>{language === 'ar' ? "الداعي" : "Invited By"}</TableHead>
                  <TableHead>{language === 'ar' ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{language === 'ar' ? "تاريخ الإرسال" : "Sent At"}</TableHead>
                  <TableHead>{language === 'ar' ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map(invite => (
                  <TableRow key={invite.id}>
                    <TableCell>{invite.email}</TableCell>
                    <TableCell>{invite.invitedBy}</TableCell>
                    <TableCell>{language === 'ar' ? (invite.status === 'pending' ? 'قيد الانتظار' : invite.status === 'accepted' ? 'تم القبول' : 'منتهية') : invite.status}</TableCell>
                    <TableCell>{invite.sentAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteInvite(invite.id)} className="hover:bg-red-100"><Trash className="w-4 h-4 text-red-500" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        {/* Tab: Discount Codes */}
        <TabsContent value="codes" className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
            <div className="flex items-center mb-4 gap-2">
              <Gift className="w-6 h-6 text-pink-500" />
              <h3 className="text-xl font-semibold text-foreground">{language === 'ar' ? "إدارة أكواد الخصم" : "Discount Code Management"}</h3>
            </div>
            <div className="flex gap-2 mb-4">
              <Input value={newCode.code} onChange={e => setNewCode({ ...newCode, code: e.target.value })} placeholder={language === 'ar' ? "الكود..." : "Code..."} className="w-32" />
              <Input value={newCode.value} onChange={e => setNewCode({ ...newCode, value: e.target.value })} placeholder={language === 'ar' ? "القيمة..." : "Value..."} className="w-24" />
              <Input value={newCode.expiresAt} onChange={e => setNewCode({ ...newCode, expiresAt: e.target.value })} placeholder={language === 'ar' ? "تاريخ الانتهاء..." : "Expires At..."} className="w-32" type="date" />
              <Button onClick={handleAddCode} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"><Plus className="w-4 h-4 mr-1" />{language === 'ar' ? "إضافة كود" : "Add Code"}</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? "الكود" : "Code"}</TableHead>
                  <TableHead>{language === 'ar' ? "النوع" : "Type"}</TableHead>
                  <TableHead>{language === 'ar' ? "القيمة" : "Value"}</TableHead>
                  <TableHead>{language === 'ar' ? "الاستخدامات" : "Used"}</TableHead>
                  <TableHead>{language === 'ar' ? "تاريخ الانتهاء" : "Expires At"}</TableHead>
                  <TableHead>{language === 'ar' ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map(code => (
                  <TableRow key={code.id}>
                    <TableCell>{code.code}</TableCell>
                    <TableCell>{code.type}</TableCell>
                    <TableCell>{code.value}</TableCell>
                    <TableCell>{code.used}</TableCell>
                    <TableCell>{code.expiresAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCode(code.id)} className="hover:bg-red-100"><Trash className="w-4 h-4 text-red-500" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        {/* Tab: Reports */}
        <TabsContent value="reports" className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
            <div className="flex items-center mb-4 gap-2">
              <BarChart2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-foreground">{language === 'ar' ? "تقارير تسويقية" : "Marketing Reports"}</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? "اسم التقرير" : "Report Name"}</TableHead>
                  <TableHead>{language === 'ar' ? "عدد الاستخدامات" : "Usage Count"}</TableHead>
                  <TableHead>{language === 'ar' ? "التاريخ" : "Date"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.count}</TableCell>
                    <TableCell>{report.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 