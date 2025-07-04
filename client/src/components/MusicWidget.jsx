import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Sample songs data
const songs = [
  {
    id: 1,
    title: "Happy Birthday Song",
    artist: "Birthday Wishes",
    duration: 180, // 3:00 in seconds
    color: "#ff6b6b"
  },
  {
    id: 2,
    title: "Celebration Time",
    artist: "Party Vibes",
    duration: 226, // 3:46 in seconds
    color: "#4ecdc4"
  },
  {
    id: 3,
    title: "Sweet Memories",
    artist: "Nostalgic Beats",
    duration: 195, // 3:15 in seconds
    color: "#ffe66d"
  },
  {
    id: 4,
    title: "Dancing Lights",
    artist: "Electronic Dreams",
    duration: 240, // 4:00 in seconds
    color: "#a8e6cf"
  }
];

const MusicWidget = ({ isOpen, onClose }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [previousVolume, setPreviousVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentSong.duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setCurrentTime(0);
    setIsLiked(false);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setCurrentTime(0);
      setIsLiked(false);
    }
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setVolume(percentage);
    setIsMuted(false);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = Math.floor(percentage * currentSong.duration);
    setCurrentTime(newTime);
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <StyledWrapper
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card">
              <CloseButton onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}>×</CloseButton>
              <div className="top">
                <div className="pfp" style={{ backgroundColor: currentSong.color }}>
                  <div className="playing">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={`greenline line-${i} ${!isPlaying ? 'paused' : ''}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="texts">
                  <p className="title-1">{currentSong.title}</p>
                  <p className="title-2">{currentSong.artist}</p>
                </div>
              </div>
              <div className="controls">
                <svg 
                  className="volume_button" 
                  width={24} 
                  height={20} 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleMuteToggle}
                  style={{ cursor: 'pointer' }}
                >
                  {isMuted || volume === 0 ? (
                    <path fillRule="evenodd" d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26ZM15.293 9.293a1 1 0 0 1 1.414 0l1.293 1.293 1.293-1.293a1 1 0 1 1 1.414 1.414L19.414 12l1.293 1.293a1 1 0 0 1-1.414 1.414L18 13.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L16.586 12l-1.293-1.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm6.328-.176a1.2 1.2 0 0 1 1.697 0A11.967 11.967 0 0 1 22.8 12a11.966 11.966 0 0 1-3.515 8.485 1.2 1.2 0 0 1-1.697-1.697A9.563 9.563 0 0 0 20.4 12a9.565 9.565 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.393a1.2 1.2 0 0 1 1.698 0A7.178 7.178 0 0 1 18 12a7.18 7.18 0 0 1-2.108 5.092 1.2 1.2 0 1 1-1.698-1.698A4.782 4.782 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.698Z" clipRule="evenodd" />
                  )}
                </svg>
                <div className="volume" onMouseDown={handleVolumeChange}>
                  <div className="slider">
                    <div className="green" style={{ width: `${isMuted ? 0 : volume}%` }} />
                  </div>
                  <div className="circle" style={{ left: `${isMuted ? 0 : volume}%` }} />
                </div>
                <svg 
                  width={24} 
                  height={24} 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handlePrevious}
                  style={{ cursor: 'pointer' }}
                >
                  <path fillRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" clipRule="evenodd" />
                </svg>
                <svg 
                  width={24} 
                  height={24} 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handlePlayPause}
                  style={{ cursor: 'pointer' }}
                >
                  {isPlaying ? (
                    <path fillRule="evenodd" d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0ZM8.4 9.6a1.2 1.2 0 1 1 2.4 0v4.8a1.2 1.2 0 1 1-2.4 0V9.6Zm6-1.2a1.2 1.2 0 0 0-1.2 1.2v4.8a1.2 1.2 0 1 0 2.4 0V9.6a1.2 1.2 0 0 0-1.2-1.2Z" clipRule="evenodd" />
                  ) : (
                    <path d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0ZM9.6 8.4v7.2l6-3.6-6-3.6Z" />
                  )}
                </svg>
                <svg 
                  width={24} 
                  height={24} 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleNext}
                  style={{ cursor: 'pointer' }}
                >
                  <path fillRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" clipRule="evenodd" />
                </svg>
                <div className="air" />
                <svg 
                  width={24} 
                  height={20} 
                  fill={isLiked ? "#da4ea2" : "none"} 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setIsLiked(!isLiked)}
                  style={{ cursor: 'pointer', color: isLiked ? "#da4ea2" : "white" }}
                >
                  <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z" />
                </svg>
              </div>
              <div className="time" onClick={handleProgressClick}>
                <div className="elapsed" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="timetext time_now">{formatTime(currentTime)}</p>
              <p className="timetext time_full">{formatTime(currentSong.duration)}</p>
            </div>
          </StyledWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const StyledWrapper = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 9999;

  .card {
    position: relative;
    width: 260px;
    height: 130px;
    background: #151515;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .top {
    position: relative;
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .pfp {
    position: relative;
    top: 5px;
    left: 5px;
    height: 40px;
    width: 40px;
    background-color: #d2d2d2;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
  }

  .title-1 {
    color: white;
    font-size: 16px;
    font-weight: bolder;
    margin-left: 5px;
    margin: 0;
    line-height: 1.2;
  }

  .title-2 {
    color: lightgrey;
    font-size: 12px;
    font-weight: bold;
    margin-top: 2px;
    margin-left: 5px;
  }

  .time {
    width: 90%;
    background-color: #5e5e5e;
    height: 6px;
    border-radius: 3px;
    position: absolute;
    left: 5%;
    bottom: 21px;
    cursor: pointer;
    transition: height 0.2s ease;
  }

  .time:hover {
    height: 8px;
  }

  .elapsed {
    width: 42%;
    background-color: #1db954;
    height: 100%;
    border-radius: 3px;
    transition: width 0.2s ease;
  }

  .controls {
    color: white;
    display: flex;
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .volume {
    height: 100%;
    width: 50px;
    margin-right: 2px;
    cursor: pointer;
  }

  .air {
    height: 100%;
    width: 54px;
  }

  .controls svg {
    cursor: pointer;
    transition: 0.1s;
    margin-bottom: 5px;
  }

  .controls svg:hover {
    color: #1db954;
  }

  .volume {
    opacity: 0;
    position: relative;
    transition: 0.2s;
  }

  .volume .slider {
    height: 4px;
    background-color: #5e5e5e;
    width: 80%;
    border-radius: 2px;
    margin-top: 8px;
    margin-left: 10%;
  }

  .volume .slider .green {
    background-color: #1db954;
    height: 100%;
    width: 80%;
    border-radius: 3px;
    transition: width 0.2s ease;
  }

  .volume .circle {
    background-color: white;
    height: 8px;
    width: 8px;
    border-radius: 4px;
    position: absolute;
    top: 6px;
    transform: translateX(-50%);
    transition: left 0.2s ease;
  }

  .volume_button:hover ~ .volume {
    opacity: 1;
  }

  .volume:hover {
    opacity: 1;
  }

  .timetext {
    color: white;
    font-size: 8px;
    position: absolute;
  }

  .time_now {
    bottom: 8px;
    left: 15px;
  }

  .time_full {
    bottom: 8px;
    right: 14px;
  }

  .playing {
    display: flex;
    position: relative;
    justify-content: center;
    gap: 1px;
    width: 30px;
    height: 20px;
  }

  .greenline {
    background-color: #1db954;
    height: 20px;
    width: 2px;
    position: relative;
    transform-origin: bottom;
  }

  .greenline.paused {
    animation-play-state: paused;
    transform: scaleY(0.3);
  }

  .line-1 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.2s;
  }

  .line-2 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.5s;
  }

  .line-3 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.6s;
  }

  .line-4 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0s;
  }

  .line-5 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.4s;
  }

  @keyframes playing {
    0% {
      transform: scaleY(0.1);
    }

    33% {
      transform: scaleY(0.6);
    }

    66% {
      transform: scaleY(0.9);
    }

    100% {
      transform: scaleY(0.1);
    }
  }

  @media (max-width: 768px) {
    bottom: 80px;
    right: 20px;
    
    .card {
      width: 240px;
      height: 120px;
    }
  }

  @media (max-width: 480px) {
    bottom: 70px;
    right: 10px;
    
    .card {
      width: 220px;
      height: 110px;
    }
    
    .title-1 {
      font-size: 14px;
    }
    
    .title-2 {
      font-size: 11px;
    }
  }
`;

export default MusicWidget;