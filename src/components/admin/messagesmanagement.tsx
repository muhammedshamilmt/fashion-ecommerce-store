'use client'

import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Search, 
  Trash2, 
  MailOpen, 
  Mail, 
  CheckCircle, 
  Filter,
  X,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  _id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

const MessageManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messageView, setMessageView] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch messages
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set('search', searchTerm);
      if (filterStatus !== 'all') queryParams.set('status', filterStatus);

      const response = await fetch(`/api/messages?${queryParams}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch messages");
      }

      if (result.success) {
        setMessages(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch messages");
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages on mount and when filters change
  useEffect(() => {
    fetchMessages();
  }, [searchTerm, filterStatus]);
  
  // Mark messages as read
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          read: true
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update message");
      }

      if (result.success) {
        setMessages(messages.map(message => 
          message._id === id ? { ...message, read: true } : message
        ));
        toast.success("Message marked as read");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update message");
      console.error("Error updating message:", error);
    }
  };
  
  // Mark messages as unread
  const markAsUnread = async (id: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          read: false
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update message");
      }

      if (result.success) {
        setMessages(messages.map(message => 
          message._id === id ? { ...message, read: false } : message
        ));
        toast.success("Message marked as unread");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update message");
      console.error("Error updating message:", error);
    }
  };
  
  // Delete message
  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete message");
      }

      if (result.success) {
        setMessages(messages.filter(message => message._id !== id));
        toast.success("Message deleted successfully");
        if (messageView === id) {
          setMessageView(null);
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete message");
      console.error("Error deleting message:", error);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      // Handle MongoDB date format
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  
  // Handle message view
  const viewMessage = (id: string) => {
    setMessageView(id === messageView ? null : id);
    // Mark as read when opening
    if (id !== messageView) {
      markAsRead(id);
    }
  };
  
  // Get message priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
      default:
        return null;
    }
  };
  
  const currentMessage = messageView ? messages.find(m => m._id === messageView) : null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Messages</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("read")}>
                Read Messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("unread")}>
                Unread Messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className={`grid ${messageView ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
        <div>
          <div className="bg-white rounded-md shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 animate-spin text-fashion-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : messages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  messages.map((message) => (
                    <TableRow 
                      key={message._id}
                      className={`cursor-pointer ${messageView === message._id ? "bg-fashion-light" : ""} ${!message.read ? "font-semibold" : ""}`}
                      onClick={() => viewMessage(message._id)}
                    >
                      <TableCell className="font-medium">{message.sender}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {!message.read && (
                            <div className="w-2 h-2 rounded-full bg-fashion-primary mr-2"></div>
                          )}
                          <span>{message.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatDate(message.date)}</TableCell>
                      <TableCell className="text-center">
                        {getPriorityBadge(message.priority)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {message.read ? (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                markAsUnread(message._id);
                              }}>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Mark as unread</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(message._id);
                              }}>
                                <MailOpen className="mr-2 h-4 w-4" />
                                <span>Mark as read</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message._id);
                            }} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {messageView && currentMessage && (
          <div className="bg-white p-6 rounded-md shadow h-fit">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentMessage.subject}</h3>
                <div className="flex items-center mt-1 text-gray-600 text-sm">
                  <span>From: {currentMessage.sender} &lt;{currentMessage.email}&gt;</span>
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  {formatDate(currentMessage.date)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(currentMessage.priority)}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMessage(currentMessage._id)}
                  className="text-red-600"
                  aria-label="Delete message"
                >
                  <Trash2 size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMessageView(null)}
                  aria-label="Close message"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-gray-800 whitespace-pre-wrap">{currentMessage.message}</p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <Button className="w-full">
                Reply to Message
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManagement;