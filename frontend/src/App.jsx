import { useState, useRef, useEffect } from 'react'
import './App.css'

function VideoStream() {
  const videoRef = useRef(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/video");
    setWs(socket);

    socket.onmessage = (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      if (videoRef.current) {
        videoRef.current.src = url;
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <img ref={videoRef} alt="Video Stream" className="rounded-lg shadow-lg" />
    </div>
  );
}

export default VideoStream;
