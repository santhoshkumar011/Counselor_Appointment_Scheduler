// import React, { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff, Heart, ArrowRight, Users, Shield, Star, CheckCircle } from 'lucide-react';

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [userType, setUserType] = useState('student');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = () => {
//     setIsLoading(true);
    
//     setTimeout(() => {
//       setIsLoading(false);
//       alert(`${userType === 'student' ? 'Student' : 'Counselor'} login successful! 🎉`);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       </div>

//       <div className="w-full max-w-6xl relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
//           <div className="hidden lg:block space-y-8 p-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500">
//                 <Heart className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   CounselHub
//                 </h1>
//                 <p className="text-gray-600 font-medium">Your Path to Success</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h2 className="text-3xl font-bold text-gray-900 leading-tight">
//                 Connect with Expert <br />
//                 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Counselors & Advisors
//                 </span>
//               </h2>
              
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 Whether you need academic guidance or mental health support, 
//                 we're here to help you thrive in your educational journey.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Expert Guidance</h3>
//                     <p className="text-sm text-gray-600">Connect with certified counselors and academic advisors</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Shield className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Safe & Confidential</h3>
//                     <p className="text-sm text-gray-600">Your privacy and wellbeing are our top priority</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Star className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Flexible Scheduling</h3>
//                     <p className="text-sm text-gray-600">Book appointments that fit your schedule</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-8 pt-4">
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     500+
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Students Helped</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     50+
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Expert Counselors</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
//                     4.9
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Average Rating</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
            
//             <div className="lg:hidden flex items-center justify-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
//             </div>

//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back! 👋</h2>
//               <p className="text-gray-600">Sign in to continue your journey</p>
//             </div>

//             <div className="flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-1.5 mb-8">
//               <button
//                 onClick={() => setUserType('student')}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
//                   userType === 'student'
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Users className="w-5 h-5" />
//                 <span>Student</span>
//               </button>
//               <button
//                 onClick={() => setUserType('counselor')}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
//                   userType === 'counselor'
//                     ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Heart className="w-5 h-5" />
//                 <span>Counselor</span>
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                     placeholder={userType === 'student' ? 'student@university.edu' : 'counselor@university.edu'}
//                     className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                     placeholder="Enter your password"
//                     className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-gray-600 font-medium">Remember me</span>
//                 </label>
//                 <button
//                   className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               <button
//                 onClick={handleLogin}
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Signing In...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>

//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
//               </div>
//             </div>

//             <div className="text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{' '}
//                 <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all">
//                   Sign Up
//                 </button>
//               </p>
//             </div>

//             <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
//               <p className="text-xs font-bold text-gray-700 mb-2">🔑 Demo Credentials:</p>
//               <div className="text-xs text-gray-600 space-y-1">
//                 <p><span className="font-medium">Student:</span> student@demo.edu / password123</p>
//                 <p><span className="font-medium">Counselor:</span> counselor@demo.edu / password123</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8 text-sm text-gray-500">
//           <p>© 2025 CounselHub. All rights reserved.</p>
//           <div className="flex items-center justify-center space-x-4 mt-2">
//             <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
//             <span>•</span>
//             <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
//             <span>•</span>
//             <button className="hover:text-gray-700 transition-colors">Contact Support</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff, Heart, ArrowRight, Users, Shield, Star, CheckCircle } from 'lucide-react';

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [userType, setUserType] = useState('student');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           role: userType
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Store JWT and user info
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('role', data.role);
//         localStorage.setItem('name', data.name);
//         alert(`${userType === 'student' ? 'Student' : 'Counselor'} login successful! 🎉`);
//         // Redirect to dashboard or homepage
//         // window.location.href = '/dashboard';
//       } else {
//         alert(data.message || 'Login failed!');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       </div>

//       <div className="w-full max-w-6xl relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           {/* Left side content */}
//           <div className="hidden lg:block space-y-8 p-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500">
//                 <Heart className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   CounselHub
//                 </h1>
//                 <p className="text-gray-600 font-medium">Your Path to Success</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h2 className="text-3xl font-bold text-gray-900 leading-tight">
//                 Connect with Expert <br />
//                 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Counselors & Advisors
//                 </span>
//               </h2>
              
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 Whether you need academic guidance or mental health support, 
//                 we're here to help you thrive in your educational journey.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Expert Guidance</h3>
//                     <p className="text-sm text-gray-600">Connect with certified counselors and academic advisors</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Shield className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Safe & Confidential</h3>
//                     <p className="text-sm text-gray-600">Your privacy and wellbeing are our top priority</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Star className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Flexible Scheduling</h3>
//                     <p className="text-sm text-gray-600">Book appointments that fit your schedule</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-8 pt-4">
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     500+
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Students Helped</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     50+
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Expert Counselors</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
//                     4.9
//                   </div>
//                   <div className="text-sm text-gray-600 font-medium">Average Rating</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right side login */}
//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
//             <div className="lg:hidden flex items-center justify-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
//             </div>

//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back! 👋</h2>
//               <p className="text-gray-600">Sign in to continue your journey</p>
//             </div>

//             <div className="flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-1.5 mb-8">
//               <button
//                 onClick={() => setUserType('student')}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
//                   userType === 'student'
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Users className="w-5 h-5" />
//                 <span>Student</span>
//               </button>
//               <button
//                 onClick={() => setUserType('counselor')}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
//                   userType === 'counselor'
//                     ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Heart className="w-5 h-5" />
//                 <span>Counselor</span>
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                     placeholder={userType === 'student' ? 'student@university.edu' : 'counselor@university.edu'}
//                     className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                     placeholder="Enter your password"
//                     className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-gray-600 font-medium">Remember me</span>
//                 </label>
//                 <button
//                   className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               <button
//                 onClick={handleLogin}
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Signing In...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>

//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
//               </div>
//             </div>

//             <div className="text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{' '}
//                 <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all">
//                   Sign Up
//                 </button>
//               </p>
//             </div>

//             <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
//               <p className="text-xs font-bold text-gray-700 mb-2">🔑 Demo Credentials:</p>
//               <div className="text-xs text-gray-600 space-y-1">
//                 <p><span className="font-medium">Student:</span> student@demo.edu / password123</p>
//                 <p><span className="font-medium">Counselor:</span> counselor@demo.edu / password123</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8 text-sm text-gray-500">
//           <p>© 2025 CounselHub. All rights reserved.</p>
//           <div className="flex items-center justify-center space-x-4 mt-2">
//             <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
//             <span>•</span>
//             <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
//             <span>•</span>
//             <button className="hover:text-gray-700 transition-colors">Contact Support</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Heart, ArrowRight, Users } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, role: userType })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and role
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);

        alert(`${userType === 'student' ? 'Student' : 'Counselor'} login successful! 🎉`);

        // Redirect based on role
        if (data.role === 'student') navigate('/student-dashboard');
        else if (data.role === 'counselor') navigate('/counselor-dashboard');
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 w-full max-w-md">
        <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Welcome Back! 👋</h2>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-6">
          <button
            onClick={() => setUserType('student')}
            className={`flex-1 py-2 rounded-xl font-bold transition ${
              userType === 'student' ? 'bg-blue-500 text-white' : 'text-gray-600'
            }`}
          >
            <Users className="inline w-5 h-5 mr-1" />
            Student
          </button>
          <button
            onClick={() => setUserType('counselor')}
            className={`flex-1 py-2 rounded-xl font-bold transition ${
              userType === 'counselor' ? 'bg-purple-500 text-white' : 'text-gray-600'
            }`}
          >
            <Heart className="inline w-5 h-5 mr-1" />
            Counselor
          </button>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder={userType === 'student' ? 'student@demo.edu' : 'counselor@demo.edu'}
            className="w-full border-2 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
            className="w-full border-2 rounded-xl p-3 pr-10 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold flex justify-center items-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Demo credentials */}
        <div className="mt-6 text-xs text-gray-600">
          <p>🔑 Demo Credentials:</p>
          <p>Student: student@demo.edu / password123</p>
          <p>Counselor: counselor@demo.edu / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
