"use client";
import { base_url } from "@/app/utls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserPlus, Mail, Lock, Calendar, BookOpen, Loader2, Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    courseid: "",
    name: "",
    email: "",
    password: "",
    courseEndDate: 6,
  });
  const [togglePassword,setTogglePassword]=useState(false)
 const router = useRouter()
  const fetchAllCourse = async () => {
    try {
      const response = await axios.get(`${base_url}/course/all/get`);
      const data = await response.data;

      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
    

    const response = await axios.post(`${base_url}/user/create`,userData)
 const data = await response.data;
  toast.success(data.message)
  setUserData({
    courseid: "",
    name: "",
    email: "",
    password: "",
    courseEndDate: 6,
    })
router.push("/admin/student")

    } catch (error) {
   toast.error(error.response.data.message)
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Create User</h2>
              </div>
              <p className="text-blue-100 text-sm">Register a new user and assign their course</p>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Course Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Select Course
              </label>
              <div className="relative group">
                <select
                  name="courseid"
                  required
                  onChange={handleInputChange}
                  value={userData.courseid}
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 appearance-none text-gray-700 group-hover:border-gray-300"
                >
                  <option value="" disabled>-- Choose a course --</option>
                  {courses.length > 0 ? (
                    courses.map((item) => (
                      <option key={item._id} value={item._id} className="py-2">
                        {item.courseName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No courses available</option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* User Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-indigo-600" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-indigo-600" />
                Password
              </label>
              <div className="relative">
              <input
                type={`${togglePassword?"text":"password"}`}
                name="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                required
              />
              <div className="absolute top-1/3 right-2 text-gray-400">
                {togglePassword ?<Eye onClick={()=>setTogglePassword(false)} /> :<EyeClosed onClick={()=>setTogglePassword(true)} />}
              </div>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                Course Duration
              </label>
              <div className="relative group">
                <select
                  name="courseEndDate"
                  required
                  onChange={handleInputChange}
                  value={userData.courseEndDate}
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 appearance-none text-gray-700 group-hover:border-gray-300"
                >
                  <option value="" disabled>-- Select duration --</option>
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((item) => (
                    <option key={item} value={item} className="py-2">
                      {item} {item === 1 ? 'Month' : 'Months'}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg mt-8"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating User...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create User
                </>
              )}
            </button>

            {/* Form Footer Note */}
            <p className="text-xs text-center text-gray-500 mt-4">
              By creating a user, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>

        {/* Additional Info Card */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;