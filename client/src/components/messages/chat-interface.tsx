import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@shared/schema";
import { Send, MessageSquare, Instagram, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/hooks/use-language";

interface ChatInterfaceProps {
  selectedMessage?: Message;
}

interface ChatMessage {
  id: number;
  content: string;
  time: string;
  sender: 'user' | 'admin';
}

export function ChatInterface({ selectedMessage }: ChatInterfaceProps) {
  const { t, language } = useLanguage();
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    language === 'ar'
      ? [
          {
            id: 1,
            content: "مرحبًا أحمد، أريد معرفة تفاصيل المنتج.",
            time: "١١:٥٠ ص",
            sender: "user"
          },
          {
            id: 2,
            content: "بكل سرور! سأرسل لك التفاصيل الآن.",
            time: "١١:٥٢ ص",
            sender: "admin"
          },
          {
            id: 3,
            content: "شكرًا! هل يمكنك تأكيد الحجز؟",
            time: "١١:٥٥ ص",
            sender: "user"
          }
        ]
      : [
          {
            id: 1,
            content: "Hi Ahmed, I'd like to get information about your product.",
            time: "11:50 AM",
            sender: "user"
          },
          {
            id: 2,
            content: "Certainly! I'll provide you with the details.",
            time: "11:52 AM",
            sender: "admin"
          },
          {
            id: 3,
            content: "Thanks! Can you confirm the booking?",
            time: "11:55 AM",
            sender: "user"
          }
        ]
  );

  const getPlatformIcon = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'whatsapp':
        return <SiWhatsapp className="w-5 h-5 text-green-500" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-purple-500" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPlatformColor = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'whatsapp':
        return 'bg-green-500';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'facebook':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: chatMessages.length + 1,
      content: newMessage,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sender: "admin"
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!selectedMessage) {
    return (
      <div className="glass-card border-0 flex items-center justify-center h-96">
        <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">{t("select_message_to_start_chatting")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card border-0 h-full">
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className={`w-10 h-10 ${getPlatformColor(selectedMessage.platform)} rounded-full flex items-center justify-center`}>
            {getPlatformIcon(selectedMessage.platform)}
          </div>
          <div>
            <h4 className="text-foreground font-medium capitalize">{selectedMessage.platform}</h4>
            <span className="text-xs text-muted-foreground">
              {new Date(selectedMessage.createdAt).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-0">
        <div className="h-80 overflow-y-auto px-6 py-4 space-y-4">
          {chatMessages.map((message, index) => (
            <div
              key={message.id}
              className={`animate-slide-in ${
                message.sender === 'user' 
                  ? 'flex justify-start' 
                  : 'flex justify-end'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[#A259FF] to-[#FF66C4] text-white rounded-br-none'
                    : 'bg-white/60 dark:bg-gray-800/60 text-foreground dark:text-gray-200 rounded-bl-none backdrop-blur-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <Input
            placeholder={language === 'ar' ? 'اكتب رسالة...' : t("type_a_message")}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 glass-card rounded-xl border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <Button 
            onClick={handleSendMessage}
                            className="bg-gradient-to-r from-[#A259FF] to-[#FF66C4] hover:from-[#8B4DFF] hover:to-[#FF4DB8] text-white p-2 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
