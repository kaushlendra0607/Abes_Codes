import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, Search, Plus, Edit2, Trash2, History, LogIn, LogOut, TrendingUp, Star, Award } from 'lucide-react';

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

// Category configurations with gradients
const categories = [
  { id: 'all', name: 'All Events', gradient: 'from-gray-600 to-gray-800', icon: '🎯' },
  { id: 'technical', name: 'Technical', gradient: 'from-blue-500 to-indigo-600', icon: '💻' },
  { id: 'sports', name: 'Sports', gradient: 'from-green-500 to-emerald-600', icon: '⚽' },
  { id: 'cultural', name: 'Cultural', gradient: 'from-purple-500 to-pink-600', icon: '🎭' },
  { id: 'literary', name: 'Literary', gradient: 'from-yellow-500 to-orange-600', icon: '📚' }
];

// Event Card Component with enhanced design
const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  const daysUntilDeadline = Math.ceil(
    (new Date(event.registrationDeadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  
  const categoryData = categories.find(c => c.id === event.category) || categories[0];
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2">
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${categoryData.gradient}`}></div>
      
      {/* Trending badge for popular events */}
      {participationPercentage > 70 && (
        <div className="absolute top-6 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
          <TrendingUp size={14} />
          Trending
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryData.icon}</span>
              <span className={`bg-gradient-to-r ${categoryData.gradient} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide`}>
                {event.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {event.title}
            </h3>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">{event.description}</p>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <MapPin size={16} className="text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium">{event.venue}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <Calendar size={16} className="text-purple-600" />
            </div>
            <span className="text-gray-700 font-medium">
              {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.eventTime}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <Clock size={16} className="text-orange-600" />
            </div>
            <span className="text-gray-700 font-medium">
              Deadline: {new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Progress bar for participants */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
              <Users size={14} />
              Participants
            </span>
            <span className="text-xs font-bold text-gray-900">
              {event.currentParticipants}/{event.maxParticipants}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${categoryData.gradient} transition-all duration-500`}
              style={{ width: `${participationPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-2 flex-wrap">
            {event.registrationOpen ? (
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Star size={12} fill="currentColor" />
                Open
              </span>
            ) : (
              <span className="bg-gradient-to-r from-red-400 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Closed
              </span>
            )}
            {daysUntilDeadline <= 3 && daysUntilDeadline > 0 && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                {daysUntilDeadline}d left
              </span>
            )}
          </div>
          {!isAdmin && event.registrationOpen && (
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Admin Event Form with beautiful design
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
          <h2 className="text-3xl font-bold">{event ? '✏️ Edit Event' : '✨ Create New Event'}</h2>
          <p className="text-blue-100 mt-1">Fill in the details to {event ? 'update' : 'create'} an amazing event</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
              <Award size={16} className="text-blue-600" />
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="Enter an exciting event title..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
              rows="4"
              placeholder="Describe what makes this event special..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="technical">💻 Technical</option>
                <option value="sports">⚽ Sports</option>
                <option value="cultural">🎭 Cultural</option>
                <option value="literary">📚 Literary</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="Event location"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Event Date</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Event Time</label>
              <input
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Registration Deadline</label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Max Participants</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <input
              type="checkbox"
              checked={formData.registrationOpen}
              onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
              className="w-5 h-5 rounded text-green-600 focus:ring-2 focus:ring-green-500"
            />
            <label className="text-sm font-bold text-green-800">Registration Open</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {event ? '💾 Update Event' : '🚀 Create Event'}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 font-bold text-lg transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Animated Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                🎓 College Events Hub
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {isAdmin ? '⚙️ Admin Dashboard - Manage All Events' : '🌟 Discover Amazing Events & Register Now'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:from-gray-800 hover:to-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <History size={18} />
                    History
                  </button>
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setShowEventForm(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus size={18} />
                    Create Event
                  </button>
                </>
              )}
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-xl hover:from-indigo-700 hover:to-blue-800 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isAdmin ? <LogOut size={18} /> : <LogIn size={18} />}
                {isAdmin ? 'User View' : 'Admin View'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {showHistory && isAdmin ? (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  📜 Event History
                </h2>
                <p className="text-gray-600 mt-1">View all completed events</p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl hover:from-gray-700 hover:to-gray-900 font-bold shadow-lg transition-all duration-300"
              >
                ← Back to Events
              </button>
            </div>
            <div className="grid gap-4">
              {history.map(event => (
                <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gray-500 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 text-xl mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar size={14} />
                        Completed on {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="bg-gradient-to-r from-gray-600 to-gray-800 text-white text-sm font-bold px-4 py-2 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search and Filters with beautiful design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                  <input
                    type="text"
                    placeholder="Search for amazing events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Filter size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">Filter by Category</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                          selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <Star size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">Registration Status</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setRegistrationFilter('all')}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                        registrationFilter === 'all'
                          ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => setRegistrationFilter('open')}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                        registrationFilter === 'open'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ✅ Open
                    </button>
                    <button
                      onClick={() => setRegistrationFilter('closed')}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                        registrationFilter === 'closed'
                          ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ❌ Closed
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="animate-fadeIn">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Available
                  </h2>
                  <p className="text-gray-600 mt-1">Sorted by registration deadline</p>
                </div>
              </div>
              
              {filteredEvents.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-8xl mb-4">🔍</div>
                  <p className="text-gray-500 text-2xl font-bold">No events match your filters</p>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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