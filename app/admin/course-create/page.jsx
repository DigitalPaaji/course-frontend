"use client"
import React, { useState } from 'react'
import { Save, DollarSign, FileText, Type, Eye } from 'lucide-react'
import axios from 'axios'
import { base_url } from '@/app/utls'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const CreateCoursePage = () => {
  const route = useRouter()
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    price: '',
    isPublished: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit =async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${base_url}/course/create`,formData);
      const data = await response.data;
    if(data.success){
           toast.success(data.message)
           setFormData({
             courseName: '',
    description: '',
    price: '',
    isPublished: false
           })
      route.push(`/admin/course/${data.data.slug}`)

    }

    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="flex justify-center p-8 bg-slate-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">Course Details</h1>
          <p className="text-slate-500 text-sm mt-1">Manage basic information for your course</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Course Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Type size={16} className="text-slate-400" />
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="e.g. Advanced React Patterns"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What will students learn in this course?"
              rows="5"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <DollarSign size={16} className="text-slate-400" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Published Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Eye size={16} className="text-slate-400" />
                Visibility
              </label>
              <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg bg-slate-50">
                <span className={`text-sm font-medium ${formData.isPublished ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {formData.isPublished ? 'Published' : 'Draft'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateCoursePage