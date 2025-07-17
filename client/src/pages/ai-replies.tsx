import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import Lottie from 'react-lottie-player';
import brainLottie from '../../../attached_assets/brain.json';

export default function AiReplies() {
  const [newReply, setNewReply] = useState("");
  const [selectedTone, setSelectedTone] = useState("formal");
  const defaultReplies = [
    {
      id: 1,
      reply: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
      tone: "friendly",
      confidence: 0.98,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      usage: 42,
      rating: 4.7,
      success: 92
    },
    {
      id: 2,
      reply: "تم استلام طلبك وسيتم التواصل معك قريبًا.",
      tone: "formal",
      confidence: 0.93,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      usage: 31,
      rating: 4.2,
      success: 88
    },
    {
      id: 3,
      reply: "يرجى تزويدنا بمزيد من التفاصيل لنتمكن من خدمتك بشكل أفضل.",
      tone: "direct",
      confidence: 0.89,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      usage: 19,
      rating: 3.9,
      success: 75
    },
    {
      id: 4,
      reply: "شكراً لتواصلك معنا! إذا كان لديك أي استفسار آخر لا تتردد.",
      tone: "friendly",
      confidence: 0.95,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
      usage: 55,
      rating: 4.8,
      success: 97
    }
  ];

  const [aiRepliesState, setAiRepliesState] = useState<any[]>(defaultReplies);
  const [editDialog, setEditDialog] = useState<{open: boolean, reply?: any}>({open: false});
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, reply?: any}>({open: false});
  const [improveDialog, setImproveDialog] = useState<{open: boolean, reply?: any}>({open: false});
  const { data: aiReplies, isLoading } = useQuery({
    queryKey: ["/api/ai-replies"],
  });

  const { t, language } = useLanguage();

  useEffect(() => {
    if (Array.isArray(aiReplies) && aiReplies.length > 0) setAiRepliesState(aiReplies);
  }, [aiReplies]);

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'formal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'friendly':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'direct':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-foreground dark:bg-gray-900 dark:text-muted-foreground';
    }
  };

  // بيانات وهمية للأداء
  const getPerformance = (reply: any) => ({
    usage: reply.usage ?? Math.floor(Math.random() * 100 + 10),
    rating: reply.rating ?? (Math.random() * 2 + 3).toFixed(1),
    success: reply.success ?? Math.round(Math.random() * 30 + 65),
  });

  // تعديل رد
  const handleEdit = (reply: any) => setEditDialog({open: true, reply});
  const handleEditSave = () => {
    setAiRepliesState(prev => prev.map(r => r.id === editDialog.reply.id ? {...editDialog.reply} : r));
    setEditDialog({open: false});
  };
  // حذف رد
  const handleDelete = (reply: any) => setDeleteDialog({open: true, reply});
  const handleDeleteConfirm = () => {
    setAiRepliesState(prev => prev.filter(r => r.id !== deleteDialog.reply.id));
    setDeleteDialog({open: false});
  };
  // تحسين رد
  const handleImprove = (reply: any) => setImproveDialog({open: true, reply: {...reply, improved: reply.reply}});
  const handleImproveSave = () => {
    setAiRepliesState(prev => prev.map(r => r.id === improveDialog.reply.id ? {...r, reply: improveDialog.reply.improved} : r));
    setImproveDialog({open: false});
  };
  // إضافة رد جديد
  const handleAddNew = () => {
    if (!newReply.trim()) return;
    setAiRepliesState(prev => [
      ...prev,
      { id: Date.now(), reply: newReply, tone: selectedTone, confidence: Math.random(), createdAt: new Date(), usage: 0, rating: 0, success: 0 }
    ]);
    setNewReply("");
  };

  // حساب أكثر 5 ردود استخدامًا
  const top5 = [...aiRepliesState]
    .sort((a, b) => (b.usage ?? 0) - (a.usage ?? 0))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border-0">
          <div className="mb-6">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl border-0">
          <div className="mb-6">
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
    <div style={{
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
    }}>
      <div style={{ width: 'min(40vw, 400px)', height: 'min(40vw, 400px)', marginLeft: '4vw' }}>
        <Lottie
          loop
          play
          animationData={brainLottie}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* AI Replies Management */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in w-full lg:flex-[4]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">{t("ai_reply_management")}</h2>
          </div>
          <div className="space-y-4">
            <div className="w-full max-w-full overflow-x-auto max-h-96 overflow-y-auto">
              <table className="min-w-[900px] w-full text-sm rounded-xl glass-card table-fixed">
                <colgroup>
                  <col style={{ width: '28%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-foreground font-medium">{t("reply")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("tone")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("confidence")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("usage")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("rating")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("success")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("created")}</th>
                    <th className="text-left py-3 text-foreground font-medium">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {aiRepliesState.map((reply) => {
                    const performance = getPerformance(reply);
                    return (
                      <tr key={reply.id} className="hover:bg-purple-100/50 transition-all duration-300">
                        <td className="py-4">
                          <div className="max-w-xs truncate text-foreground">
                            {reply.reply}
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge className={`${getToneColor(reply.tone)} border-0`}>
                            {t(reply.tone)}
                          </Badge>
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {(reply.confidence * 100).toFixed(0)}%
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {performance.usage}
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {performance.rating}
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {performance.success}%
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {reply.createdAt.toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(reply)}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                            >
                              <ThumbsUp className="w-4 h-4 text-gray-700" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleImprove(reply)}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(reply)}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add New Reply Panel */}
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in w-full lg:flex-[2]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{t("add_new_reply")}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">{t("reply_text")}</Label>
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder={t("enter_reply_text")}
                className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                rows={4}
              />
            </div>
            <div>
              <Label className="text-gray-700">{t("tone")}</Label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">{t("formal")}</SelectItem>
                  <SelectItem value="friendly">{t("friendly")}</SelectItem>
                  <SelectItem value="direct">{t("direct")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleAddNew}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("add_reply")}
            </Button>
          </div>

          {/* Top 5 Replies */}
          <div className="mt-8">
            <h4 className="text-md font-semibold text-gray-800 mb-4">{t("top_5_replies")}</h4>
            <div className="space-y-3">
              {top5.map((reply, index) => (
                <div key={reply.id} className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">#{index + 1}</span>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                      {reply.usage} {t("uses")}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{reply.reply}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({open})}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">{t("edit_reply")}</DialogTitle>
          </DialogHeader>
          {editDialog.reply && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">{t("reply_text")}</Label>
                <Textarea
                  value={editDialog.reply.reply}
                  onChange={(e) => setEditDialog({...editDialog, reply: {...editDialog.reply, reply: e.target.value}})}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-gray-700">{t("tone")}</Label>
                <Select value={editDialog.reply.tone} onValueChange={(value) => setEditDialog({...editDialog, reply: {...editDialog.reply, tone: value}})}>
                  <SelectTrigger className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">{t("formal")}</SelectItem>
                    <SelectItem value="friendly">{t("friendly")}</SelectItem>
                    <SelectItem value="direct">{t("direct")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialog({open: false})}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleEditSave} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({open})}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">{t("delete_reply")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              {t("confirm_delete_reply")}
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteDialog({open: false})}>
                {t("cancel")}
              </Button>
              <Button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white">
                {t("delete")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Improve Dialog */}
      <Dialog open={improveDialog.open} onOpenChange={(open) => setImproveDialog({open})}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">{t("improve_reply")}</DialogTitle>
          </DialogHeader>
          {improveDialog.reply && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">{t("original_reply")}</Label>
                <div className="p-3 rounded-lg bg-gray-100/50 text-gray-600 text-sm">
                  {improveDialog.reply.reply}
                </div>
              </div>
              <div>
                <Label className="text-gray-700">{t("improved_reply")}</Label>
                <Textarea
                  value={improveDialog.reply.improved}
                  onChange={(e) => setImproveDialog({...improveDialog, reply: {...improveDialog.reply, improved: e.target.value}})}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setImproveDialog({open: false})}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleImproveSave} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {t("save_improvement")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
