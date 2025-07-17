// This file provides mock data structure references for the application
// Note: Actual data comes from the backend API, this is for type reference only

export interface DashboardStats {
  totalMessages: number;
  totalAiReplies: number;
  openTickets: number;
  activeStores: number;
  messagesByDay: { date: string; count: number }[];
  messagesByType: { type: string; count: number }[];
}

export interface NotificationData {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  createdAt: Date;
  userId: number;
}

export interface FeedbackData {
  id: number;
  reply: string;
  rating: number;
  feedback: string;
  approved: boolean;
  createdAt: Date;
  messageId: number;
  confidence: number;
  tone: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
}

export interface CustomizationSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  borderRadius: number;
  animationSpeed: number;
  glassOpacity: number;
  fontSize: 'small' | 'medium' | 'large';
  layoutDensity: 'compact' | 'comfortable' | 'spacious';
  enableAnimations: boolean;
  enableGlassmorphism: boolean;
}

// Color presets for customization
export const colorPresets = [
  { name: "Blue", color: "#3B82F6" },
  { name: "Purple", color: "#8B5CF6" },
  { name: "Green", color: "#10B981" },
  { name: "Orange", color: "#F59E0B" },
  { name: "Red", color: "#EF4444" },
  { name: "Pink", color: "#EC4899" }
];

// Admin permissions list
export const adminPermissions: AdminPermission[] = [
  { id: "user_management", name: "User Management", description: "Create, edit, and delete users" },
  { id: "store_management", name: "Store Management", description: "Manage store accounts and subscriptions" },
  { id: "analytics", name: "Analytics Access", description: "View system analytics and reports" },
  { id: "settings", name: "System Settings", description: "Modify system configuration" },
  { id: "billing", name: "Billing Management", description: "Handle payments and subscriptions" },
  { id: "support", name: "Support Access", description: "Access support tickets and customer data" }
];

// Default customization settings
export const defaultCustomizationSettings: CustomizationSettings = {
  theme: 'light',
  primaryColor: '#3B82F6',
  borderRadius: 12,
  animationSpeed: 1,
  glassOpacity: 10,
  fontSize: 'medium',
  layoutDensity: 'comfortable',
  enableAnimations: true,
  enableGlassmorphism: true
};
