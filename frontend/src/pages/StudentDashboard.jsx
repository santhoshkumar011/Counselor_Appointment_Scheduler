// import React, { useState } from 'react';
// import { Calendar, Clock, User, Star, Heart, Search, Filter, BookOpen, Brain, Award, Users, MessageCircle, Video, Phone, Mail, CheckCircle, X, ChevronRight, TrendingUp } from 'lucide-react';

// const StudentDashboard = () => {
//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterSpecialty, setFilterSpecialty] = useState('all');
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState({
//     reason: '',
//     notes: '',
//     type: 'academic'
//   });

//   const counselors = [
//     {
//       id: 1,
//       name: 'Dr. Jessica Martinez',
//       specialty: 'academic',
//       title: 'Academic Advisor & Career Counselor',
//       rating: 4.9,
//       reviews: 156,
//       experience: '12 years',
//       image: '👩‍🏫',
//       expertise: ['Course Selection', 'Major Planning', 'Career Guidance', 'Study Skills'],
//       bio: 'Passionate about helping students achieve their academic goals and find their perfect career path.',
//       availability: 'Mon-Fri, 9 AM - 5 PM',
//       nextAvailable: '2025-08-12',
//       responseTime: '< 2 hours',
//       languages: ['English', 'Spanish'],
//       slots: [
//         { date: '2025-08-12', time: '10:00', duration: 60 },
//         { date: '2025-08-12', time: '14:00', duration: 60 },
//         { date: '2025-08-13', time: '09:00', duration: 60 },
//         { date: '2025-08-13', time: '15:30', duration: 45 }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Dr. Michael Chen',
//       specialty: 'mental-health',
//       title: 'Mental Health & Wellness Counselor',
//       rating: 4.8,
//       reviews: 203,
//       experience: '15 years',
//       image: '👨‍⚕️',
//       expertise: ['Anxiety Management', 'Stress Relief', 'Depression Support', 'Life Balance'],
//       bio: 'Dedicated to supporting student mental health and creating a safe space for growth.',
//       availability: 'Mon-Sat, 10 AM - 6 PM',
//       nextAvailable: '2025-08-12',
//       responseTime: '< 1 hour',
//       languages: ['English', 'Mandarin'],
//       slots: [
//         { date: '2025-08-12', time: '11:00', duration: 60 },
//         { date: '2025-08-12', time: '16:00', duration: 45 },
//         { date: '2025-08-13', time: '10:00', duration: 60 },
//         { date: '2025-08-14', time: '14:00', duration: 60 }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Dr. Sarah Johnson',
//       specialty: 'academic',
//       title: 'Learning Specialist & Academic Coach',
//       rating: 4.9,
//       reviews: 178,
//       experience: '10 years',
//       image: '👩‍🎓',
//       expertise: ['Learning Strategies', 'Time Management', 'Test Prep', 'Academic Probation'],
//       bio: 'Specializing in personalized learning strategies to help every student succeed.',
//       availability: 'Tue-Sat, 8 AM - 4 PM',
//       nextAvailable: '2025-08-13',
//       responseTime: '< 3 hours',
//       languages: ['English', 'French'],
//       slots: [
//         { date: '2025-08-13', time: '09:00', duration: 60 },
//         { date: '2025-08-13', time: '13:00', duration: 60 },
//         { date: '2025-08-14', time: '10:00', duration: 45 },
//         { date: '2025-08-14', time: '15:00', duration: 60 }
//       ]
//     },
//     {
//       id: 4,
//       name: 'Dr. David Williams',
//       specialty: 'mental-health',
//       title: 'Student Wellness & Mindfulness Coach',
//       rating: 4.7,
//       reviews: 142,
//       experience: '8 years',
//       image: '👨‍💼',
//       expertise: ['Mindfulness', 'Emotional Wellness', 'Relationship Issues', 'Self-Care'],
//       bio: 'Helping students build resilience and maintain emotional balance through college life.',
//       availability: 'Mon-Thu, 11 AM - 7 PM',
//       nextAvailable: '2025-08-12',
//       responseTime: '< 4 hours',
//       languages: ['English'],
//       slots: [
//         { date: '2025-08-12', time: '13:00', duration: 60 },
//         { date: '2025-08-12', time: '17:00', duration: 45 },
//         { date: '2025-08-13', time: '11:00', duration: 60 },
//         { date: '2025-08-14', time: '13:00', duration: 60 }
//       ]
//     }
//   ];

//   const myAppointments = [
//     {
//       id: 1,
//       counselor: 'Dr. Jessica Martinez',
//       date: '2025-08-10',
//       time: '14:00',
//       type: 'academic',
//       status: 'completed',
//       reason: 'Major selection discussion'
//     },
//     {
//       id: 2,
//       counselor: 'Dr. Michael Chen',
//       date: '2025-08-15',
//       time: '11:00',
//       type: 'mental-health',
//       status: 'upcoming',
//       reason: 'Stress management session'
//     }
//   ];

//   const filteredCounselors = counselors.filter(counselor => {
//     const matchesSearch = counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          counselor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
//     const matchesSpecialty = filterSpecialty === 'all' || counselor.specialty === filterSpecialty;
//     return matchesSearch && matchesSpecialty;
//   });

//   const handleBookAppointment = () => {
//     // In a real app, this would send the booking to a backend
//     setShowBookingModal(false);
//     setSelectedCounselor(null);
//     setSelectedSlot(null);
//     setBookingDetails({ reason: '', notes: '', type: 'academic' });
//   };

//   const BookingModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
//                 {selectedCounselor?.image}
//               </div>
//               <div className="text-white">
//                 <h3 className="text-2xl font-bold">{selectedCounselor?.name}</h3>
//                 <p className="text-blue-100">{selectedCounselor?.title}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowBookingModal(false)}
//               className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="p-8">
//           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
//             <div className="flex items-center space-x-3 mb-2">
//               <Calendar className="w-5 h-5 text-blue-600" />
//               <span className="font-bold text-gray-900">
//                 {new Date(selectedSlot?.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//               </span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Clock className="w-5 h-5 text-purple-600" />
//               <span className="font-bold text-gray-900">
//                 {selectedSlot?.time} ({selectedSlot?.duration} minutes)
//               </span>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-bold text-gray-900 mb-2">Session Type</label>
//               <select
//                 value={bookingDetails.type}
//                 onChange={(e) => setBookingDetails(prev => ({ ...prev, type: e.target.value }))}
//                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               >
//                 <option value="academic">📚 Academic Counseling</option>
//                 <option value="mental-health">🧠 Mental Health & Wellness</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-900 mb-2">What would you like to discuss?</label>
//               <input
//                 type="text"
//                 value={bookingDetails.reason}
//                 onChange={(e) => setBookingDetails(prev => ({ ...prev, reason: e.target.value }))}
//                 placeholder="e.g., Course selection help, Career guidance, Stress management..."
//                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-900 mb-2">Additional Notes (Optional)</label>
//               <textarea
//                 value={bookingDetails.notes}
//                 onChange={(e) => setBookingDetails(prev => ({ ...prev, notes: e.target.value }))}
//                 placeholder="Any additional information you'd like to share..."
//                 rows={4}
//                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4 mt-8">
//             <button
//               onClick={() => setShowBookingModal(false)}
//               className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-bold"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleBookAppointment}
//               disabled={!bookingDetails.reason}
//               className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CounselorDetailModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8">
//         <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 relative">
//           <button
//             onClick={() => setSelectedCounselor(null)}
//             className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
//           >
//             <X className="w-6 h-6" />
//           </button>
          
//           <div className="flex items-start space-x-6">
//             <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl">
//               {selectedCounselor?.image}
//             </div>
//             <div className="flex-1 text-white">
//               <h2 className="text-3xl font-bold mb-2">{selectedCounselor?.name}</h2>
//               <p className="text-blue-100 text-lg mb-4">{selectedCounselor?.title}</p>
//               <div className="flex items-center space-x-6">
//                 <div className="flex items-center space-x-2">
//                   <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
//                   <span className="font-bold">{selectedCounselor?.rating}</span>
//                   <span className="text-blue-100">({selectedCounselor?.reviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Award className="w-5 h-5" />
//                   <span>{selectedCounselor?.experience} experience</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Clock className="w-5 h-5 text-blue-600" />
//                 <span className="font-bold text-gray-900">Availability</span>
//               </div>
//               <p className="text-sm text-gray-600">{selectedCounselor?.availability}</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <MessageCircle className="w-5 h-5 text-purple-600" />
//                 <span className="font-bold text-gray-900">Response Time</span>
//               </div>
//               <p className="text-sm text-gray-600">{selectedCounselor?.responseTime}</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Users className="w-5 h-5 text-green-600" />
//                 <span className="font-bold text-gray-900">Languages</span>
//               </div>
//               <p className="text-sm text-gray-600">{selectedCounselor?.languages.join(', ')}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed">{selectedCounselor?.bio}</p>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Areas of Expertise</h3>
//             <div className="flex flex-wrap gap-3">
//               {selectedCounselor?.expertise.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 rounded-xl font-medium text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Available Time Slots</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {selectedCounselor?.slots.map((slot, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setSelectedSlot(slot);
//                     setShowBookingModal(true);
//                   }}
//                   className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left transform hover:scale-105"
//                 >
//                   <div className="text-sm font-bold text-gray-900 mb-1">
//                     {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">{slot.time}</div>
//                   <div className="text-xs text-gray-500 mt-1">{slot.duration} min</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                   Find Your Counselor
//                 </h1>
//                 <p className="text-gray-600 font-medium">Book appointments with expert advisors</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Welcome back,</p>
//                 <p className="font-bold text-gray-900">Alex Thompson</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
//                 AT
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* My Appointments Overview */}
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">📋 My Appointments</h2>
//             <span className="text-sm text-gray-500">{myAppointments.length} total sessions</span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {myAppointments.map((apt) => (
//               <div
//                 key={apt.id}
//                 className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-bold text-gray-900">{apt.counselor}</span>
//                   <span className={`px-3 py-1 text-xs font-bold rounded-full ${
//                     apt.status === 'upcoming' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {apt.status === 'upcoming' ? '🔜 Upcoming' : '✅ Completed'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-4 text-sm text-gray-600">
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-4 h-4" />
//                     <span>{apt.time}</span>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-2">{apt.reason}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Search and Filter */}
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search counselors, expertise, or topics..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               />
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <Filter className="w-5 h-5 text-gray-500" />
//               <select
//                 value={filterSpecialty}
//                 onChange={(e) => setFilterSpecialty(e.target.value)}
//                 className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               >
//                 <option value="all">🔍 All Specialties</option>
//                 <option value="academic">📚 Academic</option>
//                 <option value="mental-health">🧠 Mental Health</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Counselors Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {filteredCounselors.map((counselor) => (
//             <div
//               key={counselor.id}
//               className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-102"
//             >
//               <div className={`h-2 ${
//                 counselor.specialty === 'academic'
//                   ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
//                   : 'bg-gradient-to-r from-purple-500 to-pink-500'
//               }`}></div>
              
//               <div className="p-6">
//                 <div className="flex items-start space-x-4 mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
//                     {counselor.image}
//                   </div>
                  
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold text-gray-900 mb-1">{counselor.name}</h3>
//                     <p className="text-sm text-gray-600 mb-2">{counselor.title}</p>
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center space-x-1">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm font-bold text-gray-900">{counselor.rating}</span>
//                         <span className="text-xs text-gray-500">({counselor.reviews})</span>
//                       </div>
//                       <span className="text-xs text-gray-500">{counselor.experience}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-600 mb-4 line-clamp-2">{counselor.bio}</p>

//                 <div className="mb-4">
//                   <div className="flex flex-wrap gap-2">
//                     {counselor.expertise.slice(0, 3).map((skill, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 rounded-lg text-xs font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {counselor.expertise.length > 3 && (
//                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
//                         +{counselor.expertise.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                   <div className="text-sm">
//                     <p className="text-gray-500">Next Available</p>
//                     <p className="font-bold text-gray-900">
//                       {new Date(counselor.nextAvailable).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </p>
//                   </div>
                  
//                   <button
//                     onClick={() => setSelectedCounselor(counselor)}
//                     className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium transform hover:scale-105"
//                   >
//                     <span>View & Book</span>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredCounselors.length === 0 && (
//           <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-12 text-center">
//             <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 mb-2">No counselors found</h3>
//             <p className="text-gray-500">Try adjusting your search or filters.</p>
//           </div>
//         )}
//       </div>

//       {selectedCounselor && !showBookingModal && <CounselorDetailModal />}
//       {showBookingModal && <BookingModal />}
//     </div>
//   );
// };

// export default StudentDashboard;

import AiChatbot from './AiChatbot'; // Adjust path if needed
import React, { useState } from 'react';
import { Calendar, Clock, User, Star, Heart, Search, Filter, BookOpen, Brain, Award, Users, MessageCircle, Video, Phone, Mail, CheckCircle, X, ChevronRight, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    reason: '',
    notes: '',
    type: 'academic'
  });

  // --- Chatbot State ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your counselor assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const counselors = [
    {
      id: 1,
      name: 'Dr. Jessica Martinez',
      specialty: 'academic',
      title: 'Academic Advisor & Career Counselor',
      rating: 4.9,
      reviews: 156,
      experience: '12 years',
      image: '👩‍🏫',
      expertise: ['Course Selection', 'Major Planning', 'Career Guidance', 'Study Skills'],
      bio: 'Passionate about helping students achieve their academic goals and find their perfect career path.',
      availability: 'Mon-Fri, 9 AM - 5 PM',
      nextAvailable: '2025-08-12',
      responseTime: '< 2 hours',
      languages: ['English', 'Spanish'],
      slots: [
        { date: '2025-08-12', time: '10:00', duration: 60 },
        { date: '2025-08-12', time: '14:00', duration: 60 },
        { date: '2025-08-13', time: '09:00', duration: 60 },
        { date: '2025-08-13', time: '15:30', duration: 45 }
      ]
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'mental-health',
      title: 'Mental Health & Wellness Counselor',
      rating: 4.8,
      reviews: 203,
      experience: '15 years',
      image: '👨‍⚕️',
      expertise: ['Anxiety Management', 'Stress Relief', 'Depression Support', 'Life Balance'],
      bio: 'Dedicated to supporting student mental health and creating a safe space for growth.',
      availability: 'Mon-Sat, 10 AM - 6 PM',
      nextAvailable: '2025-08-12',
      responseTime: '< 1 hour',
      languages: ['English', 'Mandarin'],
      slots: [
        { date: '2025-08-12', time: '11:00', duration: 60 },
        { date: '2025-08-12', time: '16:00', duration: 45 },
        { date: '2025-08-13', time: '10:00', duration: 60 },
        { date: '2025-08-14', time: '14:00', duration: 60 }
      ]
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      specialty: 'academic',
      title: 'Learning Specialist & Academic Coach',
      rating: 4.9,
      reviews: 178,
      experience: '10 years',
      image: '👩‍🎓',
      expertise: ['Learning Strategies', 'Time Management', 'Test Prep', 'Academic Probation'],
      bio: 'Specializing in personalized learning strategies to help every student succeed.',
      availability: 'Tue-Sat, 8 AM - 4 PM',
      nextAvailable: '2025-08-13',
      responseTime: '< 3 hours',
      languages: ['English', 'French'],
      slots: [
        { date: '2025-08-13', time: '09:00', duration: 60 },
        { date: '2025-08-13', time: '13:00', duration: 60 },
        { date: '2025-08-14', time: '10:00', duration: 45 },
        { date: '2025-08-14', time: '15:00', duration: 60 }
      ]
    },
    {
      id: 4,
      name: 'Dr. David Williams',
      specialty: 'mental-health',
      title: 'Student Wellness & Mindfulness Coach',
      rating: 4.7,
      reviews: 142,
      experience: '8 years',
      image: '👨‍💼',
      expertise: ['Mindfulness', 'Emotional Wellness', 'Relationship Issues', 'Self-Care'],
      bio: 'Helping students build resilience and maintain emotional balance through college life.',
      availability: 'Mon-Thu, 11 AM - 7 PM',
      nextAvailable: '2025-08-12',
      responseTime: '< 4 hours',
      languages: ['English'],
      slots: [
        { date: '2025-08-12', time: '13:00', duration: 60 },
        { date: '2025-08-12', time: '17:00', duration: 45 },
        { date: '2025-08-13', time: '11:00', duration: 60 },
        { date: '2025-08-14', time: '13:00', duration: 60 }
      ]
    }
  ];

  const myAppointments = [
    {
      id: 1,
      counselor: 'Dr. Jessica Martinez',
      date: '2025-08-10',
      time: '14:00',
      type: 'academic',
      status: 'completed',
      reason: 'Major selection discussion'
    },
    {
      id: 2,
      counselor: 'Dr. Michael Chen',
      date: '2025-08-15',
      time: '11:00',
      type: 'mental-health',
      status: 'upcoming',
      reason: 'Stress management session'
    }
  ];

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = filterSpecialty === 'all' || counselor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    setShowBookingModal(false);
    setSelectedCounselor(null);
    setSelectedSlot(null);
    setBookingDetails({ reason: '', notes: '', type: 'academic' });
  };

  // --- Chatbot Message Handler ---
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);

    // Simple bot response
    let response = 'I am not sure about that. Can you ask differently?';
    const msg = chatInput.toLowerCase();
    if (msg.includes('book')) response = 'Sure! Who would you like to book a session with?';
    else if (msg.includes('available')) response = 'You can check available counselors on your dashboard above.';
    else if (msg.includes('stress')) response = 'I suggest talking to our mental health counselors. Shall I show you?';

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 500);

    setChatInput('');
  };

  // --- Booking Modal Component ---
  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {selectedCounselor?.image}
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold">{selectedCounselor?.name}</h3>
                <p className="text-blue-100">{selectedCounselor?.title}</p>
              </div>
            </div>
            <button onClick={() => setShowBookingModal(false)} className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">
                {new Date(selectedSlot?.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
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
              <label className="block text-sm font-bold text-gray-900 mb-2">Session Type</label>
              <select
                value={bookingDetails.type}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, type: e.target.value }))}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="academic">📚 Academic Counseling</option>
                <option value="mental-health">🧠 Mental Health & Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">What would you like to discuss?</label>
              <input
                type="text"
                value={bookingDetails.reason}
                                onChange={(e) =>
                  setBookingDetails((prev) => ({ ...prev, reason: e.target.value }))
                }
                placeholder="Type your reason..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Additional Notes (optional)</label>
              <textarea
                value={bookingDetails.notes}
                onChange={(e) =>
                  setBookingDetails((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Any extra details..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Chatbot Component ---
  const Chatbot = () => (
    <div className={`fixed bottom-6 right-6 w-80 h-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all ${chatOpen ? 'translate-y-0' : 'translate-y-72'}`}>
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 flex justify-between items-center cursor-pointer" onClick={() => setChatOpen(!chatOpen)}>
        <h3 className="font-bold">Counselor Bot 🤖</h3>
        <span>{chatOpen ? '−' : '+'}</span>
      </div>
      {chatOpen && (
        <>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl p-3 max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      {/* Search & Filter */}
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Search counselors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 border-gray-200 rounded-xl px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="all">All</option>
          <option value="academic">Academic</option>
          <option value="mental-health">Mental Health</option>
        </select>
      </div>

      {/* Counselor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounselors.map((counselor) => (
          <div key={counselor.id} className="border-2 border-gray-200 rounded-2xl p-6 flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{counselor.image}</div>
              <div>
                <h3 className="font-bold text-lg">{counselor.name}</h3>
                <p className="text-gray-500 text-sm">{counselor.title}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{counselor.bio}</p>
            <p className="text-gray-600 text-sm">Rating: {counselor.rating} ⭐ ({counselor.reviews} reviews)</p>
            <button
              onClick={() => { setSelectedCounselor(counselor); setSelectedSlot(counselor.slots[0]); setShowBookingModal(true); }}
              className="mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl hover:scale-105 transform transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}

      {/* Chatbot */}
      <AiChatbot />
    </div>
  );
};

export default StudentDashboard;

