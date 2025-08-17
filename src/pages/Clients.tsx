import { useState } from "react";
import { Search, Plus, Phone, Mail, MapPin, Calendar, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City, ST 12345",
    lastJob: "2024-01-15",
    totalJobs: 12,
    totalSpent: "$2,450",
    status: "active",
    avatar: "JS"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com", 
    phone: "(555) 234-5678",
    address: "456 Oak Ave, City, ST 12345",
    lastJob: "2024-01-10",
    totalJobs: 8,
    totalSpent: "$1,890",
    status: "active",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "(555) 345-6789", 
    address: "789 Pine Rd, City, ST 12345",
    lastJob: "2024-01-08",
    totalJobs: 15,
    totalSpent: "$3,120",
    status: "inactive",
    avatar: "MD"
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@email.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, City, ST 12345", 
    lastJob: "2024-01-20",
    totalJobs: 5,
    totalSpent: "$945",
    status: "active",
    avatar: "EB"
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@email.com",
    phone: "(555) 567-8901",
    address: "654 Cedar Dr, City, ST 12345",
    lastJob: "2024-01-05",
    totalJobs: 20,
    totalSpent: "$4,280",
    status: "active", 
    avatar: "RW"
  }
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-border p-4 animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-primary text-white" : "hover:bg-muted"
            }`}
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
            </div>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-primary text-white" : "hover:bg-muted"
            }`}
          >
            <div className="w-4 h-4 space-y-1">
              <div className="h-0.5 bg-current rounded" />
              <div className="h-0.5 bg-current rounded" />
              <div className="h-0.5 bg-current rounded" />
            </div>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        {[
          { label: "Total Clients", value: clients.length.toString(), color: "primary" },
          { label: "Active Clients", value: clients.filter(c => c.status === "active").length.toString(), color: "success" },
          { label: "Total Revenue", value: "$12,685", color: "warning" },
          { label: "Avg. Job Value", value: "$423", color: "secondary" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              stat.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
              stat.color === 'success' ? 'border-success/20 hover:border-success/40' :
              stat.color === 'warning' ? 'border-warning/20 hover:border-warning/40' :
              'border-secondary/20 hover:border-secondary/40'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Clients Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-border p-6 transition-all duration-300 hover:scale-105 hover:shadow-medium cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-medium">{client.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{client.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{client.totalJobs}</p>
                    <p className="text-xs text-muted-foreground">Total Jobs</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{client.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Client</th>
                  <th className="text-left p-4 font-medium text-foreground">Contact</th>
                  <th className="text-left p-4 font-medium text-foreground">Last Job</th>
                  <th className="text-left p-4 font-medium text-foreground">Total Jobs</th>
                  <th className="text-left p-4 font-medium text-foreground">Total Spent</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr
                    key={client.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedClient(client)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{client.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-48">{client.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">{client.email}</p>
                        <p className="text-sm text-muted-foreground">{client.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{client.lastJob}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground">{client.totalJobs}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground">{client.totalSpent}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}