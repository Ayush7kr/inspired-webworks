import { useState, useEffect } from "react";
import { MapPin, Navigation, Search, Filter, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// --- OpenStreetMap / Leaflet Imports ---
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
// --- End Imports ---

// Dummy data with added latitude and longitude
const locations = [
  { id: 1, name: "John Smith", address: "123 Main St, Chicago, IL", status: "active", time: "09:00 AM", phone: "(555) 123-4567", service: "Plumbing Repair", lat: 41.881832, lng: -87.623177 },
  { id: 2, name: "Sarah Johnson", address: "456 Oak Ave, Evanston, IL", status: "completed", time: "11:30 AM", phone: "(555) 234-5678", service: "Electrical Installation", lat: 42.0451, lng: -87.6877 },
  { id: 3, name: "Mike Davis", address: "789 Pine Rd, Naperville, IL", status: "scheduled", time: "02:00 PM", phone: "(555) 345-6789", service: "HVAC Maintenance", lat: 41.7731, lng: -88.1453 },
  { id: 4, name: "Emily Brown", address: "321 Elm St, Schaumburg, IL", status: "active", time: "04:30 PM", phone: "(555) 456-7890", service: "General Repair", lat: 42.0334, lng: -88.0834 },
  { id: 5, name: "Robert Wilson", address: "654 Cedar Dr, Aurora, IL", status: "scheduled", time: "10:00 AM", phone: "(555) 567-8901", service: "Electrical Repair", lat: 41.7606, lng: -88.3201 },
];

// For Tailwind CSS classes
const statusColors = {
  active: "bg-warning text-warning-foreground",
  completed: "bg-success text-success-foreground",
  scheduled: "bg-secondary text-secondary-foreground",
};

// For leaflet marker icon colors (hex values)
const statusHexColors = {
  active: "#f59e0b", // Corresponds to Tailwind 'warning' (amber-500)
  completed: "#22c55e", // Corresponds to Tailwind 'success' (green-500)
  scheduled: "#64748b", // Corresponds to Tailwind 'secondary' (slate-500)
};

// --- Custom Leaflet Icon Function ---
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(
      <MapPin className="w-8 h-8 drop-shadow-lg" style={{ color }} />
    ),
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// --- Map Helper Component ---
function ChangeView({ location }: { location: typeof locations[0] | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 14, {
        duration: 1.2,
      });
    }
  }, [location, map]);
  return null;
}

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState({
    active: true,
    completed: true,
    scheduled: true,
  });

  const filteredLocations = locations.filter(location => {
    const searchMatch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter[location.status as keyof typeof statusFilter];
    return searchMatch && statusMatch;
  });

  const handleFilterChange = (status: keyof typeof statusFilter, checked: boolean) => {
    setStatusFilter(prev => ({ ...prev, [status]: checked }));
  };

  const activeFilterCount = Object.values(statusFilter).filter(Boolean).length;

  // Function to open Google Maps for navigation
  const handleNavigate = () => {
    if (!selectedLocation) return;
    const encodedAddress = encodeURIComponent(selectedLocation.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Map View</h1>
          <p className="text-muted-foreground">Track jobs and navigate to locations</p>
        </div>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {activeFilterCount < 3 && (
                  <span className="ml-2 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">Filter by Status</h4>
                <div className="space-y-2">
                  {Object.keys(statusFilter).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={statusFilter[status as keyof typeof statusFilter]}
                        onCheckedChange={(checked) => handleFilterChange(status as keyof typeof statusFilter, !!checked)}
                      />
                      <Label htmlFor={`status-${status}`} className="capitalize">{status}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            className="bg-gradient-primary hover:scale-105 transition-transform"
            onClick={handleNavigate}
            disabled={!selectedLocation}
          >
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

          {/* --- Real OpenStreetMap --- */}
          <div className="relative h-96 rounded-xl border border-border overflow-hidden">
            <MapContainer
              center={[41.8781, -87.9298]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <ChangeView location={selectedLocation} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={createCustomIcon(statusHexColors[location.status as keyof typeof statusHexColors])}
                  eventHandlers={{
                    click: () => setSelectedLocation(location),
                  }}
                >
                  <Popup>
                    <b>{location.name}</b><br />{location.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-border z-[1000]">
              <div className="text-xs font-medium text-foreground mb-2">Legend</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" style={{ color: statusHexColors.active }} />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" style={{ color: statusHexColors.completed }} />
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" style={{ color: statusHexColors.scheduled }} />
                  <span className="text-xs text-muted-foreground">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details & List */}
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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedLocation.status as keyof typeof statusColors]}`}>
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
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-primary hover:scale-105 transition-transform"
                    onClick={handleNavigate}
                  >
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
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-200 hover:scale-[1.03] ${selectedLocation?.id === location.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                    }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[location.status as keyof typeof statusColors]}`}>
                        {location.status}
                      </span>
                      <MapPin className={`w-4 h-4`} style={{ color: statusHexColors[location.status as keyof typeof statusColors] }} />
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