"use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart, 
  Settings, 
  LogOut, 
  PlusCircle,
  GraduationCap,
  UserPlus,
   
  
} from 'lucide-react';
import axios from 'axios';
import { base_url } from '@/app/utls';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const route = useRouter()
   


  const navItems = [
    // { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
    { name: 'All Courses', icon: BookOpen, href: '/admin/courses' },
    { name: 'Add New Course', icon: PlusCircle, href: '/admin/course-create' },
    { name: 'Students', icon: Users, href: '/admin/student' },
    { name: 'Student Create', icon: UserPlus , href: '/admin/student/create' },
    { name: 'Analytics', icon: BarChart, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  


const handelLogout = async()=>{
  try {
    const response = await axios.get(`${base_url}/admin/logout`)
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
route.push("/adminlogin")
    }
  } catch (error) {
          toast.error(error.response.data.message)

  }
}



  return (
    <aside className="flex flex-col h-screen w-64 bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300">
      
      {/* 1. Logo / Brand Section */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <GraduationCap size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide">AdminPanel</h1>
          <span className="text-xs text-slate-400 uppercase tracking-wider">Course Manager</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeLink === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveLink(item.name)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* 3. User Profile / Footer */}
      <div className="p-4 border-t border-slate-800">
        <div onClick={handelLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=c7d2fe&color=3730a3" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-slate-600 group-hover:border-indigo-500 transition-colors"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate text-slate-200">Admin User</h4>
            <p className="text-xs text-slate-500 truncate">admin@course.com</p>
          </div>
          <LogOut size={18} className="text-slate-500 group-hover:text-red-400 transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;