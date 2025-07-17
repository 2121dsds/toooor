import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageList } from "@/components/messages/message-list";
import { ChatInterface } from "@/components/messages/chat-interface";
import { Message } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | undefined>();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["/api/messages"],
  });

  // بيانات وهمية للعرض فقط إذا لم توجد بيانات من الـAPI
  const mockMessages = [
    {
      id: 1,
      storeId: 101,
      platform: "whatsapp",
      senderId: "user1",
      senderName: "أحمد محمد",
      content: "مرحبًا، أريد معرفة تفاصيل المنتج.",
      messageType: "promotional",
      isAiReply: false,
      sentiment: null,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 2,
      storeId: 101,
      platform: "whatsapp",
      senderId: "admin1",
      senderName: "الدعم الفني",
      content: "مرحبًا بك! المنتج متوفر ويمكنك طلبه الآن.",
      messageType: "other",
      isAiReply: true,
      sentiment: null,
      createdAt: new Date(Date.now() - 59 * 60 * 1000),
    },
    {
      id: 3,
      storeId: 102,
      platform: "instagram",
      senderId: "user2",
      senderName: "Sarah Ali",
      content: "Hi, is there a discount on this item?",
      messageType: "promotional",
      isAiReply: false,
      sentiment: null,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 4,
      storeId: 102,
      platform: "instagram",
      senderId: "admin2",
      senderName: "Support Team",
      content: "Yes, there is a 10% discount this week!",
      messageType: "other",
      isAiReply: true,
      sentiment: null,
      createdAt: new Date(Date.now() - 29 * 60 * 1000),
    },
    {
      id: 5,
      storeId: 103,
      platform: "facebook",
      senderId: "user3",
      senderName: "محمد عبد الله",
      content: "المنتج وصل متأخر جدًا!",
      messageType: "spam",
      isAiReply: false,
      sentiment: null,
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: 6,
      storeId: 103,
      platform: "facebook",
      senderId: "admin3",
      senderName: "خدمة العملاء",
      content: "نعتذر عن التأخير، سنعوضك في الطلب القادم.",
      messageType: "other",
      isAiReply: true,
      sentiment: null,
      createdAt: new Date(Date.now() - 9 * 60 * 1000),
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="glass-card p-6 rounded-3xl border-0">
          <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="glass-card p-6 rounded-3xl border-0 h-full">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="glass-card p-6 rounded-3xl border-0">
        <MessageList 
          messages={Array.isArray(messages) && messages.length > 0 ? messages : mockMessages}
          onSelectMessage={setSelectedMessage}
          selectedMessage={selectedMessage}
        />
      </div>
      <div className="lg:col-span-2">
        <div className="glass-card p-6 rounded-3xl border-0 h-full">
          <ChatInterface selectedMessage={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
