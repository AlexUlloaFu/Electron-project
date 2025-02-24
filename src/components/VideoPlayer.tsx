import { useEffect, useState } from "react";

interface VideoPlayerProps {
    videos : string[];
    currentIndex: number;
    onIndexChange?: (newIndex: number) => void;
}

function VideoPlayer({ videos, currentIndex, onIndexChange } : VideoPlayerProps) {
  const [currentVideo , setCUrrentVideo] = useState<string>('')

  useEffect(() => {
    if(videos.length > 0 && currentIndex >= 0 && currentIndex < videos.length)
        setCUrrentVideo(videos[currentIndex])
  }, [videos, currentIndex])    

  const handleNext = () => {
    if (onIndexChange) {
      onIndexChange((currentIndex + 1) % videos.length);
    }
  };

  const handlePrevious = () => {
    if (onIndexChange) {
      onIndexChange((currentIndex - 1 + videos.length) % videos.length);
    }
  };

  if(!currentVideo) return 
  
  return (
    <div className="video-container">
      <video 
        controls 
        autoPlay
        style={{ width: '100%', height: '100%' }}
        key={currentVideo} // Force re-render when source changes
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span>Video {currentIndex + 1} of {videos.length}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default VideoPlayer