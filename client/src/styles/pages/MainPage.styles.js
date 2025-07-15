import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #da4ea2 rgba(255, 255, 255, 0.1);
  color: white;
  background: url("/bg.jpeg");
  overflow-x: hidden;
  position: relative;
  
  /* Safari-specific smooth scrolling optimizations */
  -webkit-overflow-scrolling: touch;
  -webkit-scroll-snap-type: y mandatory;
  -webkit-scroll-behavior: smooth;
  
  /* Improve rendering performance */
  will-change: scroll-position;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000px;
  
  /* Disable scroll-snap on mobile */
  @media (max-width: 738px) {
    scroll-snap-type: none;
    -webkit-scroll-snap-type: none;
    height: auto;
    overflow-y: visible;
  }

  /* Custom scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #da4ea2 0%, #c23d8f 50%, #da4ea2 100%);
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow: 0 0 6px rgba(218, 78, 162, 0.3);
    
    &:hover {
      background: linear-gradient(180deg, #c23d8f 0%, #a02d7a 50%, #c23d8f 100%);
      box-shadow: 0 0 10px rgba(218, 78, 162, 0.5);
    }
    
    &:active {
      background: linear-gradient(180deg, #a02d7a 0%, #8a2569 50%, #a02d7a 100%);
      box-shadow: 0 0 12px rgba(218, 78, 162, 0.7);
    }
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #da4ea2 rgba(255, 255, 255, 0.1);
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const FloatingButtonsContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 9000;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    gap: 12px;
  }
`;

export const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #da4ea2 0%, #c23d8f 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(218, 78, 162, 0.4);
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  
  &:hover {
    animation-play-state: paused;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 6px 25px rgba(218, 78, 162, 0.6);
    background: linear-gradient(135deg, #c23d8f 0%, #a02d7a 100%);
  }
  
  &:active {
    transform: translateY(-2px) scale(0.95);
  }
  
  svg {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    
    svg {
      font-size: 18px;
    }
  }
`;

export const BackToTopButton = styled(FloatingButton)`
  svg {
    transform: rotate(-45deg);
  }
`;

export const MusicToggleButton = styled(FloatingButton)`
  background: ${props => props.$isOpen ? 
    'linear-gradient(135deg, #1db954 0%, #169c46 100%)' : 
    'linear-gradient(135deg, #da4ea2 0%, #c23d8f 100%)'};
  
  &:hover {
    background: ${props => props.$isOpen ? 
      'linear-gradient(135deg, #169c46 0%, #138a3c 100%)' : 
      'linear-gradient(135deg, #c23d8f 0%, #a02d7a 100%)'};
  }
  
  svg {
    animation: ${props => props.$isOpen ? 'pulse 1s ease-in-out infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;