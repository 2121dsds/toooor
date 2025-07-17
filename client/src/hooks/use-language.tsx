import { createContext, useContext, useEffect, useState } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  ar: {
    // Navigation
    "dashboard": "لوحة القيادة",
    "messages": "الرسائل",
    "stores": "المتاجر",
    "subscriptions": "الاشتراكات",
    "ai_replies": "الردود الذكية",
    "analytics": "التحليلات",
    "feedback": "التقييمات",
    "knowledge_base": "قاعدة المعرفة",
    "tickets": "التذاكر",
    "notifications": "الإشعارات",
    "admins": "المديرين",
    "customization": "التخصيص",
    "invites_offers": "الدعوات والعروض",
    "tutorials": "مكتبة الشروحات",
    
    // Dashboard
    "total_messages": "إجمالي الرسائل",
    "total_ai_replies": "الردود الذكية",
    "open_tickets": "التذاكر المفتوحة",
    "active_stores": "المتاجر النشطة",
    "recent_activity": "النشاط الأخير",
    "message_analytics": "تحليلات الرسائل",
    "platform_overview": "نظرة عامة على المنصات",
    
    // Dashboard KPIs
    "total_stores": "إجمالي عدد المتاجر",
    "subscriptions_active_expired": "عدد الاشتراكات النشطة / المنتهية",
    "reply_rate": "معدل الردود الإجمالي",
    "customer_rating": "تقييمات العملاء العامة",
    "total_messages_sent_received": "عدد الرسائل المرسلة والمستلمة عبر المنصات",
    "sent": "المرسلة",
    "received": "المستلمة",
    "platform_activity_chart": "رسوم بيانية زمنية للحركة عبر المنصة",
    "chart_placeholder": "(رسم بياني تجريبي)",
    "important_alerts": "تنبيهات فورية للحالات المهمة",
    "alert_subscription_expired": "تنبيه: يوجد اشتراكات منتهية!",
    "alert_low_activity": "تنبيه: هناك متاجر ذات تفاعل منخفض!",
    "alert_new_report": "تنبيه: تم استلام بلاغ جديد!",
    
    // Common
    "search": "بحث",
    "filter": "تصفية",
    "add": "إضافة",
    "edit": "تعديل",
    "delete": "حذف",
    "save": "حفظ",
    "cancel": "إلغاء",
    "view": "عرض",
    "status": "الحالة",
    "date": "التاريخ",
    "time": "الوقت",
    "name": "الاسم",
    "email": "البريد الإلكتروني",
    "phone": "الهاتف",
    "address": "العنوان",
    "city": "المدينة",
    "country": "البلد",
    
    // Status
    "active": "نشط",
    "inactive": "غير نشط",
    "pending": "في الانتظار",
    "approved": "موافق عليه",
    "rejected": "مرفوض",
    "open": "مفتوح",
    "closed": "مغلق",
    "in_progress": "قيد التنفيذ",
    
    // Messages
    "new_message": "رسالة جديدة",
    "reply": "رد",
    "forward": "إعادة توجيه",
    "mark_as_read": "تحديد كمقروء",
    "mark_as_unread": "تحديد كغير مقروء",
    "whatsapp": "واتساب",
    "instagram": "إنستغرام",
    "facebook": "فيسبوك",
    
    // Store Management
    "store": "المتجر",
    "activity_rate": "معدل النشاط",
    "sales": "المبيعات",
    "store_name": "اسم المتجر",
    "owner": "المالك",
    "subscription_type": "نوع الاشتراك",
    "basic": "أساسي",
    "premium": "مميز",
    "enterprise": "مؤسسي",
    
    // Settings
    "theme": "المظهر",
    "light": "فاتح",
    "dark": "داكن",
    "language": "اللغة",
    "arabic": "العربية",
    "english": "الإنجليزية",
    
    // Welcome
    "welcome_to_sara": "مرحباً بك في سارة",
    "admin_dashboard": "لوحة تحكم المدير",
    "manage_your_business": "إدارة أعمالك بذكاء",
    
    // Admins page
    "super_admins": "المديرون العامون",
    "administrators": "المديرون",
    "administrator_list": "قائمة المسؤولين",
    "search_admins": "ابحث عن المسؤولين...",
    "all_roles": "كل الأدوار",
    "change_permissions": "تغيير الصلاحيات",
    "ban": "حظر",
    "read_only": "قراءة فقط",
    "store_manager": "إدارة متاجر",
    "data_analyst": "تحليل بيانات فقط",
    "support_agent": "دعم فني",
    "edit_admin": "تعديل مسؤول",
    
    // Stores page
    "store_management": "إدارة المتاجر",
    "add_store": "إضافة متجر",
    "all_status": "كل الحالات",
    "all_cities": "كل المدن",
    "riyadh": "الرياض",
    "jeddah": "جدة",
    "dammam": "الدمام",
    "subscription_info": "معلومات الاشتراك",
    "registration_date": "تاريخ التسجيل",
    "actions": "إجراءات",
    "store_owner": "مالك المتجر",
    "expires_at": "ينتهي في",
    "go_to_dashboard": "لوحة تحكم المتجر",
    "suspend_store": "إيقاف المتجر",
    "activate_store": "تفعيل المتجر",
    "suspended_until": "موقوف حتى",
    "suspended_stores": "المتاجر الموقوفة",
    "timer": "العد التنازلي",
    "days": "يوم",
    "hours": "ساعة",
    "minutes": "دقيقة",
    "store_will_be_activated_soon": "سيتم تفعيل المتجر قريبًا",
    
    // Users page
    "user_management": "إدارة المستخدمين",
    "add_user": "إضافة مستخدم",
    "enter_username": "ادخل اسم المستخدم",
    "enter_email": "ادخل البريد الإلكتروني",
    "username": "اسم المستخدم",
    "role": "الدور",
    "joined": "تاريخ الانضمام",
    "user": "المستخدم",
    "ai_reply_management": "إدارة الردود الذكية",
    "tone": "النبرة",
    "confidence": "الثقة",
    "usage": "الاستخدام",
    "usage_unit": "استخدام",
    "rating": "التقييم",
    "success": "النجاح",
    "created_at": "تاريخ الإنشاء",
    "train_new_reply": "تدريب رد جديد",
    "reply_tone": "نبرة الرد",
    "reply_text": "نص الرد",
    "enter_new_reply": "أدخل نص الرد الجديد...",
    "add_new_reply": "إضافة رد جديد",
    "top5_most_used_replies": "أكثر 5 ردود استخدامًا",
    "edit_ai_reply": "تعديل الرد الذكي",
    "confirm_delete_ai_reply": "تأكيد حذف الرد الذكي",
    "delete_ai_reply_warning": "هل أنت متأكد أنك تريد حذف هذا الرد؟ لا يمكن التراجع.",
    "improve_ai_reply": "تحسين الرد الذكي",
    "improved_text": "النص المحسن",
    "save_improvement": "حفظ التحسين",
    "formal": "رسمي",
    "friendly": "ودود",
    "direct": "مباشر",
    "report_name": "اسم التقرير",
    "keyword": "الكلمة المفتاحية",
    "count": "العدد",
    "support_tickets": "تذاكر الدعم",
    "new_ticket": "تذكرة جديدة",
    "add_ticket": "إضافة تذكرة",
    "edit_ticket": "تعديل التذكرة",
    "ticket_details": "تفاصيل التذكرة",
    "manage_discount_codes": "إدارة أكواد الخصم",
    "code_optional": "الكود (اختياري)",
    "all_priorities": "كل الأولويات",
    "urgent": "عاجل",
    "high": "مرتفع",
    "medium": "متوسط",
    "low": "منخفض",
    "assigned_to": "مُسند إلى",
    "ticket_id": "معرّف التذكرة",
    "value": "القيمة",
    "type": "النوع",
    "total_tickets": "إجمالي التذاكر",
    "title": "العنوان",
    "description": "الوصف",
    // Store Dashboard
    "store_dashboard": "لوحة تحكم المتجر",
    "store_dashboard_welcome": "مرحباً بك في لوحة تحكم المتجر!",
    // System Settings (NEW)
    "settings_saved_successfully": "تم حفظ الإعدادات بنجاح",
    "integrations_saved": "تم حفظ إعدادات الربط",
    "default_theme_saved": "تم حفظ الثيم الافتراضي",
    "notification_settings_saved": "تم حفظ إعدادات الإشعارات",
    "system_settings": "إعدادات النظام العامة",
    "manage_system_and_integrations": "تحكم في إعدادات النظام وربط المنصات",
    "general_settings": "الإعدادات العامة",
    "integrations": "الربط مع المنصات",
    "upload_logo": "رفع الشعار",
    "system_name": "اسم النظام",
    "enter_system_name": "أدخل اسم النظام",
    "default_language": "اللغة الافتراضية",
    "save_theme": "حفظ الثيم",
    "central_notification_system": "نظام الإشعارات المركزية",
    "enable_central_notifications": "تفعيل الإشعارات المركزية",
    "save_settings": "حفظ الإعدادات",
    "social_media_integrations": "ربط المنصات الاجتماعية",
    "connected": "متصل",
    "not_connected": "غير متصل",
    "disconnect": "فصل الاتصال",
    "connect": "اتصال",
    "enter_api_key": "أدخل مفتاح API",
    "enter_api_secret": "أدخل سر API",
    // Knowledge Base (NEW)
    "kb_q_return_policy": "ما هي سياسة الاسترجاع؟",
    "kb_a_return_policy": "يمكنك استرجاع المنتج خلال 14 يومًا من تاريخ الاستلام بشرط أن يكون بحالته الأصلية.",
    "kb_q_track_order": "كيف أتتبع طلبي؟",
    "kb_a_track_order": "يمكنك تتبع طلبك من خلال صفحة الطلبات أو التواصل مع خدمة العملاء.",
    "kb_q_international_shipping": "هل يوجد توصيل دولي؟",
    "kb_a_international_shipping": "نعم، نوفر التوصيل الدولي لمعظم الدول برسوم إضافية.",
    "kb_q_payment_methods": "ما هي طرق الدفع المتاحة؟",
    "kb_a_payment_methods": "نوفر الدفع عبر الفيزا، الماستركارد، والدفع عند الاستلام.",
    "ai_knowledge_base": "قاعدة معرفة الذكاء الاصطناعي",
    "ai_knowledge_base_desc": "هذه الصفحة مخصصة لإضافة وتعديل وحذف عناصر المعرفة النصية (أسئلة متكررة، سياسات، معلومات عن المنتجات، تعليمات للعملاء) التي يعتمد عليها الذكاء الاصطناعي في الرد على استفسارات العملاء.",
    "ai_knowledge_base_note": "ملاحظة: هذه القاعدة ليست للشروحات أو تعليم استخدام المنصة، بل هي مصدر ردود الذكاء الاصطناعي على العملاء.",
    "add_knowledge": "إضافة معلومة",
    "add_new_knowledge": "إضافة معلومة جديدة",
    "question_or_title": "السؤال أو العنوان",
    "enter_question_or_title": "اكتب السؤال أو العنوان",
    "answer_or_content": "الإجابة أو المحتوى",
    "enter_answer_or_content": "اكتب الإجابة أو المحتوى",
    "edit_knowledge": "تعديل معلومة",
  },
  en: {
    // Navigation
    "dashboard": "Dashboard",
    "messages": "Messages",
    "stores": "Stores",
    "subscriptions": "Subscriptions",
    "ai_replies": "AI Replies",
    "analytics": "Analytics",
    "feedback": "Feedback",
    "knowledge_base": "Knowledge Base",
    "tickets": "Tickets",
    "notifications": "Notifications",
    "admins": "Admins",
    "customization": "Customization",
    "invites_offers": "Invites & Offers",
    "tutorials": "Tutorials Library",
    
    // Dashboard
    "total_messages": "Total Messages",
    "total_ai_replies": "AI Replies",
    "open_tickets": "Open Tickets",
    "active_stores": "Active Stores",
    "recent_activity": "Recent Activity",
    "message_analytics": "Message Analytics",
    "platform_overview": "Platform Overview",
    
    // Dashboard KPIs
    "total_stores": "Total Stores",
    "subscriptions_active_expired": "Active / Expired Subscriptions",
    "reply_rate": "Overall Reply Rate",
    "customer_rating": "Customer Ratings",
    "total_messages_sent_received": "Total Messages Sent/Received",
    "sent": "Sent",
    "received": "Received",
    "platform_activity_chart": "Platform Activity Chart",
    "chart_placeholder": "(Sample Chart)",
    "important_alerts": "Important Alerts",
    "alert_subscription_expired": "Alert: Some subscriptions have expired!",
    "alert_low_activity": "Alert: Some stores have low activity!",
    "alert_new_report": "Alert: New report received!",
    
    // Common
    "search": "Search",
    "filter": "Filter",
    "add": "Add",
    "edit": "Edit",
    "delete": "Delete",
    "save": "Save",
    "cancel": "Cancel",
    "view": "View",
    "status": "Status",
    "date": "Date",
    "time": "Time",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "address": "Address",
    "city": "City",
    "country": "Country",
    
    // Status
    "active": "Active",
    "inactive": "Inactive",
    "pending": "Pending",
    "approved": "Approved",
    "rejected": "Rejected",
    "open": "Open",
    "closed": "Closed",
    "in_progress": "In Progress",
    
    // Messages
    "new_message": "New Message",
    "reply": "Reply",
    "forward": "Forward",
    "mark_as_read": "Mark as Read",
    "mark_as_unread": "Mark as Unread",
    "whatsapp": "WhatsApp",
    "instagram": "Instagram",
    "facebook": "Facebook",
    
    // Store Management
    "store": "Store",
    "activity_rate": "Activity Rate",
    "sales": "Sales",
    "store_name": "Store Name",
    "owner": "Owner",
    "subscription_type": "Subscription Type",
    "basic": "Basic",
    "premium": "Premium",
    "enterprise": "Enterprise",
    
    // Settings
    "theme": "Theme",
    "light": "Light",
    "dark": "Dark",
    "language": "Language",
    "arabic": "Arabic",
    "english": "English",
    
    // Welcome
    "welcome_to_sara": "Welcome to Sara",
    "admin_dashboard": "Admin Dashboard",
    "manage_your_business": "Manage Your Business Intelligently",
    
    // Admins page
    "super_admins": "Super Admins",
    "administrators": "Administrators",
    "administrator_list": "Administrator List",
    "search_admins": "Search administrators...",
    "all_roles": "All Roles",
    "change_permissions": "Change Permissions",
    "ban": "Ban",
    "read_only": "Read Only",
    "store_manager": "Store Manager",
    "data_analyst": "Data Analyst",
    "support_agent": "Support Agent",
    "edit_admin": "Edit Admin",
    
    // Stores page
    "store_management": "Store Management",
    "add_store": "Add Store",
    "all_status": "All Status",
    "all_cities": "All Cities",
    "riyadh": "Riyadh",
    "jeddah": "Jeddah",
    "dammam": "Dammam",
    "subscription_info": "Subscription Info",
    "registration_date": "Registration Date",
    "actions": "Actions",
    "store_owner": "Store Owner",
    "expires_at": "Expires At",
    "go_to_dashboard": "Go to Dashboard",
    "suspend_store": "Suspend Store",
    "activate_store": "Activate Store",
    "suspended_until": "Suspended Until",
    "suspended_stores": "Suspended Stores",
    "timer": "Timer",
    "days": "days",
    "hours": "hours",
    "minutes": "minutes",
    "store_will_be_activated_soon": "Store will be activated soon",
    
    // Users page
    "user_management": "User Management",
    "add_user": "Add User",
    "enter_username": "Enter username",
    "enter_email": "Enter email",
    "username": "Username",
    "role": "Role",
    "joined": "Joined",
    "user": "User",
    "ai_reply_management": "AI Reply Management",
    "tone": "Tone",
    "confidence": "Confidence",
    "usage": "Usage",
    "usage_unit": "uses",
    "rating": "Rating",
    "success": "Success",
    "created_at": "Created At",
    "train_new_reply": "Train New Reply",
    "reply_tone": "Reply Tone",
    "reply_text": "Reply Text",
    "enter_new_reply": "Enter the new reply...",
    "add_new_reply": "Add New Reply",
    "top5_most_used_replies": "Top 5 Most Used Replies",
    "edit_ai_reply": "Edit AI Reply",
    "confirm_delete_ai_reply": "Confirm Delete AI Reply",
    "delete_ai_reply_warning": "Are you sure you want to delete this reply? This action cannot be undone.",
    "improve_ai_reply": "Improve AI Reply",
    "improved_text": "Improved Text",
    "save_improvement": "Save Improvement",
    "formal": "Formal",
    "friendly": "Friendly",
    "direct": "Direct",
    "report_name": "Report Name",
    "keyword": "Keyword",
    "count": "Count",
    "support_tickets": "Support Tickets",
    "new_ticket": "New Ticket",
    "add_ticket": "Add Ticket",
    "edit_ticket": "Edit Ticket",
    "ticket_details": "Ticket Details",
    "manage_discount_codes": "Manage Discount Codes",
    "code_optional": "Code (optional)",
    "all_priorities": "All Priorities",
    "urgent": "Urgent",
    "high": "High",
    "medium": "Medium",
    "low": "Low",
    "assigned_to": "Assigned to",
    "ticket_id": "Ticket ID",
    "value": "Value",
    "type": "Type",
    "total_tickets": "Total Tickets",
    "title": "Title",
    "description": "Description",
    // Store Dashboard
    "store_dashboard": "Store Dashboard",
    "store_dashboard_welcome": "Welcome to the Store Dashboard!",
    // System Settings (NEW)
    "settings_saved_successfully": "Settings saved successfully",
    "integrations_saved": "Integrations saved",
    "default_theme_saved": "Default theme saved",
    "notification_settings_saved": "Notification settings saved",
    "system_settings": "System Settings",
    "manage_system_and_integrations": "Manage system and integrations",
    "general_settings": "General Settings",
    "integrations": "Integrations",
    "upload_logo": "Upload Logo",
    "system_name": "System Name",
    "enter_system_name": "Enter system name",
    "default_language": "Default Language",
    "save_theme": "Save Theme",
    "central_notification_system": "Central Notification System",
    "enable_central_notifications": "Enable Central Notifications",
    "save_settings": "Save Settings",
    "social_media_integrations": "Social Media Integrations",
    "connected": "Connected",
    "not_connected": "Not connected",
    "disconnect": "Disconnect",
    "connect": "Connect",
    "enter_api_key": "Enter API Key",
    "enter_api_secret": "Enter API Secret",
    // Knowledge Base (NEW)
    "kb_q_return_policy": "What is the return policy?",
    "kb_a_return_policy": "You can return the product within 14 days of receipt if it is in its original condition.",
    "kb_q_track_order": "How can I track my order?",
    "kb_a_track_order": "You can track your order from the orders page or by contacting customer support.",
    "kb_q_international_shipping": "Is international shipping available?",
    "kb_a_international_shipping": "Yes, we offer international shipping to most countries for an additional fee.",
    "kb_q_payment_methods": "What payment methods are available?",
    "kb_a_payment_methods": "We support Visa, MasterCard, and Cash on Delivery.",
    "ai_knowledge_base": "AI Knowledge Base",
    "ai_knowledge_base_desc": "This page is for adding, editing, and deleting textual knowledge items (FAQs, policies, product info, customer instructions) that the AI uses to answer customer queries.",
    "ai_knowledge_base_note": "Note: This base is not for tutorials or platform usage guides, but for the AI to answer customer questions.",
    "add_knowledge": "Add Knowledge",
    "add_new_knowledge": "Add New Knowledge",
    "question_or_title": "Question or Title",
    "enter_question_or_title": "Enter question or title",
    "answer_or_content": "Answer or Content",
    "enter_answer_or_content": "Enter answer or content",
    "edit_knowledge": "Edit Knowledge",
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("sara-language") as Language;
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sara-language", language);
    // Keep LTR direction for Arabic to maintain layout consistency
    document.documentElement.dir = "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    isRTL: false, // Keep LTR layout for consistency
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}