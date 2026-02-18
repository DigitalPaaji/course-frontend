"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  User, 
  Mail, 
  Calendar, 
  PlayCircle, 
  LogOut, 
  Clock, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { base_url } from "@/app/utls"; // Adjusted import path based on common conventions
import VideoCompo from "./compo/VideoCompo";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [fullUser, setFullUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchVideo,setWatchVideo]=useState(null)
  const router = useRouter();

  const verifyUser = async () => {
    try {
      const response = await axios.get(`${base_url}/user/getcourse`);
      const data = await response.data;
      if (data.success) {
        setFullUser(data.user);
      } else {
        // Handle failure (optional)
      }
    } catch (error) {
      console.error(error);
      setFullUser(null);
      // router.push("/userlogin"); // Uncomment to enable redirect
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // Helper to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

 const handelLogout= async()=>{
  try {
    const response = await axios.get(`${base_url}/user/logout`)
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      router.push("/userlogin")
    }
  } catch (error) {
          toast.error(error.response.data.message)

  }
 }

  const getDaysLeft = (expireDate) => {
    const today = new Date();
    const expiry = new Date(expireDate);
    const diffTime = Math.abs(expiry - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!fullUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* --- Sidebar / Navigation (Mobile Top, Desktop Side) --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
               <div className="bg-indigo-600 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
               </div>
               <span className="font-bold text-xl tracking-tight text-gray-900">
                 Digital Paaji
               </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-semibold">{fullUser.name}</span>
                <span className="text-xs text-gray-500">{fullUser.email}</span>
              </div>
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                {fullUser.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- Welcome Header --- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="mt-1 text-gray-500">
            You are enrolled in <span className="font-semibold text-indigo-600">{fullUser.course?.length || 0}</span> courses.
          </p>
        </div>
{watchVideo &&
<VideoCompo  videoUrl={watchVideo}/>
}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Course List */}
          <div className="lg:col-span-2 space-y-6">
            {fullUser.course && fullUser.course.length > 0 ? (
              fullUser.course.map((enrollment, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Course Header */}
                  <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-indigo-50 to-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                          {enrollment.course.isPublished ? "Active Course" : "Coming Soon"}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {enrollment.course.courseName}
                        </h2>
                        <p className="text-gray-500 mt-1 line-clamp-2 text-sm">
                          {enrollment.course.description}
                        </p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm text-gray-400">Enrolled</p>
                         <p className="font-medium text-gray-700">{formatDate(enrollment.enrolledAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Content (Chapters) */}
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Course Content
                    </h3>
                    
                    <div className="space-y-4">
                      {enrollment.course.chapters.map((chapter, cIndex) => (
                        <div key={chapter._id} className="border border-gray-200 rounded-xl overflow-hidden">
                          {/* Chapter Title */}
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                            <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                                Ch {cIndex + 1}
                              </span>
                              {chapter.title}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {chapter.lectures.length} Lectures
                            </span>
                          </div>

                          {/* Lectures List */}
                          <div className="divide-y divide-gray-100">
                            {chapter.lectures.map((lecture) => (
                              <div 
                                key={lecture._id} 
                                onClick={()=>setWatchVideo(lecture.videoUrl)}
                                className="px-4 py-3 flex items-center justify-between hover:bg-indigo-50 transition cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition" />
                                  <span className="text-sm text-gray-700 group-hover:text-indigo-900">
                                    {lecture.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Placeholder for duration if it was > 0 */}
                                  <span className="text-xs text-gray-400">
                                     Watch
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-gray-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl text-center border border-dashed border-gray-300">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
              </div>
            )}
          </div>

          {/* Right Column: Profile & Stats */}
          <div className="space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Student Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium text-gray-900">{fullUser.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-900 break-all">{fullUser.email}</p>
                  </div>
                </div>
                
                {fullUser.course && fullUser.course[0] && (
                   <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-orange-600">Subscription Expires</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(fullUser.course[0].expireAt)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getDaysLeft(fullUser.course[0].expireAt)} days remaining
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <button onClick={()=>handelLogout()} className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {/* Quick Stats */}
            {/* <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
               <h3 className="text-lg font-bold mb-4">Your Progress</h3>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-indigo-200 text-sm">Course Completion</span>
                 <span className="font-bold">0%</span>
               </div>
               <div className="w-full bg-indigo-900 rounded-full h-2.5">
                  <div className="bg-white h-2.5 rounded-full" style={{ width: '0%' }}></div>
               </div>
               <p className="text-xs text-indigo-200 mt-4">
                 Start watching lectures to track your progress here.
               </p>
            </div> */}

          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;