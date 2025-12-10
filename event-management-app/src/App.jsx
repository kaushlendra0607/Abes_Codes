import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, Search, Plus, Edit2, Trash2, History, LogIn, LogOut } from 'lucide-react';

// Static event data
const initialEvents = [
  {
    id: 1,
    title: "Annual Tech Fest 2025",
    description: "A 3-day technology festival featuring coding competitions, hackathons, and tech talks from industry experts.",
    category: "technical",
    venue: "Main Auditorium",
    eventDate: "2025-12-15",
    eventTime: "09:00 AM",
    registrationDeadline: "2025-12-05",
    registrationOpen: true,
    completed: false,
    maxParticipants: 500,
    currentParticipants: 234,
    tags: ["coding", "hackathon", "technology"]
  },
  {
    id: 2,
    title: "Inter-College Cricket Tournament",
    description: "Annual cricket championship with teams from 12 different colleges competing for the trophy.",
    category: "sports",
    venue: "University Sports Complex",
    eventDate: "2025-12-08",
    eventTime: "08:00 AM",
    registrationDeadline: "2025-12-02",
    registrationOpen: true,
    completed: false,
    maxParticipants: 200,
    currentParticipants: 156,
    tags: ["cricket", "outdoor", "team sport"]
  },
  {
    id: 3,
    title: "Cultural Night - Melodia",
    description: "Evening of music, dance, and drama performances by talented students from various departments.",
    category: "cultural",
    venue: "Open Air Theatre",
    eventDate: "2025-12-20",
    eventTime: "06:00 PM",
    registrationDeadline: "2025-12-10",
    registrationOpen: true,
    completed: false,
    maxParticipants: 150,
    currentParticipants: 89,
    tags: ["singing", "dance", "drama"]
  },
  {
    id: 4,
    title: "Literary Fest - Wordsmith",
    description: "Celebrate literature with poetry slams, creative writing workshops, and book discussions.",
    category: "literary",
    venue: "Library Seminar Hall",
    eventDate: "2025-12-03",
    eventTime: "10:00 AM",
    registrationDeadline: "2025-12-01",
    registrationOpen: false,
    completed: false,
    maxParticipants: 100,
    currentParticipants: 100,
    tags: ["poetry", "writing", "books"]
  },
  {
    id: 5,
    title: "Basketball Championship",
    description: "Fast-paced basketball tournament with exciting matches and amazing prizes.",
    category: "sports",
    venue: "Indoor Sports Arena",
    eventDate: "2025-12-18",
    eventTime: "09:00 AM",
    registrationDeadline: "2025-12-12",
    registrationOpen: true,
    completed: false,
    maxParticipants: 160,
    currentParticipants: 72,
    tags: ["basketball", "indoor", "team sport"]
  },
  {
    id: 6,
    title: "AI & ML Workshop",
    description: "Hands-on workshop on Machine Learning fundamentals and AI applications in real-world scenarios.",
    category: "technical",
    venue: "Computer Lab Block B",
    eventDate: "2025-12-10",
    eventTime: "11:00 AM",
    registrationDeadline: "2025-12-04",
    registrationOpen: true,
    completed: false,
    maxParticipants: 80,
    currentParticipants: 65,
    tags: ["AI", "ML", "workshop"]
  }
];

const completedEvents = [
  {
    id: 100,
    title: "Fresher's Welcome 2025",
    category: "cultural",
    eventDate: "2025-11-15",
    completed: true
  }
];

// Category configurations
const categories = [
  { id: 'all', name: 'All Events', color: 'bg-gray-500' },
  { id: 'technical', name: 'Technical', color: 'bg-blue-500' },
  { id: 'sports', name: 'Sports', color: 'bg-green-500' },
  { id: 'cultural', name: 'Cultural', color: 'bg-purple-500' },
  { id: 'literary', name: 'Literary', color: 'bg-yellow-500' }
];

// Event Card Component
const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  const daysUntilDeadline = Math.ceil(
    (new Date(event.registrationDeadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  
  const categoryColor = categories.find(c => c.id === event.category)?.color || 'bg-gray-500';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          <span className={`inline-block ${categoryColor} text-white text-xs px-3 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(event)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span>{new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-500" />
          <span>{event.currentParticipants}/{event.maxParticipants} registered</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {event.registrationOpen ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Registration Open
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Registration Closed
            </span>
          )}
          {daysUntilDeadline <= 3 && daysUntilDeadline > 0 && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
              Closing Soon ({daysUntilDeadline}d left)
            </span>
          )}
        </div>
        {!isAdmin && event.registrationOpen && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Register
          </button>
        )}
      </div>
    </div>
  );
};

// Admin Event Form
const EventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    category: 'technical',
    venue: '',
    eventDate: '',
    eventTime: '',
    registrationDeadline: '',
    registrationOpen: true,
    maxParticipants: 100,
    currentParticipants: 0,
    tags: []
  });

  const handleSubmit = () => {
    onSave({ ...formData, id: event?.id || Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{event ? 'Edit Event' : 'Create New Event'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="technical">Technical</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="literary">Literary</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Event Time</label>
              <input
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Registration Deadline</label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Participants</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.registrationOpen}
              onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
              className="rounded"
            />
            <label className="text-sm font-medium">Registration Open</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [history, setHistory] = useState(completedEvents);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [registrationFilter, setRegistrationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => !event.completed);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    if (registrationFilter === 'open') {
      filtered = filtered.filter(e => e.registrationOpen);
    } else if (registrationFilter === 'closed') {
      filtered = filtered.filter(e => !e.registrationOpen);
    }

    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by registration deadline (closest first)
    return filtered.sort((a, b) => {
      const deadlineA = new Date(a.registrationDeadline);
      const deadlineB = new Date(b.registrationDeadline);
      return deadlineA - deadlineB;
    });
  }, [events, selectedCategory, registrationFilter, searchQuery]);

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === eventData.id ? eventData : e));
    } else {
      setEvents([...events, eventData]);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const eventToDelete = events.find(e => e.id === id);
      setEvents(events.filter(e => e.id !== id));
      setHistory([...history, { ...eventToDelete, completed: true }]);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Campus Engage</h1>
            <p className="text-sm text-gray-600">
              {isAdmin ? 'Admin Dashboard' : 'Discover & Register for Events'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <History size={18} />
                  History
                </button>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Create Event
                </button>
              </>
            )}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              {isAdmin ? <LogOut size={18} /> : <LogIn size={18} />}
              {isAdmin ? 'User View' : 'Admin View'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {showHistory && isAdmin ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Event History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Back to Events
              </button>
            </div>
            <div className="grid gap-4">
              {history.map(event => (
                <div key={event.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(event.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Categories:</span>
                </div>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-sm font-medium text-gray-700">Registration Status:</span>
                <button
                  onClick={() => setRegistrationFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    registrationFilter === 'all'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setRegistrationFilter('open')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    registrationFilter === 'open'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setRegistrationFilter('closed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    registrationFilter === 'closed'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Closed
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
              </h2>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events match your filters</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isAdmin={isAdmin}
                      onEdit={handleEditEvent}
                      onDelete={handleDeleteEvent}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}