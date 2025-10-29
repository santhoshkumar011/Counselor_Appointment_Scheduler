import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Heart,
  Loader,
  MessageCircle,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    reason: "",
    notes: "",
    type: "academic",
  });

  const [counselors, setCounselors] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am your counselor assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const API_BASE_URL = "http://localhost:5001/api";
  const STUDENT_ID = "student_123";

  useEffect(() => {
    fetchCounselors();
    fetchMyAppointments();
  }, []);

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/counselors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch counselors");
      const data = await response.json();
      setCounselors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching counselors:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/appointments/student/${STUDENT_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setMyAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchCounselorSlots = async (counselorId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/slots/counselor/${counselorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch slots");
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching slots:", err);
      return [];
    }
  };

  const handleBookAppointment = async () => {
    if (!bookingDetails.reason.trim()) {
      alert("Please provide a reason for the appointment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        counselor_id: selectedCounselor._id || selectedCounselor.id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        title: bookingDetails.reason,
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to book appointment");
      await fetchMyAppointments();

      setShowBookingModal(false);
      setSelectedCounselor(null);
      setSelectedSlot(null);
      setBookingDetails({ reason: "", notes: "", type: "academic" });

      alert(
        "Appointment booked successfully! The counselor will confirm shortly."
      );
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: chatInput }]);

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatInput, studentId: STUDENT_ID }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.response },
        ]);
      } else {
        let botResponse = "I am not sure about that. Can you ask differently?";
        const msg = chatInput.toLowerCase();
        if (msg.includes("book"))
          botResponse = "Sure! Who would you like to book a session with?";
        else if (msg.includes("available"))
          botResponse =
            "You can check available counselors on your dashboard above.";
        else if (msg.includes("stress"))
          botResponse =
            "I suggest talking to our mental health counselors. Shall I show you?";

        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: botResponse },
        ]);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I had trouble processing that. Please try again.",
        },
      ]);
    }

    setChatInput("");
  };

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.expertise?.some((e) =>
        e.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesSpecialty =
      filterSpecialty === "all" || counselor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {selectedCounselor?.image || "👤"}
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold">
                  {selectedCounselor?.name}
                </h3>
                <p className="text-blue-100">{selectedCounselor?.title}</p>
              </div>
            </div>
            <button
              onClick={() => setShowBookingModal(false)}
              className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">
                {new Date(selectedSlot?.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-900">
                {selectedSlot?.time} ({selectedSlot?.duration} minutes)
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Session Type
              </label>
              <select
                value={bookingDetails.type}
                onChange={(e) =>
                  setBookingDetails((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="academic">📚 Academic Counseling</option>
                <option value="mental-health">
                  🧠 Mental Health & Wellness
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                What would you like to discuss?
              </label>
              <input
                type="text"
                value={bookingDetails.reason}
                onChange={(e) =>
                  setBookingDetails((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                placeholder="e.g., Course selection help, Career guidance, Stress management..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={bookingDetails.notes}
                onChange={(e) =>
                  setBookingDetails((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Any additional information you'd like to share..."
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleBookAppointment}
              disabled={!bookingDetails.reason}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CounselorDetailModal = () => {
    const [counselorSlots, setCounselorSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(true);

    useEffect(() => {
      if (selectedCounselor) {
        const loadSlots = async () => {
          setLoadingSlots(true);
          const slots = await fetchCounselorSlots(
            selectedCounselor._id || selectedCounselor.id
          );
          setCounselorSlots(slots);
          setLoadingSlots(false);
        };
        loadSlots();
      }
    }, [selectedCounselor]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 relative">
            <button
              onClick={() => setSelectedCounselor(null)}
              className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl">
                {selectedCounselor?.image || "👤"}
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCounselor?.name}
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                  {selectedCounselor?.title}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <span className="font-bold">
                      {selectedCounselor?.rating || "N/A"}
                    </span>
                    <span className="text-blue-100">
                      ({selectedCounselor?.reviews || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>{selectedCounselor?.experience || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Availability</span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedCounselor?.availability || "Check available slots"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-900">Response Time</span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedCounselor?.responseTime || "Within 24 hours"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-900">Languages</span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedCounselor?.languages?.join(", ") || "English"}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedCounselor?.bio || "No bio available"}
              </p>
            </div>

            {selectedCounselor?.expertise &&
              selectedCounselor.expertise.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCounselor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 rounded-xl font-medium text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📅 Available Time Slots
              </h3>
              {loadingSlots ? (
                <div className="flex justify-center py-8">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : counselorSlots.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No available slots at the moment
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {counselorSlots.map((slot, index) => (
                    <button
                      key={slot._id || index}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setShowBookingModal(true);
                      }}
                      className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left transform hover:scale-105"
                    >
                      <div className="text-sm font-bold text-gray-900 mb-1">
                        {new Date(slot.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {slot.time}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {slot.duration} min
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Chatbot = () => (
    <div
      className={`fixed bottom-6 right-6 w-80 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 ${chatOpen ? "h-96" : "h-16"}`}
    >
      <div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <h3 className="font-bold">Counselor Bot 🤖</h3>
        <span className="text-xl font-bold">{chatOpen ? "−" : "+"}</span>
      </div>
      {chatOpen && (
        <>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl p-3 max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200 font-medium"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading counselors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <X className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Connection Error
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchCounselors();
              fetchMyAppointments();
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
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Find Your Counselor
                </h1>
                <p className="text-gray-600 font-medium">
                  Book appointments with expert advisors
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="font-bold text-gray-900">Alex Thompson</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                AT
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {myAppointments.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                📋 My Appointments
              </h2>
              <span className="text-sm text-gray-500">
                {myAppointments.length} total sessions
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myAppointments.map((apt) => (
                <div
                  key={apt._id || apt.id}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">
                      {apt.counselorName || apt.counselor}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        apt.status === "confirmed" || apt.status === "upcoming"
                          ? "bg-green-100 text-green-800"
                          : apt.status === "completed"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {apt.status === "confirmed" || apt.status === "upcoming"
                        ? "🔜 Upcoming"
                        : apt.status === "completed"
                          ? "✅ Completed"
                          : "⏳ Pending"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(apt.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{apt.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search counselors, expertise, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="all">🔍 All Specialties</option>
                <option value="academic">📚 Academic</option>
                <option value="mental-health">🧠 Mental Health</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCounselors.map((counselor) => (
            <div
              key={counselor._id || counselor.id}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-102"
            >
              <div
                className={`h-2 ${
                  counselor.specialty === "academic"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              ></div>

              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                    {counselor.image || "👤"}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {counselor.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {counselor.title || "Counselor"}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">
                          {counselor.rating || "N/A"}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({counselor.reviews || 0})
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {counselor.experience || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {counselor.bio || "Expert counselor ready to help you."}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {counselor.expertise &&
                      counselor.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 rounded-lg text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    {counselor.expertise && counselor.expertise.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                        +{counselor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm">
                    <p className="text-gray-500">Next Available</p>
                    <p className="font-bold text-gray-900">
                      {counselor.nextAvailable
                        ? new Date(counselor.nextAvailable).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )
                        : "Check slots"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedCounselor(counselor)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium transform hover:scale-105"
                  >
                    <span>View & Book</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCounselors.length === 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No counselors found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {selectedCounselor && !showBookingModal && <CounselorDetailModal />}
      {showBookingModal && <BookingModal />}
      <Chatbot />
    </div>
  );
};

export default StudentDashboard;
