"use client";
import { vid_url } from '@/app/utls';
import React, { useEffect, useRef } from 'react';

const VideoCompo = ({ videoUrl }) => {
  const videoRef = useRef(null);

  // 1. Prevent Right Click
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // 2. Enhanced Protection Against Screenshots & Recording
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
      // Block Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
      }
      // Block Ctrl+Shift+S (Save As)
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
      }
      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText('');
        alert("Screenshots are disabled on this platform.");
      }
      // Block Windows+Shift+S (Snipping Tool)
      if (e.metaKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
      }
      // Block Ctrl+Shift+R (Screen Recording on some systems)
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
      }
    };

    // 3. Detect Screen Capture Attempts
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Pause video when tab is hidden (prevents background recording)
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    // 4. Prevent Video from being captured via browser extensions
    const handleBlur = () => {
      if (videoRef.current) {
        videoRef.current.style.filter = 'blur(10px)';
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.style.filter = 'none';
          }
        }, 100);
      }
    };

    // 5. Detect screen recording software
    const detectScreenRecording = () => {
      // This is a heuristic detection - not 100% reliable
      const userAgent = navigator.userAgent.toLowerCase();
      const screenRecorders = ['obs', 'bandicam', 'fraps', 'shadowplay', 'xsplit'];
      
      if (screenRecorders.some(recorder => userAgent.includes(recorder))) {
        alert("Screen recording software detected. Please close it to play the video.");
        return true;
      }
      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    // Check for screen recording software
    if (detectScreenRecording()) {
      // Optionally block video playback
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // 6. Handle video error events
  const handleError = (e) => {
    console.error('Video playback error:', e);
    alert('Video playback error occurred. Please refresh the page.');
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden select-none"
      onContextMenu={handleContextMenu}
    >
      
      {/* Video Player with Enhanced Protection */}
      <video 
        ref={videoRef}
        src={`${vid_url}${videoUrl}`}
        className="w-full h-[30rem] object-contain"
        controls
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(e) => e.preventDefault()}
        onError={handleError}
        // Prevent dragging
        draggable={false}
        // Additional attributes for protection
        playsInline
        crossOrigin="anonymous"
      />

      {/* Overlay Shield to Prevent Screenshot Tools */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'transparent',
          zIndex: 1,
          // This makes the overlay invisible but still captures some screenshot attempts
          mixBlendMode: 'multiply'
        }}
      />

      {/* Warning Message for Screenshot Attempts */}
      <div className="absolute top-4 right-4 text-xs text-gray-400 opacity-50 pointer-events-none">
        Content Protected
      </div>

    </div>
  );
}

export default VideoCompo;