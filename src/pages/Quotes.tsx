import { useState } from "react";
import { Search, Plus, Filter, Eye, Edit, Send, DollarSign, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quotes = [
  {
    id: 1,
    number: "Q-2024-001",
    client: "John Smith",
    service: "Plumbing Repair",
    amount: "$450.00",
    date: "2024-01-15",
    validUntil: "2024-02-15",
    status: "pending",
    description: "Kitchen sink repair and faucet replacement"
  },
  {
    id: 2,
    number: "Q-2024-002", 
    client: "Sarah Johnson",
    service: "Electrical Installation",
    amount: "$780.00",
    date: "2024-01-14",
    validUntil: "2024-02-14",
    status: "accepted",
    description: "Garage electrical outlet installation"
  },
  {
    id: 3,
    number: "Q-2024-003",
    client: "Mike Davis",
    service: "HVAC Maintenance", 
    amount: "$320.00",
    date: "2024-01-13",
    validUntil: "2024-02-13",
    status: "rejected",
    description: "Annual HVAC system inspection"
  },
  {
    id: 4,
    number: "Q-2024-004",
    client: "Emily Brown",
    service: "General Repair",
    amount: "$235.00", 
    date: "2024-01-12",
    validUntil: "2024-02-12",
    status: "sent",
    description: "Door repair and wall patching"
  },
  {
    id: 5,
    number: "Q-2024-005",
    client: "Robert Wilson",
    service: "Electrical Repair",
    amount: "$890.00",
    date: "2024-01-11",
    validUntil: "2024-02-11", 
    status: "draft",
    description: "Electrical panel upgrade"
  }
];

const statusColors = {
  "draft": "bg-muted text-muted-foreground",
  "sent": "bg-secondary/10 text-secondary",
  "pending": "bg-warning/10 text-warning",
  "accepted": "bg-success/10 text-success",
  "rejected": "bg-danger/10 text-danger"
};

export default function Quotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: quotes.length,
    draft: quotes.filter(q => q.status === "draft").length,
    sent: quotes.filter(q => q.status === "sent").length,
    pending: quotes.filter(q => q.status === "pending").length,
    accepted: quotes.filter(q => q.status === "accepted").length,
    rejected: quotes.filter(q => q.status === "rejected").length
  };

  const totalValue = quotes
    .filter(q => q.status === "accepted")
    .reduce((sum, q) => sum + parseFloat(q.amount.replace("$", "").replace(",", "")), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quotes</h1>
          <p className="text-muted-foreground">Create and manage service quotes</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          New Quote
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        {[
          { label: "Total Quotes", value: statusCounts.all.toString(), color: "primary" },
          { label: "Pending", value: statusCounts.pending.toString(), color: "warning" },
          { label: "Accepted", value: statusCounts.accepted.toString(), color: "success" },
          { label: "Total Value", value: `$${totalValue.toLocaleString()}`, color: "secondary" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              stat.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
              stat.color === 'warning' ? 'border-warning/20 hover:border-warning/40' :
              stat.color === 'success' ? 'border-success/20 hover:border-success/40' :
              'border-secondary/20 hover:border-secondary/40'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
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
              placeholder="Search quotes..."
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Quote #</th>
                <th className="text-left p-4 font-medium text-foreground">Client</th>
                <th className="text-left p-4 font-medium text-foreground">Service</th>
                <th className="text-left p-4 font-medium text-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Valid Until</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote, index) => (
                <tr
                  key={quote.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{quote.number}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{quote.client}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{quote.service}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-48">{quote.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{quote.amount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{quote.date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{quote.validUntil}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {quote.status === "draft" && (
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Send">
                          <Send className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {[
          {
            title: "Create Quote Template",
            description: "Save time with reusable quote templates",
            icon: FileText,
            color: "primary",
            action: "Create Template"
          },
          {
            title: "Quote Analytics",
            description: "View acceptance rates and performance",
            icon: DollarSign,
            color: "success",
            action: "View Analytics"
          },
          {
            title: "Follow-up Reminders",
            description: "Set automatic follow-up reminders",
            icon: Calendar,
            color: "warning",
            action: "Set Reminders"
          }
        ].map((item, index) => (
          <div
            key={item.title}
            className={`p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-medium ${
              item.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
              item.color === 'success' ? 'border-success/20 hover:border-success/40' :
              'border-warning/20 hover:border-warning/40'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-lg ${
                item.color === 'primary' ? 'bg-primary/10' :
                item.color === 'success' ? 'bg-success/10' :
                'bg-warning/10'
              }`}>
                <item.icon className={`w-6 h-6 ${
                  item.color === 'primary' ? 'text-primary' :
                  item.color === 'success' ? 'text-success' :
                  'text-warning'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:scale-105 transition-transform"
            >
              {item.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}