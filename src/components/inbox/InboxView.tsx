
import { useState } from "react";
import { 
  Archive, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  RefreshCcw, 
  Trash2, 
  Star,
  StarOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import EmailView from "../email/EmailView";

// Sample email data
const emailData = [
  {
    id: "1",
    unread: true,
    starred: false,
    sender: "Jessica Chen",
    senderEmail: "jessica@acmecorp.com",
    subject: "Project Proposal Review - Urgent Action Required",
    preview: "Hi there, I'm writing to request your review of the attached proposal by EOD today. The client is eager to...",
    date: "10:34 AM",
    tags: ["urgent"],
    aiSummary: "Jessica needs your review of the project proposal by end of day. Client expects feedback tomorrow.",
    actionItems: ["Review proposal", "Provide feedback by EOD"],
  },
  {
    id: "2",
    unread: true,
    starred: true,
    sender: "Marcus Lee",
    senderEmail: "m.lee@techstart.io",
    subject: "Scheduling Team Meeting - Response Needed",
    preview: "Let's schedule a meeting to discuss our quarterly goals. I'm available on Monday at 2pm or Tuesday at 10am...",
    date: "Yesterday",
    tags: ["meeting"],
    aiSummary: "Marcus wants to schedule a team meeting. He's proposed two options: Monday at 2pm or Tuesday at 10am.",
    actionItems: ["Pick a meeting time", "Prepare quarterly goals update"],
  },
  {
    id: "3",
    unread: false,
    starred: false,
    sender: "Finance Department",
    senderEmail: "finance@yourcompany.com",
    subject: "Budget Approval Request for Q2",
    preview: "Please review and approve the attached budget for the upcoming quarter. We need your approval to proceed with...",
    date: "Apr 12",
    tags: ["approval"],
    aiSummary: "Finance team needs your approval on the Q2 budget to proceed with planned expenditures.",
    actionItems: ["Review Q2 budget", "Approve or request changes"],
  },
  {
    id: "4",
    unread: false,
    starred: true,
    sender: "David Kim",
    senderEmail: "david@projectx.org",
    subject: "Project Timeline Updates and Next Steps",
    preview: "Based on our last meeting, I've updated the project timeline. Please take a look and let me know if you...",
    date: "Apr 11",
    tags: ["follow"],
    aiSummary: "David has updated the project timeline following your recent meeting and requires your feedback.",
    actionItems: ["Review updated timeline", "Reply with feedback or approval"],
  },
  {
    id: "5",
    unread: false,
    starred: false,
    sender: "HR Department",
    senderEmail: "hr@yourcompany.com",
    subject: "Important Company Policy Updates",
    preview: "We've made some updates to our company policies that will take effect next month. Please review the attached...",
    date: "Apr 10",
    tags: ["info"],
    aiSummary: "HR has updated company policies effective next month. Review required but no immediate action needed.",
    actionItems: ["Read policy updates", "Note effective date"],
  },
];

const InboxView = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState<typeof emailData[0] | null>(null);
  const [emailList, setEmailList] = useState(emailData);
  
  const handleSelectEmail = (email: typeof emailData[0]) => {
    setSelectedEmail(email);
    if (email.unread) {
      setEmailList(emails => 
        emails.map(e => e.id === email.id ? { ...e, unread: false } : e)
      );
    }
  };
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(emailList.map(email => email.id));
    } else {
      setSelectedEmails([]);
    }
  };
  
  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEmails([...selectedEmails, id]);
    } else {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    }
  };
  
  const handleToggleStar = (id: string) => {
    setEmailList(emails =>
      emails.map(e => e.id === id ? { ...e, starred: !e.starred } : e)
    );
  };
  
  const handleArchiveSelected = () => {
    setEmailList(emails => emails.filter(email => !selectedEmails.includes(email.id)));
    setSelectedEmails([]);
  };

  const filteredEmails = selectedTab === "all" 
    ? emailList 
    : selectedTab === "unread" 
      ? emailList.filter(e => e.unread)
      : emailList.filter(e => e.starred);
  
  return (
    <div className="flex flex-col h-full">
      {!selectedEmail ? (
        <>
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedEmails.length === emailList.length} 
                  onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                />
                
                {selectedEmails.length > 0 ? (
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleArchiveSelected}>
                      <Archive size={16} className="mr-1" />
                      Archive
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                    <span className="text-sm text-gray-500">
                      {selectedEmails.length} selected
                    </span>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm">
                    <RefreshCcw size={16} className="mr-1" />
                    Refresh
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Filter size={16} className="mr-1" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                    <DropdownMenuItem>Sort by</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>AI analyze inbox</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-auto">
            {filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <Clock size={32} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-medium mb-1">No emails found</h3>
                <p className="text-gray-500 mb-4">Your {selectedTab} inbox is empty</p>
                <Button>Refresh Inbox</Button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredEmails.map((email) => (
                  <li 
                    key={email.id}
                    className={`email-list-item ${email.unread ? 'unread' : 'read'}`}
                    onClick={() => handleSelectEmail(email)}
                  >
                    <div className="flex items-center px-4 py-3">
                      <div className="flex items-center mr-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedEmails.includes(email.id)}
                          onCheckedChange={(checked) => handleSelect(email.id, !!checked)}
                        />
                      </div>
                      
                      <button 
                        className="mr-3 text-gray-400 hover:text-amber-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(email.id);
                        }}
                      >
                        {email.starred ? (
                          <Star size={18} className="fill-amber-400 text-amber-400" />
                        ) : (
                          <StarOff size={18} />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h3 className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'}`}>
                            {email.sender}
                          </h3>
                          <span className="text-xs text-gray-500">{email.date}</span>
                        </div>
                        
                        <h4 className={`text-sm mb-0.5 ${email.unread ? 'font-medium' : ''}`}>
                          {email.subject}
                        </h4>
                        
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                        </div>
                        
                        <div className="flex mt-1.5 space-x-1">
                          {email.tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tag}`}>
                              {tag === "urgent" ? "Urgent" : 
                               tag === "meeting" ? "Meeting" :
                               tag === "follow" ? "Follow Up" :
                               tag === "approval" ? "Approval" : "Information"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <EmailView 
          email={selectedEmail} 
          onBack={() => setSelectedEmail(null)} 
          onToggleStar={() => handleToggleStar(selectedEmail.id)}
        />
      )}
    </div>
  );
};

export default InboxView;
