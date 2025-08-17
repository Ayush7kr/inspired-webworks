import { useState } from "react";
import { Search, Plus, Filter, Calendar, MapPin, User, Clock, DollarSign, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const jobs = [
  {
    id: 1,
    title: "Plumbing Repair",
    client: "John Smith",
    address: "123 Main St",
    date: "2024-01-15",
    time: "09:00 AM",
    status: "in-progress",
    priority: "high",
    estimate: "$450",
    duration: "2 hours",
    description: "Fix leaking kitchen sink and replace faucet"
  },
  {
    id: 2,
    title: "Electrical Installation",
    client: "Sarah Johnson",
    address: "456 Oak Ave",
    date: "2024-01-16",
    time: "11:30 AM",
    status: "scheduled",
    priority: "medium",
    estimate: "$780",
    duration: "3 hours",
    description: "Install new electrical outlet in garage"
  },
  {
    id: 3,
    title: "HVAC Maintenance",
    client: "Mike Davis",
    address: "789 Pine Rd",
    date: "2024-01-12",
    time: "02:00 PM",
    status: "completed",
    priority: "low",
    estimate: "$320",
    duration: "1.5 hours",
    description: "Annual HVAC system inspection and filter replacement"
  },
  {
    id: 4,
    title: "General Repair",
    client: "Emily Brown",
    address: "321 Elm St",
    date: "2024-01-18",
    time: "04:30 PM",
    status: "scheduled",
    priority: "medium",
    estimate: "$235",
    duration: "1 hour",
    description: "Fix squeaky door hinges and patch wall holes"
  },
  {
    id: 5,
    title: "Electrical Repair",
    client: "Robert Wilson",
    address: "654 Cedar Dr",
    date: "2024-01-10",
    time: "10:00 AM",
    status: "completed",
    priority: "high",
    estimate: "$890",
    duration: "4 hours",
    description: "Repair electrical panel and replace circuit breakers"
  }
];

const statusColors = {
  "scheduled": "bg-secondary/10 text-secondary border-secondary/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  "completed": "bg-success/10 text-success border-success/20",
  "cancelled": "bg-danger/10 text-danger border-danger/20"
};

const priorityColors = {
  "high": "bg-danger/10 text-danger",
  "medium": "bg-warning/10 text-warning",
  "low": "bg-success/10 text-success"
};

type Priority = "all" | "high" | "medium" | "low";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority>("all");

  const filteredJobs = jobs.filter(job => {
    // Search term match
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter match
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;

    // Priority filter match
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusCounts = {
    all: jobs.length,
    scheduled: jobs.filter(j => j.status === "scheduled").length,
    "in-progress": jobs.filter(j => j.status === "in-progress").length,
    completed: jobs.filter(j => j.status === "completed").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted-foreground">Track and manage all your service jobs</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        {[
          { label: "Total Jobs", value: statusCounts.all.toString(), color: "primary" },
          { label: "Scheduled", value: statusCounts.scheduled.toString(), color: "secondary" },
          { label: "In Progress", value: statusCounts["in-progress"].toString(), color: "warning" },
          { label: "Completed", value: statusCounts.completed.toString(), color: "success" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${stat.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
                stat.color === 'secondary' ? 'border-secondary/20 hover:border-secondary/40' :
                  stat.color === 'warning' ? 'border-warning/20 hover:border-warning/40' :
                    'border-success/20 hover:border-success/40'
              }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setStatusFilter(stat.label.toLowerCase().replace(" ", "-"))}
          >
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-border p-4 animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
                {priorityFilter !== 'all' && (
                  <span className="ml-2 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    1
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filter by Priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Select a priority level.
                  </p>
                </div>
                <RadioGroup
                  value={priorityFilter}
                  onValueChange={(value: Priority) => setPriorityFilter(value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="priority-all" />
                    <Label htmlFor="priority-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="priority-high" />
                    <Label htmlFor="priority-high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="priority-medium" />
                    <Label htmlFor="priority-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="priority-low" />
                    <Label htmlFor="priority-low">Low</Label>
                  </div>
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>

        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-border p-6 transition-all duration-300 hover:scale-105 hover:shadow-medium cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                    {job.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
                    {job.priority} priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Client:</span>
                    <span className="font-medium text-foreground">{job.client}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{job.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">{job.date} at {job.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Estimate:</span>
                    <span className="font-medium text-foreground">{job.estimate}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration: {job.duration}</span>
                  </div>

                  <div className="flex space-x-2">
                    {job.status === "scheduled" && (
                      <Button size="sm" className="bg-gradient-primary hover:scale-105 transition-transform">
                        Start Job
                      </Button>
                    )}
                    {job.status === "in-progress" && (
                      <Button size="sm" className="bg-gradient-success hover:scale-105 transition-transform">
                        Complete Job
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}