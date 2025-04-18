
import { 
  AlertCircle, 
  Archive, 
  Calendar, 
  Clock, 
  Mail, 
  MessageSquare, 
  Tag, 
  Trash2 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardView = () => {
  // Mock data for demonstration
  const stats = [
    { title: "Total Emails", value: 258, icon: Mail, color: "bg-blue-100 text-blue-700" },
    { title: "Urgent Actions", value: 12, icon: AlertCircle, color: "bg-red-100 text-red-700" },
    { title: "Meetings Today", value: 3, icon: Calendar, color: "bg-green-100 text-green-700" },
    { title: "Follow-ups", value: 24, icon: MessageSquare, color: "bg-purple-100 text-purple-700" },
  ];

  const emailCategories = [
    { category: "Inbox", count: 124, icon: Mail, color: "text-blue-500" },
    { category: "Archived", count: 89, icon: Archive, color: "text-green-500" },
    { category: "Tagged", count: 45, icon: Tag, color: "text-amber-500" },
    { category: "Deleted", count: 13, icon: Trash2, color: "text-red-500" },
  ];
  
  const aiInsights = [
    "5 emails require urgent attention",
    "3 meeting requests need responses by 5pm today",
    "Follow up with Acme Corp about project timeline",
    "Summarize monthly report for leadership",
  ];
  
  const priorityTasks = [
    { 
      task: "Respond to client proposal", 
      sender: "Jessica Chen", 
      time: "1 hour ago", 
      priority: "high" 
    },
    { 
      task: "Schedule team meeting", 
      sender: "Marcus Lee", 
      time: "3 hours ago", 
      priority: "medium" 
    },
    { 
      task: "Approve budget request", 
      sender: "Finance Dept", 
      time: "Yesterday", 
      priority: "high" 
    },
    { 
      task: "Review project timeline", 
      sender: "David Kim", 
      time: "2 days ago", 
      priority: "low" 
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Email analytics and AI insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className={`${stat.color} p-3 rounded-full mr-4`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Email Categories */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Email Categories</CardTitle>
            <CardDescription>Distribution across folders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailCategories.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <item.icon size={16} className={item.color} />
                    <span className="ml-2 text-sm font-medium">{item.category}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.count}</span>
                </div>
                <Progress value={(item.count / 150) * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Automated recommendations</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-purple-100 text-purple-700 p-1.5 rounded-full mr-3">
                    <AlertCircle size={16} />
                  </span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Priority Tasks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Priority Tasks</CardTitle>
            <CardDescription>AI-extracted action items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityTasks.map((task, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-md p-3 border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{task.task}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{task.sender}</span>
                      <span className="mx-1">•</span>
                      <Clock size={12} className="mr-1" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                  <span 
                    className={`ml-3 w-2 h-2 rounded-full ${
                      task.priority === "high" ? "bg-red-500" : 
                      task.priority === "medium" ? "bg-amber-500" : "bg-green-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
