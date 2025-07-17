import {
  users, stores, messages, aiReplies, subscriptions, tickets, knowledgeBase, analytics, notifications,
  type User, type InsertUser, type Store, type InsertStore, type Message, type InsertMessage,
  type AiReply, type InsertAiReply, type Subscription, type InsertSubscription,
  type Ticket, type InsertTicket, type KnowledgeBase, type InsertKnowledgeBase,
  type Analytics, type InsertAnalytics, type Notification, type InsertNotification
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Stores
  getStore(id: number): Promise<Store | undefined>;
  getAllStores(): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined>;
  getStoresByStatus(status: string): Promise<Store[]>;
  
  // Messages
  getMessage(id: number): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  getMessagesByStore(storeId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByPlatform(platform: string): Promise<Message[]>;
  getMessagesByType(messageType: string): Promise<Message[]>;
  
  // AI Replies
  getAiReply(id: number): Promise<AiReply | undefined>;
  getAllAiReplies(): Promise<AiReply[]>;
  createAiReply(reply: InsertAiReply): Promise<AiReply>;
  updateAiReply(id: number, reply: Partial<InsertAiReply>): Promise<AiReply | undefined>;
  getAiRepliesByMessage(messageId: number): Promise<AiReply[]>;
  
  // Subscriptions
  getSubscription(id: number): Promise<Subscription | undefined>;
  getAllSubscriptions(): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionsByStore(storeId: number): Promise<Subscription[]>;
  
  // Tickets
  getTicket(id: number): Promise<Ticket | undefined>;
  getAllTickets(): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicket(id: number, ticket: Partial<InsertTicket>): Promise<Ticket | undefined>;
  getTicketsByStatus(status: string): Promise<Ticket[]>;
  
  // Knowledge Base
  getKnowledgeBase(id: number): Promise<KnowledgeBase | undefined>;
  getAllKnowledgeBase(): Promise<KnowledgeBase[]>;
  createKnowledgeBase(kb: InsertKnowledgeBase): Promise<KnowledgeBase>;
  updateKnowledgeBase(id: number, kb: Partial<InsertKnowledgeBase>): Promise<KnowledgeBase | undefined>;
  
  // Analytics
  getAnalytics(id: number): Promise<Analytics | undefined>;
  getAllAnalytics(): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByStore(storeId: number): Promise<Analytics[]>;
  getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]>;
  
  // Notifications
  getNotification(id: number): Promise<Notification | undefined>;
  getAllNotifications(): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    totalMessages: number;
    totalAiReplies: number;
    openTickets: number;
    activeStores: number;
    messagesByDay: { date: string; count: number }[];
    messagesByType: { type: string; count: number }[];
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private stores: Map<number, Store> = new Map();
  private messages: Map<number, Message> = new Map();
  private aiReplies: Map<number, AiReply> = new Map();
  private subscriptions: Map<number, Subscription> = new Map();
  private tickets: Map<number, Ticket> = new Map();
  private knowledgeBase: Map<number, KnowledgeBase> = new Map();
  private analytics: Map<number, Analytics> = new Map();
  private notifications: Map<number, Notification> = new Map();
  
  private currentUserId = 1;
  private currentStoreId = 1;
  private currentMessageId = 1;
  private currentAiReplyId = 1;
  private currentSubscriptionId = 1;
  private currentTicketId = 1;
  private currentKnowledgeBaseId = 1;
  private currentAnalyticsId = 1;
  private currentNotificationId = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      email: "admin@sara.com",
      password: "password",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample stores
    for (let i = 1; i <= 5; i++) {
      const store: Store = {
        id: this.currentStoreId++,
        name: `Store ${i}`,
        ownerId: adminUser.id,
        description: `Description for store ${i}`,
        status: i <= 4 ? "active" : "suspended",
        city: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"][i - 1],
        subscriptionType: ["basic", "premium", "enterprise"][i % 3],
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      };
      this.stores.set(store.id, store);
    }

    // Create sample messages
    const platforms = ["whatsapp", "instagram", "facebook"];
    const messageTypes = ["direct", "promotional", "spam", "other"];
    for (let i = 1; i <= 20; i++) {
      const message: Message = {
        id: this.currentMessageId++,
        storeId: ((i - 1) % 5) + 1,
        platform: platforms[i % 3],
        senderId: `user_${i}`,
        senderName: `User ${i}`,
        content: `Sample message content ${i}`,
        messageType: messageTypes[i % 4],
        isAiReply: i % 3 === 0,
        sentiment: ["positive", "negative", "neutral"][i % 3],
        createdAt: new Date(Date.now() - i * 60 * 60 * 1000),
      };
      this.messages.set(message.id, message);
    }

    // Create sample tickets
    for (let i = 1; i <= 10; i++) {
      const ticket: Ticket = {
        id: this.currentTicketId++,
        storeId: ((i - 1) % 5) + 1,
        title: `Support Ticket ${i}`,
        description: `Description for support ticket ${i}`,
        status: ["open", "in_progress", "closed"][i % 3],
        priority: ["low", "medium", "high", "urgent"][i % 4],
        assignedTo: adminUser.id,
        createdAt: new Date(Date.now() - i * 12 * 60 * 60 * 1000),
      };
      this.tickets.set(ticket.id, ticket);
    }
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
      role: insertUser.role || "user",
      isActive: insertUser.isActive ?? true,
    };
    this.users.set(user.id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Stores
  async getStore(id: number): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async getAllStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const store: Store = {
      ...insertStore,
      id: this.currentStoreId++,
      createdAt: new Date(),
      status: insertStore.status || "active",
      description: insertStore.description || null,
      city: insertStore.city || null,
      subscriptionType: insertStore.subscriptionType || "basic",
    };
    this.stores.set(store.id, store);
    return store;
  }

  async updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined> {
    const existingStore = this.stores.get(id);
    if (!existingStore) return undefined;
    
    const updatedStore = { ...existingStore, ...store };
    this.stores.set(id, updatedStore);
    return updatedStore;
  }

  async getStoresByStatus(status: string): Promise<Store[]> {
    return Array.from(this.stores.values()).filter(store => store.status === status);
  }

  // Messages
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async getMessagesByStore(storeId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(message => message.storeId === storeId);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      ...insertMessage,
      id: this.currentMessageId++,
      createdAt: new Date(),
      messageType: insertMessage.messageType || "direct",
      isAiReply: insertMessage.isAiReply ?? false,
      sentiment: insertMessage.sentiment || null,
    };
    this.messages.set(message.id, message);
    return message;
  }

  async getMessagesByPlatform(platform: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(message => message.platform === platform);
  }

  async getMessagesByType(messageType: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(message => message.messageType === messageType);
  }

  // AI Replies
  async getAiReply(id: number): Promise<AiReply | undefined> {
    return this.aiReplies.get(id);
  }

  async getAllAiReplies(): Promise<AiReply[]> {
    return Array.from(this.aiReplies.values());
  }

  async createAiReply(insertAiReply: InsertAiReply): Promise<AiReply> {
    const aiReply: AiReply = {
      ...insertAiReply,
      id: this.currentAiReplyId++,
      createdAt: new Date(),
      tone: insertAiReply.tone || "neutral",
      confidence: insertAiReply.confidence ?? 0.8,
      approved: insertAiReply.approved ?? false,
    };
    this.aiReplies.set(aiReply.id, aiReply);
    return aiReply;
  }

  async updateAiReply(id: number, reply: Partial<InsertAiReply>): Promise<AiReply | undefined> {
    const existingReply = this.aiReplies.get(id);
    if (!existingReply) return undefined;
    
    const updatedReply = { ...existingReply, ...reply };
    this.aiReplies.set(id, updatedReply);
    return updatedReply;
  }

  async getAiRepliesByMessage(messageId: number): Promise<AiReply[]> {
    return Array.from(this.aiReplies.values()).filter(reply => reply.messageId === messageId);
  }

  // Subscriptions
  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const subscription: Subscription = {
      ...insertSubscription,
      id: this.currentSubscriptionId++,
      status: insertSubscription.status || "active",
      startDate: insertSubscription.startDate || new Date(),
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async getSubscriptionsByStore(storeId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(sub => sub.storeId === storeId);
  }

  // Tickets
  async getTicket(id: number): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async getAllTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values());
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const ticket: Ticket = {
      ...insertTicket,
      id: this.currentTicketId++,
      createdAt: new Date(),
      status: insertTicket.status || "open",
      priority: insertTicket.priority || "medium",
      assignedTo: insertTicket.assignedTo || null,
    };
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }

  async updateTicket(id: number, ticket: Partial<InsertTicket>): Promise<Ticket | undefined> {
    const existingTicket = this.tickets.get(id);
    if (!existingTicket) return undefined;
    
    const updatedTicket = { ...existingTicket, ...ticket };
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  async getTicketsByStatus(status: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(ticket => ticket.status === status);
  }

  // Knowledge Base
  async getKnowledgeBase(id: number): Promise<KnowledgeBase | undefined> {
    return this.knowledgeBase.get(id);
  }

  async getAllKnowledgeBase(): Promise<KnowledgeBase[]> {
    return Array.from(this.knowledgeBase.values());
  }

  async createKnowledgeBase(insertKb: InsertKnowledgeBase): Promise<KnowledgeBase> {
    const kb: KnowledgeBase = {
      ...insertKb,
      id: this.currentKnowledgeBaseId++,
      createdAt: new Date(),
      tags: Array.isArray(insertKb.tags) ? insertKb.tags : null,
      isPublished: insertKb.isPublished ?? false,
    };
    this.knowledgeBase.set(kb.id, kb);
    return kb;
  }

  async updateKnowledgeBase(id: number, kb: Partial<InsertKnowledgeBase>): Promise<KnowledgeBase | undefined> {
    const existingKb = this.knowledgeBase.get(id);
    if (!existingKb) return undefined;
    
    const updatedKb = { 
      ...existingKb, 
      ...kb,
      tags: kb.tags !== undefined ? (Array.isArray(kb.tags) ? kb.tags : null) : existingKb.tags
    };
    this.knowledgeBase.set(id, updatedKb);
    return updatedKb;
  }

  // Analytics
  async getAnalytics(id: number): Promise<Analytics | undefined> {
    return this.analytics.get(id);
  }

  async getAllAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analytics.values());
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const analytics: Analytics = {
      ...insertAnalytics,
      id: this.currentAnalyticsId++,
      date: insertAnalytics.date || new Date(),
      messageCount: insertAnalytics.messageCount ?? 0,
      aiReplyCount: insertAnalytics.aiReplyCount ?? 0,
      userEngagement: insertAnalytics.userEngagement ?? 0,
      responseTime: insertAnalytics.responseTime ?? 0,
    };
    this.analytics.set(analytics.id, analytics);
    return analytics;
  }

  async getAnalyticsByStore(storeId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => analytics.storeId === storeId);
  }

  async getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => 
      analytics.date >= startDate && analytics.date <= endDate
    );
  }

  // Notifications
  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const notification: Notification = {
      ...insertNotification,
      id: this.currentNotificationId++,
      createdAt: new Date(),
      type: insertNotification.type || "info",
      isRead: insertNotification.isRead ?? false,
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => notification.userId === userId);
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    
    const updatedNotification = { ...notification, isRead: true };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  // Dashboard stats
  async getDashboardStats() {
    const totalMessages = this.messages.size;
    const totalAiReplies = this.aiReplies.size;
    const openTickets = Array.from(this.tickets.values()).filter(ticket => ticket.status === "open").length;
    const activeStores = Array.from(this.stores.values()).filter(store => store.status === "active").length;

    // Get messages by day for the last 7 days
    const messagesByDay = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = Array.from(this.messages.values()).filter(message => {
        const messageDate = message.createdAt.toISOString().split('T')[0];
        return messageDate === dateStr;
      }).length;
      
      messagesByDay.push({ date: dateStr, count });
    }

    // Get messages by type
    const messagesByType = [
      { type: "direct", count: Array.from(this.messages.values()).filter(m => m.messageType === "direct").length },
      { type: "promotional", count: Array.from(this.messages.values()).filter(m => m.messageType === "promotional").length },
      { type: "spam", count: Array.from(this.messages.values()).filter(m => m.messageType === "spam").length },
      { type: "other", count: Array.from(this.messages.values()).filter(m => m.messageType === "other").length },
    ];

    return {
      totalMessages,
      totalAiReplies,
      openTickets,
      activeStores,
      messagesByDay,
      messagesByType,
    };
  }
}

export const storage = new MemStorage();
