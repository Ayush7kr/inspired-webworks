import { useState } from "react";
import { Search, Plus, Edit, Trash2, Settings, DollarSign, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const services = [
  {
    id: 1,
    name: "Plumbing Repair",
    category: "Plumbing",
    description: "Fix leaks, repair pipes, and general plumbing maintenance",
    basePrice: "$75/hour",
    avgDuration: "2 hours",
    popularity: 95,
    totalJobs: 156,
    revenue: "$11,700",
    rating: 4.8,
    tags: ["Emergency", "Popular"]
  },
  {
    id: 2,
    name: "Electrical Installation",
    category: "Electrical", 
    description: "Install outlets, fixtures, and electrical components",
    basePrice: "$90/hour",
    avgDuration: "3 hours",
    popularity: 87,
    totalJobs: 98,
    revenue: "$26,460",
    rating: 4.9,
    tags: ["Licensed", "High Value"]
  },
  {
    id: 3,
    name: "HVAC Maintenance",
    category: "HVAC",
    description: "Heating and cooling system inspection and maintenance",
    basePrice: "$120/hour", 
    avgDuration: "1.5 hours",
    popularity: 78,
    totalJobs: 67,
    revenue: "$12,060",
    rating: 4.7,
    tags: ["Seasonal", "Maintenance"]
  },
  {
    id: 4,
    name: "General Repair", 
    category: "General",
    description: "Various handyman services and general repairs",
    basePrice: "$60/hour",
    avgDuration: "1 hour",
    popularity: 92,
    totalJobs: 234,
    revenue: "$14,040",
    rating: 4.6,
    tags: ["Versatile", "Quick"]
  },
  {
    id: 5,
    name: "Appliance Repair",
    category: "Appliances",
    description: "Repair and service home appliances",
    basePrice: "$85/hour",
    avgDuration: "2.5 hours", 
    popularity: 73,
    totalJobs: 89,
    revenue: "$18,955",
    rating: 4.5,
    tags: ["Specialized", "Warranty"]
  }
];

const categories = ["All", "Plumbing", "Electrical", "HVAC", "General", "Appliances"];

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = services.reduce((sum, service) => 
    sum + parseFloat(service.revenue.replace("$", "").replace(",", "")), 0
  );
  const totalJobs = services.reduce((sum, service) => sum + service.totalJobs, 0);
  const avgRating = services.reduce((sum, service) => sum + service.rating, 0) / services.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Services</h1>
          <p className="text-muted-foreground">Manage your service offerings and pricing</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        {[
          { label: "Total Services", value: services.length.toString(), color: "primary", icon: Settings },
          { label: "Total Jobs", value: totalJobs.toString(), color: "secondary", icon: TrendingUp },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "success", icon: DollarSign },
          { label: "Avg Rating", value: avgRating.toFixed(1), color: "warning", icon: Star }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              stat.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
              stat.color === 'secondary' ? 'border-secondary/20 hover:border-secondary/40' :
              stat.color === 'success' ? 'border-success/20 hover:border-success/40' :
              'border-warning/20 hover:border-warning/40'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-6 h-6 ${
                stat.color === 'primary' ? 'text-primary' :
                stat.color === 'secondary' ? 'text-secondary' :
                stat.color === 'success' ? 'text-success' :
                'text-warning'
              }`} />
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            </div>
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-border p-6 transition-all duration-300 hover:scale-105 hover:shadow-medium cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedService(service)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {service.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base Price</span>
                  <span className="font-semibold text-foreground">{service.basePrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Duration</span>
                  <span className="font-semibold text-foreground">{service.avgDuration}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Jobs</span>
                  <span className="font-semibold text-foreground">{service.totalJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-semibold text-foreground">{service.revenue}</span>
                </div>
              </div>
            </div>

            {/* Popularity & Rating */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Popularity</span>
                  <span className="text-sm font-medium text-foreground">{service.popularity}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${service.popularity}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm font-medium text-foreground">{service.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>
                <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Performance */}
      <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-6">Service Performance</h3>
        
        <div className="space-y-4">
          {services
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 3)
            .map((service, index) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 transition-all duration-300 hover:bg-muted/80 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-gradient-success' :
                    index === 1 ? 'bg-gradient-warning' :
                    'bg-gradient-secondary'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.totalJobs} jobs completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{service.revenue}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{service.rating}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}