import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Send,
  Filter
} from "lucide-react";

export default function Feedback() {
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const { data: aiReplies, isLoading } = useQuery({
    queryKey: ["/api/ai-replies"],
  });

  // Mock feedback data
  const mockFeedback = [
    {
      id: 1,
      reply: "Sure, I'll get right on that for you!",
      rating: 5,
      feedback: "Very helpful and quick response",
      approved: true,
      createdAt: new Date(Date.now() - 6 * 60 * 1000)
    },
    {
      id: 2,
      reply: "Can I help you with anything else?",
      rating: 4,
      feedback: "Good response but could be more personalized",
      approved: true,
      createdAt: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
      id: 3,
      reply: "Thank you for your patience.",
      rating: 3,
      feedback: "Too generic, needs more context",
      approved: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      reply: "I'd like to know more about this issue.",
      rating: 2,
      feedback: "Doesn't address the customer's concern properly",
      approved: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const feedbackData = mockFeedback;
  const averageRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
  const approvalRate = (feedbackData.filter(item => item.approved).length / feedbackData.length) * 100;

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate?.(star)}
            className={`w-5 h-5 transition-colors duration-200 ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-muted-foreground dark:text-muted-foreground'
            } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
            disabled={!interactive}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border-0">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Feedback Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
              <p className="text-muted-foreground text-sm">Average Rating</p>
              <div className="mt-1">{renderStars(Math.round(averageRating))}</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{approvalRate.toFixed(1)}%</p>
              <p className="text-muted-foreground text-sm">Approval Rate</p>
              <div className="text-green-500 text-sm mt-1">+5.2% this week</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{feedbackData.length}</p>
              <p className="text-muted-foreground text-sm">Total Feedback</p>
              <div className="text-blue-500 text-sm mt-1">+12 this week</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 rounded-3xl border-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">AI Feedback Reviews</h2>
                <Button variant="outline" size="sm" className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="glass-card border-0 bg-white/60 backdrop-blur-sm">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {feedbackData.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="glass-card p-4 rounded-3xl border-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-foreground font-medium mb-2">"{item.reply}"</p>
                          <div className="flex items-center space-x-3 mb-2">
                            {renderStars(item.rating)}
                            <Badge 
                              className={`${
                                item.approved 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              } border-0`}
                            >
                              {item.approved ? 'Approved' : 'Pending'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.feedback}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.createdAt.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                {feedbackData.filter(item => item.approved).map((item, index) => (
                  <div 
                    key={item.id} 
                    className="glass-card p-4 rounded-3xl border-0 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-foreground font-medium mb-2">"{item.reply}"</p>
                          <div className="flex items-center space-x-3 mb-2">
                            {renderStars(item.rating)}
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                              Approved
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.feedback}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.createdAt.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {feedbackData.filter(item => !item.approved).map((item, index) => (
                  <div 
                    key={item.id} 
                    className="glass-card p-4 rounded-3xl border-0 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-foreground font-medium mb-2">"{item.reply}"</p>
                          <div className="flex items-center space-x-3 mb-2">
                            {renderStars(item.rating)}
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-0">
                              Pending
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.feedback}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.createdAt.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Add Feedback Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border-0">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add New Feedback</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">AI Reply</Label>
                <Textarea
                  placeholder="Enter the AI reply to review..."
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-foreground">Rating</Label>
                <div className="mt-2">
                  {renderStars(selectedRating, true, setSelectedRating)}
                </div>
              </div>
              <div>
                <Label className="text-foreground">Feedback</Label>
                <Textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Enter your feedback..."
                  className="glass-card border-0 bg-white/60 backdrop-blur-sm"
                  rows={3}
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => {
                  // Handle feedback submission
                  setNewFeedback("");
                  setSelectedRating(0);
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border-0">
            <h3 className="text-lg font-semibold text-foreground mb-4">Feedback Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Positive Feedback</span>
                <span className="text-green-600 font-semibold">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Neutral Feedback</span>
                <span className="text-yellow-600 font-semibold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Negative Feedback</span>
                <span className="text-red-600 font-semibold">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
