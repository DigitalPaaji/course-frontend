"use client"
import { base_url } from '@/app/utls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Loader2, 
  Search,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllCourse = async () => {
    try {
      const response = await axios.get(`${base_url}/course/all/get`);
      const data = await response.data;
      
      if (data.success) {
        setCourses(data.data)
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllCourse()
  }, [])

   const handelDeleteCourse=async(courseId)=>{
try {
  const response = await axios.delete(`${base_url}/course/delete/course/${courseId}`)
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
    fetchAllCourse()
  }
} catch (error) {
  toast.error(error.response.data.message)
}
  }



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Courses</h1>
          <p className="text-slate-500 text-sm">Manage your course catalogue</p>
        </div>
        <Link 
          href="/admin/course-create" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add New Course
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-50 transition-colors group">
                    
                    {/* Course Name */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{course.courseName}</div>
                      <div className="text-xs text-slate-400 block md:hidden">{course._id}</div>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">
                        /{course.slug}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-medium text-emerald-600">
                      {formatPrice(course.price)}
                    </td>

                    {/* Description (Truncated) */}
                    <td className="px-6 py-4 max-w-xs truncate text-slate-500 text-sm" title={course.description}>
                      {course.description || "No description provided"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/course/${course.slug}`}
                          className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Delete"
                          onClick={() => handelDeleteCourse( course._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination Placeholder */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
           <span>Showing {courses.length} results</span>
           {/* You can add pagination buttons here later */}
        </div>
      </div>
    </div>
  )
}

export default AllCoursesPage