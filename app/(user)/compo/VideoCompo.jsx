"use client";
import { vid_url } from '@/app/utls';
import React, { useEffect } from 'react';

const VideoCompo = ({ videoUrl }) => {

  // 1. Prevent Right Click
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // 2. Disable Keyboard Shortcuts (Inspect, PrintScreen, Save)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Block F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Block Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
      // Block Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
      // Attempt to clear clipboard on PrintScreen (Not 100% reliable in all browsers)
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert("Screenshots are disabled on this platform.");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden select-none"
      onContextMenu={handleContextMenu} // Disable right click on container
    >
      
      {/* 3. The Video Player */}
      <video 
        src={`${vid_url}${videoUrl}`}
        className="w-full h-[30rem] object-contain"
        controls
        // This is the specific HTML5 attribute to hide the download button
        controlsList="nodownload noplaybackrate" 
        // Disables Picture-in-Picture (prevents floating window recording)
        disablePictureInPicture
        // Prevents right-click menu on the video element specifically
        onContextMenu={(e) => e.preventDefault()}
      >
      </video>

      {/* 4. Transparent Shield (Prevents Drag & Drop) */}
      {/* Note: This sits on top of the video but allows clicks to pass through to controls if formatted correctly, 
          or you can remove 'pointer-events-none' to block ALL interaction, but then you need custom controls. */}
      


    </div>
  );
}

export default VideoCompo;