import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { Plus, Edit, Trash2, BookOpen, Info } from "lucide-react";

export default function KnowledgeBase() {
  const { t, language } = useLanguage();
  // بيانات وهمية لقاعدة المعرفة (أسئلة متكررة/سياسات/معلومات منتجات)
  const [knowledge, setKnowledge] = useState([
    { id: 1, question: t("kb_q_return_policy"), answer: t("kb_a_return_policy") },
    { id: 2, question: t("kb_q_track_order"), answer: t("kb_a_track_order") },
    { id: 3, question: t("kb_q_international_shipping"), answer: t("kb_a_international_shipping") },
    { id: 4, question: t("kb_q_payment_methods"), answer: t("kb_a_payment_methods") },
  ]);
  const [newItem, setNewItem] = useState({ question: "", answer: "" });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // إضافة عنصر جديد
  const handleAdd = () => {
    if (!newItem.question.trim() || !newItem.answer.trim()) return;
    setKnowledge([...knowledge, { id: Date.now(), ...newItem }]);
    setNewItem({ question: "", answer: "" });
    setIsAddOpen(false);
  };
  // حذف عنصر
  const handleDelete = (id: number) => setKnowledge(knowledge.filter(k => k.id !== id));
  // حفظ تعديل
  const handleEditSave = () => {
    setKnowledge(knowledge.map(k => k.id === editItem.id ? editItem : k));
    setEditItem(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("ai_knowledge_base")}</h2>
            <p className="text-muted-foreground">
              {t("ai_knowledge_base_desc")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 mt-2 rounded-xl bg-blue-50 text-blue-800 text-sm">
          <Info className="w-5 h-5" />
          {t("ai_knowledge_base_note")}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="w-4 h-4 mr-1" />
            {t("add_knowledge")}
          </Button>
        </div>
      </div>
      {/* قائمة عناصر المعرفة */}
      <div className="space-y-4">
        {knowledge.map(item => (
          <div key={item.id} className="glass-card p-4 rounded-2xl border-0 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
            <div>
              <div className="font-bold text-lg text-foreground mb-1">{item.question}</div>
              <div className="text-muted-foreground text-base">{item.answer}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button variant="ghost" size="icon" onClick={() => setEditItem(item)}><Edit className="w-4 h-4 text-blue-500" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          </div>
        ))}
      </div>
      {/* Dialog إضافة */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("add_new_knowledge")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-foreground">{t("question_or_title")}</label>
              <Input 
                placeholder={t("enter_question_or_title")} 
                value={newItem.question} 
                onChange={e => setNewItem({ ...newItem, question: e.target.value })}
                className="glass-card border-0 bg-white/60 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="text-foreground">{t("answer_or_content")}</label>
              <Textarea 
                placeholder={t("enter_answer_or_content")} 
                value={newItem.answer} 
                onChange={e => setNewItem({ ...newItem, answer: e.target.value })}
                className="glass-card border-0 bg-white/60 backdrop-blur-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                {t("cancel")}
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                onClick={handleAdd}
              >
                {t("add")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Dialog تعديل */}
      <Dialog open={!!editItem} onOpenChange={v => !v && setEditItem(null)}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{t("edit_knowledge")}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div>
                <label className="text-foreground">{t("question_or_title")}</label>
                <Input 
                  value={editItem.question} 
                  onChange={e => setEditItem({ ...editItem, question: e.target.value })}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="text-foreground">{t("answer_or_content")}</label>
                <Textarea 
                  value={editItem.answer} 
                  onChange={e => setEditItem({ ...editItem, answer: e.target.value })}
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditItem(null)}>
                  {t("cancel")}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  onClick={handleEditSave}
                >
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
