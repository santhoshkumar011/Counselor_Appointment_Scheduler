import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Heart,
  Loader,
  Mail,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const CounselorInterface = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [view, setView] = useState("today");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSlotModal, setShowNewSlotModal] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const API_BASE_URL = "http://localhost:5001/api";

  useEffect(() => {
    setTimeout(() => setAnimatedStats(true), 300);
    fetchAppointments();
    fetchAvailableSlots();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // 👈 get from login
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      const normalized = (data.appointments || []).map((a) => ({
        ...a,
        studentName: a.studentName || a.student_name,
        counselorName: a.counselorName || a.counselor_name,
      }));
      setAppointments(normalized);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/slots`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch slots");
      const data = await response.json();
      setAvailableSlots(Array.isArray(data) ? data : data.slots || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || apt.type === filterType;
    const matchesView =
      view === "all" ||
      (view === "today" && apt.date === selectedDate) ||
      (view === "upcoming" && new Date(apt.date) >= new Date());

    return matchesSearch && matchesType && matchesView;
  });

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update appointment");
      const result = await response.json();
      const updatedAppointment = result.appointment || result;
      setAppointments((prev) =>
        prev.map((apt) =>
          String(apt.id) === String(id)
            ? { ...apt, ...updatedAppointment }
            : apt
        )
      );
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert("Failed to update appointment status");
    }
  };

  const addNewSlot = async ({ date, time, duration }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time, duration }),
      });

      if (!response.ok) throw new Error("Failed to add slot");
      const data = await response.json();
      console.log("Slot added:", data);
      await fetchAvailableSlots(); // 🧠 refresh slots list after adding
      return true;
    } catch (error) {
      console.error("Error adding slot:", error);
      return false;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-rose-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    return type === "academic"
      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const AddSlotModal = () => {
    const [newSlot, setNewSlot] = useState({
      date: selectedDate,
      time: "09:00",
      duration: 60,
    });

    const handleAddSlot = async () => {
      const success = await addNewSlot(newSlot);
      if (success) {
        setShowNewSlotModal(false);
        setNewSlot({ date: selectedDate, time: "09:00", duration: 60 });
      } else {
        alert("Failed to add slot. Check console for details.");
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 transform">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Add Time Slot</h3>
              <p className="text-sm text-gray-500">
                Create a new available appointment slot
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={newSlot.duration}
                onChange={(e) =>
                  setNewSlot((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value),
                  }))
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setShowNewSlotModal(false)}
              className="px-6 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSlot}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg"
            >
              Add Slot
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Connection Error
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchAppointments();
              fetchAvailableSlots();
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Counselor Dashboard
                </h1>
                <p className="text-gray-600 font-medium">
                  Dr. Jessica Martinez - Wellness & Academic Support
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-emerald-600 font-medium flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </span>
                  <span className="text-sm text-gray-500">
                    Last login: Today, 8:30 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
              />

              <button
                onClick={() => setShowNewSlotModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Time Slot</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Controls */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={view}
                  onChange={(e) => setView(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 transition-all duration-200"
                >
                  <option value="today">📅 Today</option>
                  <option value="upcoming">⏰ Upcoming</option>
                  <option value="all">📋 All Appointments</option>
                </select>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 transition-all duration-200"
              >
                <option value="all">🔍 All Types</option>
                <option value="academic">📚 Academic Counseling</option>
                <option value="mental-health">🧠 Mental Health</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students, reasons, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg text-white transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5 opacity-60" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {appointments.filter((apt) => apt.date === selectedDate).length}
            </div>
            <div className="text-blue-100 font-medium">
              Today's Appointments
            </div>
            <div className="mt-2 text-xs text-blue-200">+2 from yesterday</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-2xl shadow-lg text-white transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <Star className="w-5 h-5 opacity-60" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {appointments.filter((apt) => apt.status === "confirmed").length}
            </div>
            <div className="text-emerald-100 font-medium">Confirmed</div>
            <div className="mt-2 text-xs text-emerald-200">
              95% confirmation rate
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-2xl shadow-lg text-white transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="w-8 h-8 opacity-80" />
              <Clock className="w-5 h-5 opacity-60" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {appointments.filter((apt) => apt.status === "pending").length}
            </div>
            <div className="text-amber-100 font-medium">Pending Review</div>
            <div className="mt-2 text-xs text-amber-200">Needs attention</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg text-white transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <Plus className="w-5 h-5 opacity-60" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {availableSlots.length}
            </div>
            <div className="text-purple-100 font-medium">Available Slots</div>
            <div className="mt-2 text-xs text-purple-200">This week</div>
          </div>
        </div>

        {/* Enhanced Appointments List */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Appointments ({filteredAppointments.length})
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Manage your student sessions
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id || appointment.id}
                  className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-101"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {appointment.studentName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-bold text-gray-900 text-lg">
                              {appointment.studentName}
                            </span>
                            <span
                              className={`px-3 py-1 text-xs font-bold rounded-full ${getTypeColor(appointment.type)} shadow-sm`}
                            >
                              {appointment.type === "academic"
                                ? "📚 Academic"
                                : "🧠 Mental Health"}
                            </span>
                            {appointment.priority && (
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-lg border ${getPriorityColor(appointment.priority)}`}
                              >
                                {appointment.priority.toUpperCase()} PRIORITY
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {getStatusIcon(appointment.status)}
                            <span className="text-sm text-gray-600 capitalize font-medium">
                              {appointment.status}
                            </span>
                            {appointment.sessionCount > 0 && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                Session #{appointment.sessionCount + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              {new Date(appointment.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            <span className="text-blue-600 font-bold">
                              {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <span>{appointment.duration} minutes duration</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Mail className="w-4 h-4 text-green-500" />
                            <span className="hover:text-blue-600 cursor-pointer transition-colors">
                              {appointment.email}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Phone className="w-4 h-4 text-indigo-500" />
                            <span className="hover:text-blue-600 cursor-pointer transition-colors">
                              {appointment.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold text-gray-900 mb-2">
                          📝 Session Focus:
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {appointment.reason}
                        </p>
                      </div>

                      {appointment.notes && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                          <p className="text-sm font-bold text-gray-900 mb-2">
                            💭 Counselor Notes:
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-3 ml-6">
                      {appointment.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment._id || appointment.id,
                                "confirmed"
                              )
                            }
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirm</span>
                          </button>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment._id || appointment.id,
                                "cancelled"
                              )
                            }
                            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm rounded-xl hover:from-rose-600 hover:to-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Decline</span>
                          </button>
                        </>
                      )}
                      {appointment.status === "confirmed" && (
                        <>
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                            Start Session
                          </button>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment._id || appointment.id,
                                "cancelled"
                              )
                            }
                            className="px-4 py-2 border border-rose-200 text-rose-600 text-sm rounded-xl hover:bg-rose-50 transition-all duration-200 font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Enhanced Available Slots */}
        <div className="mt-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              ⚡ Available Time Slots
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Open slots for student bookings
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={slot._id || index}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-900">
                      {new Date(slot.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 font-medium">
                      {slot.time} ({slot.duration} min)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showNewSlotModal && <AddSlotModal />}
    </div>
  );
};

export default CounselorInterface;
