import React from 'react';
import { Trash2, Edit2, PlayCircle, VideoOff } from 'lucide-react';

const LectureList = ({ chapter, vid_url, onDelete }) => {
  
  // Handle case where lectures might be undefined
  const lectures = chapter?.lectures || [];

  if (lectures.length === 0) {
    return (
      <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg">
        <VideoOff className="mx-auto text-slate-300 mb-2" size={32} />
        <p className="text-slate-500 text-sm">No lectures uploaded in this chapter yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4 grid grid-cols-4 gap-2">
      {lectures.map((lecture, index) => (
        <div 
          key={lecture._id || index} 
          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
        >
          {/* Header Section: Title & Actions */}
          <div className="px-5 py-4 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <h4 className="font-medium text-slate-800 text-sm md:text-base">
                {lecture.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
           
              
              <button 
                onClick={() => onDelete && onDelete(lecture._id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Lecture"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="bg-black relative aspect-video w-full">
            <video 
              className="w-full h-full object-contain"
              controls
              src={`${vid_url}${lecture.videoUrl}`}
              poster="https://via.placeholder.com/640x360?text=Video+Preview"
              
            >
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded">
              Video Preview
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LectureList;