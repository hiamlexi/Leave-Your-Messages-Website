import { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import FourthPage from "./FourthPage";
import Navbar from "../components/Navbar";
// import ThirdPage from "./ThirdPage";
import MessagePage from "./MessagePage";
import PicturePage from "./PicturePage";
import SafariOptimizations from "../styles/SafariOptimizations";
import { FaPlane, FaMusic } from "react-icons/fa";
import MusicWidget from "../components/MusicWidget";
import GlobalFonts from "../styles/GlobalFonts";

const Container = styled.div`
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

const FloatingButtonsContainer = styled.div`
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

const FloatingButton = styled.button`
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

const BackToTopButton = styled(FloatingButton)`
  svg {
    transform: rotate(-45deg);
  }
`;

const MusicToggleButton = styled(FloatingButton)`
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

const MainPage = () => {
  const containerRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setScrollContainer(containerRef.current);
      
      // Safari-specific smooth scroll enhancement
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        // Add passive touch event listeners for better performance
        containerRef.current.addEventListener('touchstart', () => {}, { passive: true });
        containerRef.current.addEventListener('touchmove', () => {}, { passive: true });
        
        // Override scrollIntoView for Safari
        const originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(options) {
          if (isSafari && options && options.behavior === 'smooth') {
            const targetElement = this;
            const container = containerRef.current;
            
            if (container && container.contains(targetElement)) {
              const targetPosition = targetElement.offsetTop;
              const startPosition = container.scrollTop;
              const distance = targetPosition - startPosition;
              const duration = 1000; // 1 second for smooth scroll
              let start = null;
              
              const smoothScroll = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function for smooth animation
                const easeInOutCubic = percentage => {
                  return percentage < 0.5
                    ? 4 * percentage * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                };
                
                container.scrollTop = startPosition + (distance * easeInOutCubic(percentage));
                
                if (progress < duration) {
                  requestAnimationFrame(smoothScroll);
                }
              };
              
              requestAnimationFrame(smoothScroll);
              return;
            }
          }
          
          originalScrollIntoView.call(this, options);
        };
      }
    }
  }, []);

  const scrollToTop = () => {
    console.log('Scroll to top clicked');
    
    // Try multiple methods to ensure scrolling works
    if (containerRef.current) {
      console.log('Container found:', containerRef.current);
      
      // Method 1: Direct scrollTop
      containerRef.current.scrollTop = 0;
      
      // Method 2: scrollTo as backup
      setTimeout(() => {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 10);
    }
    
    // Method 3: Try document.documentElement as fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <GlobalFonts />
      <SafariOptimizations />
      <Navbar />
      <Container ref={containerRef}>
        <FirstPage />
        <SecondPage id="my-journey" />
        {/* {scrollContainer && <ThirdPage id="wish-jar" scrollContainer={scrollContainer} />} */}
        <PicturePage id="memories" />
        <MessagePage id="write-wish" />
        <FourthPage />
      </Container>
      <FloatingButtonsContainer>
        <MusicToggleButton 
          onClick={() => setIsMusicOpen(!isMusicOpen)} 
          aria-label="Toggle music player"
          $isOpen={isMusicOpen}
          $delay="0.5s"
        >
          <FaMusic />
        </MusicToggleButton>
        <BackToTopButton onClick={scrollToTop} aria-label="Back to top">
          <FaPlane />
        </BackToTopButton>
      </FloatingButtonsContainer>
      <MusicWidget isOpen={isMusicOpen} onClose={() => setIsMusicOpen(false)} />
    </>
  );
};

export default MainPage;
