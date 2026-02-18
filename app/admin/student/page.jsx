"use client";
import { base_url } from "@/app/utls";
import axios from "axios";
import { DeleteIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UsersTablePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${base_url}/user/getall`);
      const data = response.data;

      if (data.success) {
        setUsers(data.students);
      } else {
        setError("Failed to fetch students.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);




  const handelDelete =async(id)=>{
    try {
      const response = await axios.delete(`${base_url}/user/delete/${id}`);
      const data = await response.data;
       toast.success(data.message);
       getAllUsers()

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }



  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Enrollments</h1>
            <p className="text-gray-500 mt-1">
              Total Students: <span className="font-semibold">{users.length}</span>
            </p>
          </div>
          <button 
            onClick={getAllUsers}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            Refresh Data
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Student Info
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Validity
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((student) => (
                    // If a student has multiple courses, we map them. 
                    // If they have 0 courses, we still show the student row.
                    student.course.length > 0 ? (
                      student.course.map((enrollment, index) => (
                        <tr key={`${student._id}-${index}`} className="hover:bg-gray-50 transition-colors">
                          {/* Student Name & Email - Only show on the first course row to avoid clutter if multiple courses exist */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>

                          {/* Course Name */}
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-medium">
                              {enrollment.course?.courseName || "Unknown Course"}
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              enrollment.course?.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {enrollment.course?.isPublished ? "Published" : "Draft"}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{enrollment.course?.price?.toLocaleString() || 0}
                          </td>

                          {/* Validity Dates */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-xs flex flex-col space-y-1">
                              <span className="text-green-600">
                                <span className="font-semibold">Start:</span> {formatDate(enrollment.enrolledAt)}
                              </span>
                              <span className="text-red-500">
                                <span className="font-semibold">End:</span> {formatDate(enrollment.expireAt)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap"> 
                            <DeleteIcon  onClick={()=>handelDelete(student._id)} className="text-red-500  cursor-pointer" size={19} />
                          </td>
                        </tr>
                      ))
                    ) : (
                     
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td colSpan="3" className="px-6 py-4 text-sm text-gray-400 italic text-center">
                          No active enrollments
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTablePage;