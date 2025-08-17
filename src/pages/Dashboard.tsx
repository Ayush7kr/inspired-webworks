import { Activity, Users, Briefcase, FileText, MapPin, Calendar as CalendarIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import MiniChart from "@/components/dashboard/MiniChart";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Jobs",
      value: "43.7k",
      change: "+12.2%",
      trend: "up" as const,
      color: "success" as const,
      icon: <Activity className="w-5 h-5 text-success" />,
      chart: <MiniChart data={[20, 35, 25, 40, 30, 45, 35]} color="success" />
    },
    {
      title: "Jobs In Progress", 
      value: "92.3k",
      change: "-31.1%",
      trend: "down" as const,
      color: "warning" as const,
      icon: <Briefcase className="w-5 h-5 text-warning" />,
      chart: <MiniChart data={[45, 30, 35, 25, 20, 15, 25]} color="warning" />
    },
    {
      title: "Finished Jobs",
      value: "66.3k", 
      change: "+3.3%",
      trend: "up" as const,
      color: "success" as const,
      icon: <FileText className="w-5 h-5 text-success" />,
      chart: <MiniChart data={[25, 30, 35, 40, 45, 42, 48]} color="success" />
    },
    {
      title: "New Leads",
      value: "92.3k",
      change: "+31.1%", 
      trend: "up" as const,
      color: "secondary" as const,
      icon: <Users className="w-5 h-5 text-secondary" />,
      chart: <MiniChart data={[15, 25, 35, 45, 40, 50, 55]} color="secondary" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-secondary/20">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, Julie 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what you need to focus on today
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 0.1}s` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <div className="flex space-x-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { client: "John Smith", job: "Plumbing Repair", status: "In Progress", time: "2 hours ago" },
              { client: "Sarah Johnson", job: "Electrical Installation", status: "Completed", time: "4 hours ago" },
              { client: "Mike Davis", job: "HVAC Maintenance", status: "Scheduled", time: "6 hours ago" },
              { client: "Emily Brown", job: "General Repair", status: "Quote Sent", time: "1 day ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {activity.client.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.client}</p>
                    <p className="text-sm text-muted-foreground">{activity.job}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'Completed' ? 'bg-success/10 text-success' :
                    activity.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                    activity.status === 'Scheduled' ? 'bg-secondary/10 text-secondary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {activity.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "New Job", icon: Briefcase, color: "primary" },
              { title: "Add Client", icon: Users, color: "secondary" },
              { title: "Create Quote", icon: FileText, color: "warning" },
              { title: "Schedule", icon: CalendarIcon, color: "success" }
            ].map((action, index) => (
              <button
                key={action.title}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-medium group ${
                  action.color === 'primary' ? 'border-primary/20 hover:border-primary/40 hover:bg-primary/5' :
                  action.color === 'secondary' ? 'border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5' :
                  action.color === 'warning' ? 'border-warning/20 hover:border-warning/40 hover:bg-warning/5' :
                  'border-success/20 hover:border-success/40 hover:bg-success/5'
                }`}
              >
                <action.icon className={`w-8 h-8 mb-2 mx-auto group-hover:scale-110 transition-transform ${
                  action.color === 'primary' ? 'text-primary' :
                  action.color === 'secondary' ? 'text-secondary' :
                  action.color === 'warning' ? 'text-warning' :
                  'text-success'
                }`} />
                <p className="text-sm font-medium text-foreground">{action.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}