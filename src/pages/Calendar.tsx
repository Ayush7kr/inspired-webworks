import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const appointments = [
  { id: 1, time: "09:00", client: "John Smith", service: "Plumbing Repair", location: "123 Main St", duration: "2h" },
  { id: 2, time: "11:30", client: "Sarah Johnson", service: "Electrical Installation", location: "456 Oak Ave", duration: "3h" },
  { id: 3, time: "14:00", client: "Mike Davis", service: "HVAC Maintenance", location: "789 Pine Rd", duration: "1.5h" },
  { id: 4, time: "16:30", client: "Emily Brown", service: "General Repair", location: "321 Elm St", duration: "1h" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 animate-fade-in">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map(day => (
              <div key={`empty-${day}`} className="p-3" />
            ))}
            {days.map(day => {
              const isToday = day === new Date().getDate() && 
                             currentDate.getMonth() === new Date().getMonth() &&
                             currentDate.getFullYear() === new Date().getFullYear();
              const isSelected = day === selectedDate.getDate() &&
                               currentDate.getMonth() === selectedDate.getMonth() &&
                               currentDate.getFullYear() === selectedDate.getFullYear();
              const hasAppointment = day === new Date().getDate(); // Simulate appointments on today

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`p-3 text-center text-sm rounded-lg transition-all duration-200 hover:bg-muted relative ${
                    isSelected ? 'bg-gradient-primary text-white' :
                    isToday ? 'bg-secondary/10 text-secondary font-medium' :
                    'text-foreground hover:scale-105'
                  }`}
                >
                  {day}
                  {hasAppointment && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{appointments.length} appointments</span>
            </div>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={appointment.id}
                className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors hover:scale-105 duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-primary" />
                    <span className="font-medium text-foreground">{appointment.time}</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {appointment.duration}
                  </span>
                </div>
                
                <h4 className="font-medium text-foreground mb-1">{appointment.service}</h4>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{appointment.client}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 hover:scale-105 transition-transform">
            View All Appointments
          </Button>
        </div>
      </div>
    </div>
  );
}