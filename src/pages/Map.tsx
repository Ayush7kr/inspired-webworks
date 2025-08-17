import { useState } from "react";
import { MapPin, Navigation, Search, Filter, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const locations = [
  { id: 1, name: "John Smith", address: "123 Main St", status: "active", time: "09:00 AM", phone: "(555) 123-4567", service: "Plumbing Repair" },
  { id: 2, name: "Sarah Johnson", address: "456 Oak Ave", status: "completed", time: "11:30 AM", phone: "(555) 234-5678", service: "Electrical Installation" },
  { id: 3, name: "Mike Davis", address: "789 Pine Rd", status: "scheduled", time: "02:00 PM", phone: "(555) 345-6789", service: "HVAC Maintenance" },
  { id: 4, name: "Emily Brown", address: "321 Elm St", status: "active", time: "04:30 PM", phone: "(555) 456-7890", service: "General Repair" },
  { id: 5, name: "Robert Wilson", address: "654 Cedar Dr", status: "scheduled", time: "10:00 AM", phone: "(555) 567-8901", service: "Electrical Repair" },
];

const statusColors = {
  active: "bg-warning text-warning-foreground",
  completed: "bg-success text-success-foreground", 
  scheduled: "bg-secondary text-secondary-foreground",
};

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Map View</h1>
          <p className="text-muted-foreground">Track jobs and navigate to locations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary hover:scale-105 transition-transform">
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Service Locations</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          {/* Simulated Map */}
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40" />
            
            {/* Map Pins */}
            {filteredLocations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 ${
                  selectedLocation?.id === location.id ? 'scale-125 z-10' : ''
                }`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                }}
              >
                <div className={`relative ${
                  location.status === 'active' ? 'text-warning' :
                  location.status === 'completed' ? 'text-success' :
                  'text-secondary'
                }`}>
                  <MapPin className="w-8 h-8 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-white rounded-full scale-50 animate-ping" />
                </div>
              </button>
            ))}

            {/* Map Labels */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <div className="text-xs font-medium text-foreground mb-2">Legend</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-muted-foreground">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-6">
          {/* Selected Location */}
          {selectedLocation && (
            <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Location Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{selectedLocation.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedLocation.status]}`}>
                    {selectedLocation.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="font-medium text-foreground">{selectedLocation.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{selectedLocation.phone}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Service</p>
                  <p className="font-medium text-foreground">{selectedLocation.service}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-primary hover:scale-105 transition-transform">
                    <Navigation className="w-4 h-4 mr-1" />
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* All Locations List */}
          <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">All Locations</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredLocations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                    selectedLocation?.id === location.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-medium text-foreground">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[location.status]}`}>
                        {location.status}
                      </span>
                      <MapPin className={`w-4 h-4 ${
                        location.status === 'active' ? 'text-warning' :
                        location.status === 'completed' ? 'text-success' :
                        'text-secondary'
                      }`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}