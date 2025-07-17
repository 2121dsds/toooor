// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  stores = /* @__PURE__ */ new Map();
  messages = /* @__PURE__ */ new Map();
  aiReplies = /* @__PURE__ */ new Map();
  subscriptions = /* @__PURE__ */ new Map();
  tickets = /* @__PURE__ */ new Map();
  knowledgeBase = /* @__PURE__ */ new Map();
  analytics = /* @__PURE__ */ new Map();
  notifications = /* @__PURE__ */ new Map();
  currentUserId = 1;
  currentStoreId = 1;
  currentMessageId = 1;
  currentAiReplyId = 1;
  currentSubscriptionId = 1;
  currentTicketId = 1;
  currentKnowledgeBaseId = 1;
  currentAnalyticsId = 1;
  currentNotificationId = 1;
  constructor() {
    this.initializeSampleData();
  }
  initializeSampleData() {
    const adminUser = {
      id: this.currentUserId++,
      username: "admin",
      email: "admin@sara.com",
      password: "password",
      role: "admin",
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(adminUser.id, adminUser);
    for (let i = 1; i <= 5; i++) {
      const store = {
        id: this.currentStoreId++,
        name: `Store ${i}`,
        ownerId: adminUser.id,
        description: `Description for store ${i}`,
        status: i <= 4 ? "active" : "suspended",
        city: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"][i - 1],
        subscriptionType: ["basic", "premium", "enterprise"][i % 3],
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1e3)
      };
      this.stores.set(store.id, store);
    }
    const platforms = ["whatsapp", "instagram", "facebook"];
    const messageTypes = ["direct", "promotional", "spam", "other"];
    for (let i = 1; i <= 20; i++) {
      const message = {
        id: this.currentMessageId++,
        storeId: (i - 1) % 5 + 1,
        platform: platforms[i % 3],
        senderId: `user_${i}`,
        senderName: `User ${i}`,
        content: `Sample message content ${i}`,
        messageType: messageTypes[i % 4],
        isAiReply: i % 3 === 0,
        sentiment: ["positive", "negative", "neutral"][i % 3],
        createdAt: new Date(Date.now() - i * 60 * 60 * 1e3)
      };
      this.messages.set(message.id, message);
    }
    for (let i = 1; i <= 10; i++) {
      const ticket = {
        id: this.currentTicketId++,
        storeId: (i - 1) % 5 + 1,
        title: `Support Ticket ${i}`,
        description: `Description for support ticket ${i}`,
        status: ["open", "in_progress", "closed"][i % 3],
        priority: ["low", "medium", "high", "urgent"][i % 4],
        assignedTo: adminUser.id,
        createdAt: new Date(Date.now() - i * 12 * 60 * 60 * 1e3)
      };
      this.tickets.set(ticket.id, ticket);
    }
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const user = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: /* @__PURE__ */ new Date(),
      role: insertUser.role || "user",
      isActive: insertUser.isActive ?? true
    };
    this.users.set(user.id, user);
    return user;
  }
  async getAllUsers() {
    return Array.from(this.users.values());
  }
  async updateUser(id, user) {
    const existingUser = this.users.get(id);
    if (!existingUser) return void 0;
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Stores
  async getStore(id) {
    return this.stores.get(id);
  }
  async getAllStores() {
    return Array.from(this.stores.values());
  }
  async createStore(insertStore) {
    const store = {
      ...insertStore,
      id: this.currentStoreId++,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertStore.status || "active",
      description: insertStore.description || null,
      city: insertStore.city || null,
      subscriptionType: insertStore.subscriptionType || "basic"
    };
    this.stores.set(store.id, store);
    return store;
  }
  async updateStore(id, store) {
    const existingStore = this.stores.get(id);
    if (!existingStore) return void 0;
    const updatedStore = { ...existingStore, ...store };
    this.stores.set(id, updatedStore);
    return updatedStore;
  }
  async getStoresByStatus(status) {
    return Array.from(this.stores.values()).filter((store) => store.status === status);
  }
  // Messages
  async getMessage(id) {
    return this.messages.get(id);
  }
  async getAllMessages() {
    return Array.from(this.messages.values());
  }
  async getMessagesByStore(storeId) {
    return Array.from(this.messages.values()).filter((message) => message.storeId === storeId);
  }
  async createMessage(insertMessage) {
    const message = {
      ...insertMessage,
      id: this.currentMessageId++,
      createdAt: /* @__PURE__ */ new Date(),
      messageType: insertMessage.messageType || "direct",
      isAiReply: insertMessage.isAiReply ?? false,
      sentiment: insertMessage.sentiment || null
    };
    this.messages.set(message.id, message);
    return message;
  }
  async getMessagesByPlatform(platform) {
    return Array.from(this.messages.values()).filter((message) => message.platform === platform);
  }
  async getMessagesByType(messageType) {
    return Array.from(this.messages.values()).filter((message) => message.messageType === messageType);
  }
  // AI Replies
  async getAiReply(id) {
    return this.aiReplies.get(id);
  }
  async getAllAiReplies() {
    return Array.from(this.aiReplies.values());
  }
  async createAiReply(insertAiReply) {
    const aiReply = {
      ...insertAiReply,
      id: this.currentAiReplyId++,
      createdAt: /* @__PURE__ */ new Date(),
      tone: insertAiReply.tone || "neutral",
      confidence: insertAiReply.confidence ?? 0.8,
      approved: insertAiReply.approved ?? false
    };
    this.aiReplies.set(aiReply.id, aiReply);
    return aiReply;
  }
  async updateAiReply(id, reply) {
    const existingReply = this.aiReplies.get(id);
    if (!existingReply) return void 0;
    const updatedReply = { ...existingReply, ...reply };
    this.aiReplies.set(id, updatedReply);
    return updatedReply;
  }
  async getAiRepliesByMessage(messageId) {
    return Array.from(this.aiReplies.values()).filter((reply) => reply.messageId === messageId);
  }
  // Subscriptions
  async getSubscription(id) {
    return this.subscriptions.get(id);
  }
  async getAllSubscriptions() {
    return Array.from(this.subscriptions.values());
  }
  async createSubscription(insertSubscription) {
    const subscription = {
      ...insertSubscription,
      id: this.currentSubscriptionId++,
      status: insertSubscription.status || "active",
      startDate: insertSubscription.startDate || /* @__PURE__ */ new Date()
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }
  async getSubscriptionsByStore(storeId) {
    return Array.from(this.subscriptions.values()).filter((sub) => sub.storeId === storeId);
  }
  // Tickets
  async getTicket(id) {
    return this.tickets.get(id);
  }
  async getAllTickets() {
    return Array.from(this.tickets.values());
  }
  async createTicket(insertTicket) {
    const ticket = {
      ...insertTicket,
      id: this.currentTicketId++,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertTicket.status || "open",
      priority: insertTicket.priority || "medium",
      assignedTo: insertTicket.assignedTo || null
    };
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }
  async updateTicket(id, ticket) {
    const existingTicket = this.tickets.get(id);
    if (!existingTicket) return void 0;
    const updatedTicket = { ...existingTicket, ...ticket };
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }
  async getTicketsByStatus(status) {
    return Array.from(this.tickets.values()).filter((ticket) => ticket.status === status);
  }
  // Knowledge Base
  async getKnowledgeBase(id) {
    return this.knowledgeBase.get(id);
  }
  async getAllKnowledgeBase() {
    return Array.from(this.knowledgeBase.values());
  }
  async createKnowledgeBase(insertKb) {
    const kb = {
      ...insertKb,
      id: this.currentKnowledgeBaseId++,
      createdAt: /* @__PURE__ */ new Date(),
      tags: Array.isArray(insertKb.tags) ? insertKb.tags : null,
      isPublished: insertKb.isPublished ?? false
    };
    this.knowledgeBase.set(kb.id, kb);
    return kb;
  }
  async updateKnowledgeBase(id, kb) {
    const existingKb = this.knowledgeBase.get(id);
    if (!existingKb) return void 0;
    const updatedKb = {
      ...existingKb,
      ...kb,
      tags: kb.tags !== void 0 ? Array.isArray(kb.tags) ? kb.tags : null : existingKb.tags
    };
    this.knowledgeBase.set(id, updatedKb);
    return updatedKb;
  }
  // Analytics
  async getAnalytics(id) {
    return this.analytics.get(id);
  }
  async getAllAnalytics() {
    return Array.from(this.analytics.values());
  }
  async createAnalytics(insertAnalytics) {
    const analytics2 = {
      ...insertAnalytics,
      id: this.currentAnalyticsId++,
      date: insertAnalytics.date || /* @__PURE__ */ new Date(),
      messageCount: insertAnalytics.messageCount ?? 0,
      aiReplyCount: insertAnalytics.aiReplyCount ?? 0,
      userEngagement: insertAnalytics.userEngagement ?? 0,
      responseTime: insertAnalytics.responseTime ?? 0
    };
    this.analytics.set(analytics2.id, analytics2);
    return analytics2;
  }
  async getAnalyticsByStore(storeId) {
    return Array.from(this.analytics.values()).filter((analytics2) => analytics2.storeId === storeId);
  }
  async getAnalyticsByDateRange(startDate, endDate) {
    return Array.from(this.analytics.values()).filter(
      (analytics2) => analytics2.date >= startDate && analytics2.date <= endDate
    );
  }
  // Notifications
  async getNotification(id) {
    return this.notifications.get(id);
  }
  async getAllNotifications() {
    return Array.from(this.notifications.values());
  }
  async createNotification(insertNotification) {
    const notification = {
      ...insertNotification,
      id: this.currentNotificationId++,
      createdAt: /* @__PURE__ */ new Date(),
      type: insertNotification.type || "info",
      isRead: insertNotification.isRead ?? false
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }
  async getNotificationsByUser(userId) {
    return Array.from(this.notifications.values()).filter((notification) => notification.userId === userId);
  }
  async markNotificationAsRead(id) {
    const notification = this.notifications.get(id);
    if (!notification) return void 0;
    const updatedNotification = { ...notification, isRead: true };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }
  // Dashboard stats
  async getDashboardStats() {
    const totalMessages = this.messages.size;
    const totalAiReplies = this.aiReplies.size;
    const openTickets = Array.from(this.tickets.values()).filter((ticket) => ticket.status === "open").length;
    const activeStores = Array.from(this.stores.values()).filter((store) => store.status === "active").length;
    const messagesByDay = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const count = Array.from(this.messages.values()).filter((message) => {
        const messageDate = message.createdAt.toISOString().split("T")[0];
        return messageDate === dateStr;
      }).length;
      messagesByDay.push({ date: dateStr, count });
    }
    const messagesByType = [
      { type: "direct", count: Array.from(this.messages.values()).filter((m) => m.messageType === "direct").length },
      { type: "promotional", count: Array.from(this.messages.values()).filter((m) => m.messageType === "promotional").length },
      { type: "spam", count: Array.from(this.messages.values()).filter((m) => m.messageType === "spam").length },
      { type: "other", count: Array.from(this.messages.values()).filter((m) => m.messageType === "other").length }
    ];
    return {
      totalMessages,
      totalAiReplies,
      openTickets,
      activeStores,
      messagesByDay,
      messagesByType
    };
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  // user, admin, super_admin
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: integer("owner_id").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  // active, suspended, pending
  city: text("city"),
  subscriptionType: text("subscription_type").notNull().default("basic"),
  // basic, premium, enterprise
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").notNull(),
  platform: text("platform").notNull(),
  // whatsapp, instagram, facebook, etc.
  senderId: text("sender_id").notNull(),
  senderName: text("sender_name").notNull(),
  content: text("content").notNull(),
  messageType: text("message_type").notNull().default("direct"),
  // direct, promotional, spam, other
  isAiReply: boolean("is_ai_reply").notNull().default(false),
  sentiment: text("sentiment"),
  // positive, negative, neutral
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var aiReplies = pgTable("ai_replies", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull(),
  reply: text("reply").notNull(),
  tone: text("tone").notNull().default("formal"),
  // formal, friendly, direct
  confidence: real("confidence").notNull().default(0.8),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").notNull(),
  planType: text("plan_type").notNull(),
  // basic, premium, enterprise
  status: text("status").notNull().default("active"),
  // active, expired, cancelled
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date").notNull(),
  amount: real("amount").notNull()
});
var tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("open"),
  // open, in_progress, closed
  priority: text("priority").notNull().default("medium"),
  // low, medium, high, urgent
  assignedTo: integer("assigned_to"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var knowledgeBase = pgTable("knowledge_base", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: json("tags").$type().default([]),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  messageCount: integer("message_count").notNull().default(0),
  aiReplyCount: integer("ai_reply_count").notNull().default(0),
  userEngagement: real("user_engagement").notNull().default(0),
  responseTime: real("response_time").notNull().default(0)
  // in seconds
});
var notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"),
  // info, warning, error, success
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertStoreSchema = createInsertSchema(stores).omit({ id: true, createdAt: true });
var insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
var insertAiReplySchema = createInsertSchema(aiReplies).omit({ id: true, createdAt: true });
var insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true });
var insertTicketSchema = createInsertSchema(tickets).omit({ id: true, createdAt: true });
var insertKnowledgeBaseSchema = createInsertSchema(knowledgeBase).omit({ id: true, createdAt: true });
var insertAnalyticsSchema = createInsertSchema(analytics).omit({ id: true });
var insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const validation = insertUserSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid user data", errors: validation.error.errors });
      }
      const user = await storage.createUser(validation.data);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.get("/api/stores", async (req, res) => {
    try {
      const { status } = req.query;
      let stores2;
      if (status && typeof status === "string") {
        stores2 = await storage.getStoresByStatus(status);
      } else {
        stores2 = await storage.getAllStores();
      }
      res.json(stores2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });
  app2.get("/api/stores/:id", async (req, res) => {
    try {
      const store = await storage.getStore(parseInt(req.params.id));
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store" });
    }
  });
  app2.post("/api/stores", async (req, res) => {
    try {
      const validation = insertStoreSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid store data", errors: validation.error.errors });
      }
      const store = await storage.createStore(validation.data);
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ message: "Failed to create store" });
    }
  });
  app2.patch("/api/stores/:id", async (req, res) => {
    try {
      const store = await storage.updateStore(parseInt(req.params.id), req.body);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: "Failed to update store" });
    }
  });
  app2.get("/api/messages", async (req, res) => {
    try {
      const { storeId, platform, type } = req.query;
      let messages2;
      if (storeId && typeof storeId === "string") {
        messages2 = await storage.getMessagesByStore(parseInt(storeId));
      } else if (platform && typeof platform === "string") {
        messages2 = await storage.getMessagesByPlatform(platform);
      } else if (type && typeof type === "string") {
        messages2 = await storage.getMessagesByType(type);
      } else {
        messages2 = await storage.getAllMessages();
      }
      res.json(messages2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.get("/api/messages/:id", async (req, res) => {
    try {
      const message = await storage.getMessage(parseInt(req.params.id));
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch message" });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const validation = insertMessageSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid message data", errors: validation.error.errors });
      }
      const message = await storage.createMessage(validation.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to create message" });
    }
  });
  app2.get("/api/ai-replies", async (req, res) => {
    try {
      const { messageId } = req.query;
      let replies;
      if (messageId && typeof messageId === "string") {
        replies = await storage.getAiRepliesByMessage(parseInt(messageId));
      } else {
        replies = await storage.getAllAiReplies();
      }
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI replies" });
    }
  });
  app2.post("/api/ai-replies", async (req, res) => {
    try {
      const validation = insertAiReplySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid AI reply data", errors: validation.error.errors });
      }
      const reply = await storage.createAiReply(validation.data);
      res.status(201).json(reply);
    } catch (error) {
      res.status(500).json({ message: "Failed to create AI reply" });
    }
  });
  app2.patch("/api/ai-replies/:id", async (req, res) => {
    try {
      const reply = await storage.updateAiReply(parseInt(req.params.id), req.body);
      if (!reply) {
        return res.status(404).json({ message: "AI reply not found" });
      }
      res.json(reply);
    } catch (error) {
      res.status(500).json({ message: "Failed to update AI reply" });
    }
  });
  app2.get("/api/tickets", async (req, res) => {
    try {
      const { status } = req.query;
      let tickets2;
      if (status && typeof status === "string") {
        tickets2 = await storage.getTicketsByStatus(status);
      } else {
        tickets2 = await storage.getAllTickets();
      }
      res.json(tickets2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });
  app2.get("/api/tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.getTicket(parseInt(req.params.id));
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ticket" });
    }
  });
  app2.post("/api/tickets", async (req, res) => {
    try {
      const validation = insertTicketSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid ticket data", errors: validation.error.errors });
      }
      const ticket = await storage.createTicket(validation.data);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });
  app2.patch("/api/tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.updateTicket(parseInt(req.params.id), req.body);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to update ticket" });
    }
  });
  app2.get("/api/knowledge-base", async (req, res) => {
    try {
      const knowledgeBase2 = await storage.getAllKnowledgeBase();
      res.json(knowledgeBase2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch knowledge base" });
    }
  });
  app2.get("/api/knowledge-base/:id", async (req, res) => {
    try {
      const kb = await storage.getKnowledgeBase(parseInt(req.params.id));
      if (!kb) {
        return res.status(404).json({ message: "Knowledge base item not found" });
      }
      res.json(kb);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch knowledge base item" });
    }
  });
  app2.post("/api/knowledge-base", async (req, res) => {
    try {
      const validation = insertKnowledgeBaseSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid knowledge base data", errors: validation.error.errors });
      }
      const kb = await storage.createKnowledgeBase(validation.data);
      res.status(201).json(kb);
    } catch (error) {
      res.status(500).json({ message: "Failed to create knowledge base item" });
    }
  });
  app2.patch("/api/knowledge-base/:id", async (req, res) => {
    try {
      const kb = await storage.updateKnowledgeBase(parseInt(req.params.id), req.body);
      if (!kb) {
        return res.status(404).json({ message: "Knowledge base item not found" });
      }
      res.json(kb);
    } catch (error) {
      res.status(500).json({ message: "Failed to update knowledge base item" });
    }
  });
  app2.get("/api/subscriptions", async (req, res) => {
    try {
      const { storeId } = req.query;
      let subscriptions2;
      if (storeId && typeof storeId === "string") {
        subscriptions2 = await storage.getSubscriptionsByStore(parseInt(storeId));
      } else {
        subscriptions2 = await storage.getAllSubscriptions();
      }
      res.json(subscriptions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });
  app2.get("/api/analytics", async (req, res) => {
    try {
      const { storeId } = req.query;
      let analytics2;
      if (storeId && typeof storeId === "string") {
        analytics2 = await storage.getAnalyticsByStore(parseInt(storeId));
      } else {
        analytics2 = await storage.getAllAnalytics();
      }
      res.json(analytics2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });
  app2.get("/api/notifications", async (req, res) => {
    try {
      const { userId } = req.query;
      let notifications2;
      if (userId && typeof userId === "string") {
        notifications2 = await storage.getNotificationsByUser(parseInt(userId));
      } else {
        notifications2 = await storage.getAllNotifications();
      }
      res.json(notifications2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      const notification = await storage.markNotificationAsRead(parseInt(req.params.id));
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5050;
  server.listen({
    port,
    host: "127.0.0.1"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
