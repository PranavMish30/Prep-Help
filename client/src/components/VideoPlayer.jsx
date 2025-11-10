import React from 'react';
import YouTube from 'react-youtube';

// Helper function to extract the YouTube video ID from a URL
const extractVideoId = (url) => {
  if (!url) return null;

  // Pattern for standard URLs (youtube.com/watch?v=ID)
  let match = url.match(/(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=)([^&?"]+)/);
  if (match && match[1].length === 11) {
    return match[1];
  }

  // If the input is already just the ID
  if (url.length === 11 && !url.includes('/')) {
    return url;
  }
  
  return null;
};

const VideoPlayer = ({ videoUrl }) => {
  const videoId = extractVideoId(videoUrl);

  // Configuration options for the YouTube player
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0, // Do not autoplay initially
    },
  };

  if (!videoId) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        Please enter a valid YouTube video URL or ID.
      </div>
    );
  }

  // Event handlers (optional, but good for tracking)
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log('YouTube Player is Ready');
  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  return (
    <div className="video-player-wrapper" style={{ margin: '20px auto', maxWidth: '640px' }}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onError={onError} />
    </div>
  );
};

export default VideoPlayer;