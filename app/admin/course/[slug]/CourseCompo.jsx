"use client"
import { base_url, vid_url } from '@/app/utls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { 
  BookOpen, 
  Plus, 
  Video, 
  UploadCloud, 
  FileVideo, 
  Loader2,
  Trash2,
  ChevronRight
} from 'lucide-react'
import LectureList from './LectureList'

const CourseDetail = ({ slug }) => {
  // renamed setCouseData to setCourseData for spelling
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Chapter creation state
  const [chapterName, setChapterName] = useState("")
  const [isAddingChapter, setIsAddingChapter] = useState(false)

  // Video upload state
  const [activeChapterId, setActiveChapterId] = useState(null) // Replaces showAddpassword
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [lessonName, setlessonName] = useState(" ")
  const [isUploading, setIsUploading] = useState(false)


  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${base_url}/course/get/${slug}`);
      if (response.data.success) {
        setCourseData(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to load course details")
      setCourseData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(slug) fetchCourse()
  }, [slug])

  const handleAddChapter = async () => {
    if (chapterName.trim().length <= 2) {
      toast.warning("Chapter name must be at least 3 characters")
      return
    }
    
    setIsAddingChapter(true)
    try {
      const response = await axios.put(`${base_url}/course/addchepter/${courseData._id}`, { 
        chapterName: chapterName 
      })
      
      if (response.data.success) {
        setCourseData(response.data.data) 
        setChapterName("")
        toast.success("Chapter added successfully")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding chapter")
    } finally {
      setIsAddingChapter(false)
    }
  }

  const handleVideoUpload = async (chapterId) => {
    if (!selectedVideo ) return toast.warning("Please select a video file first")
    if (!lessonName || lessonName.length <=2 ) return toast.warning("Please Enter Lession Name first")

    setIsUploading(true)
    const formData = new FormData()
    formData.append('video', selectedVideo)
    formData.append('chapterId', chapterId) 
    formData.append("title",lessonName)

    try {
      const response = await axios.post(`${base_url}/course/upload-video/${courseData._id}`, formData)

      if (response.data.success) {
        toast.success("Video uploaded successfully!")
        setActiveChapterId(null)
        setSelectedVideo(null)
        setlessonName(null)
        fetchCourse() 
      }
    } catch (error) {
      toast.error("Upload failed")
    } finally {
      setIsUploading(false)
    }
  }



  const handleDeleteLecture=async(lessonid,chapterId)=>{
try {
  const response = await axios.put(`${base_url}/course/delete/lession/${courseData._id}`,{
    lessonid,chapterId
  })
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
    fetchCourse()
  }
} catch (error) {
  toast.error(error.response.data.message)
}
  }
  const handleDeleteChapter=async(chapterId)=>{
try {
  const response = await axios.put(`${base_url}/course/delete/chapter/${courseData._id}`,{
    chapterId
  })
  const data = await response.data;
  if(data.success){
    toast.success(data.message)
    fetchCourse()
  }
} catch (error) {
  toast.error(error.response.data.message)
}
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    )
  }





  if (!courseData) return <div className="text-center p-10 text-red-500">Course not found</div>

  return (
    <div className="max mx-auto p-6 space-y-8">
      

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <div>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              Course Details
            </span>
            <h1 className="text-3xl font-bold text-slate-800 mt-3">{courseData.courseName}</h1>
            <p className="text-slate-500 mt-2 text-lg">{courseData.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">₹{courseData.price}</div>
            <div className="text-sm text-slate-400 mt-1">{courseData.chapters?.length || 0} Chapters</div>
          </div>
        </div>
      </div>

      {/* 2. Add Chapter Section */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-slate-700">New Chapter Name</label>
          <input 
            type="text" 
            value={chapterName} 
            onChange={(e) => setChapterName(e.target.value)} 
            placeholder="e.g. Introduction to React Hooks"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <button 
          onClick={handleAddChapter}
          disabled={isAddingChapter}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 transition-colors w-full sm:w-auto justify-center"
        >
          {isAddingChapter ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
          Add Chapter
        </button>
      </div>

      {/* 3. Chapter List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen size={24} className="text-indigo-600" />
          Curriculum
        </h2>

        {courseData.chapters?.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
            No chapters added yet. Start by adding one above!
          </div>
        ) : (
          <div className="grid gap-4">
            {courseData.chapters.map((item, index) => (
              <div key={item._id || index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                
                {/* Chapter Header */}
                <div className="p-4 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-slate-800">{item.title || item.chapterName}</h3>
                  </div>
                  <div className='flex items-center gap-2'>
                  
                      <Trash2 size={17} className='cursor-pointer text-red-600/70' onClick={()=>handleDeleteChapter(item._id)} />
                
                  <button 
                    onClick={() => setActiveChapterId(activeChapterId === item._id ? null : item._id)}
                    className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${activeChapterId === item._id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
                  >
                    {activeChapterId === item._id ? <UploadCloud size={20} /> : <Video size={20} />}
                  </button>
                  </div>
                </div>

               
               <div>
              <LectureList 
              
              chapter={item} 
    vid_url={vid_url}
    onDelete={(lectureId) => handleDeleteLecture( lectureId,item._id,)}
              />
               </div>
                {activeChapterId === item._id && (
                  <div className="bg-slate-50 p-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex-1 w-full">
                         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                           Upload Content
                         </label>
                         <input 
                           type="file" 
                           accept="video/*"
                           onChange={(e) => setSelectedVideo(e.target.files[0])}
                           className="block w-full text-sm text-slate-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-indigo-50 file:text-indigo-700
                             hover:file:bg-indigo-100
                           "
                         />
                      </div>

                        <div className="flex-1 w-full">
                         <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                       Lesson Name
                         </label>
                         <input 
                           type="text" 
                         value={lessonName}
                         placeholder='Lesson Name'
                           onChange={(e) => setlessonName(e.target.value)}
                           className="block w-full"
                         />
                      </div>
                      
                      <button 
                        onClick={() => handleVideoUpload(item._id)}
                        disabled={(!selectedVideo || !lessonName )|| isUploading}
                        className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        {isUploading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />}
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                      </button>
                    </div>
                    
                    {/* Helper text */}
                    {item.videoUrl && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                        <FileVideo size={14} />
                        <span>Current video: {item.videoUrl.split('/').pop()}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetail