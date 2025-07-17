import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertStoreSchema, insertMessageSchema, insertAiReplySchema, insertTicketSchema, insertKnowledgeBaseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
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

  app.post("/api/users", async (req, res) => {
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

  // Stores routes
  app.get("/api/stores", async (req, res) => {
    try {
      const { status } = req.query;
      let stores;
      
      if (status && typeof status === "string") {
        stores = await storage.getStoresByStatus(status);
      } else {
        stores = await storage.getAllStores();
      }
      
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  app.get("/api/stores/:id", async (req, res) => {
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

  app.post("/api/stores", async (req, res) => {
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

  app.patch("/api/stores/:id", async (req, res) => {
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

  // Messages routes
  app.get("/api/messages", async (req, res) => {
    try {
      const { storeId, platform, type } = req.query;
      let messages;
      
      if (storeId && typeof storeId === "string") {
        messages = await storage.getMessagesByStore(parseInt(storeId));
      } else if (platform && typeof platform === "string") {
        messages = await storage.getMessagesByPlatform(platform);
      } else if (type && typeof type === "string") {
        messages = await storage.getMessagesByType(type);
      } else {
        messages = await storage.getAllMessages();
      }
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/:id", async (req, res) => {
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

  app.post("/api/messages", async (req, res) => {
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

  // AI Replies routes
  app.get("/api/ai-replies", async (req, res) => {
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

  app.post("/api/ai-replies", async (req, res) => {
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

  app.patch("/api/ai-replies/:id", async (req, res) => {
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

  // Tickets routes
  app.get("/api/tickets", async (req, res) => {
    try {
      const { status } = req.query;
      let tickets;
      
      if (status && typeof status === "string") {
        tickets = await storage.getTicketsByStatus(status);
      } else {
        tickets = await storage.getAllTickets();
      }
      
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });

  app.get("/api/tickets/:id", async (req, res) => {
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

  app.post("/api/tickets", async (req, res) => {
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

  app.patch("/api/tickets/:id", async (req, res) => {
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

  // Knowledge Base routes
  app.get("/api/knowledge-base", async (req, res) => {
    try {
      const knowledgeBase = await storage.getAllKnowledgeBase();
      res.json(knowledgeBase);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch knowledge base" });
    }
  });

  app.get("/api/knowledge-base/:id", async (req, res) => {
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

  app.post("/api/knowledge-base", async (req, res) => {
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

  app.patch("/api/knowledge-base/:id", async (req, res) => {
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

  // Subscriptions routes
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const { storeId } = req.query;
      let subscriptions;
      
      if (storeId && typeof storeId === "string") {
        subscriptions = await storage.getSubscriptionsByStore(parseInt(storeId));
      } else {
        subscriptions = await storage.getAllSubscriptions();
      }
      
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  // Analytics routes
  app.get("/api/analytics", async (req, res) => {
    try {
      const { storeId } = req.query;
      let analytics;
      
      if (storeId && typeof storeId === "string") {
        analytics = await storage.getAnalyticsByStore(parseInt(storeId));
      } else {
        analytics = await storage.getAllAnalytics();
      }
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Notifications routes
  app.get("/api/notifications", async (req, res) => {
    try {
      const { userId } = req.query;
      let notifications;
      
      if (userId && typeof userId === "string") {
        notifications = await storage.getNotificationsByUser(parseInt(userId));
      } else {
        notifications = await storage.getAllNotifications();
      }
      
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
