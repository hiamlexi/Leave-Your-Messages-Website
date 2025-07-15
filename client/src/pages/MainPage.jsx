import { useRef, useEffect, useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import FourthPage from "./FourthPage";
import Navbar from "../components/Navbar";
import MessagePage from "./MessagePage";
import PicturePage from "./PicturePage";
import SafariOptimizations from "../styles/SafariOptimizations";
import { FaPlane, FaMusic } from "react-icons/fa";
import MusicWidget from "../components/MusicWidget";
import GlobalFonts from "../styles/GlobalFonts";
import {
  Container,
  FloatingButtonsContainer,
  BackToTopButton,
  MusicToggleButton
} from "../styles/pages/MainPage.styles";

const MainPage = () => {
  const containerRef = useRef(null);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
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
    
    // Check if mobile
    const isMobile = window.innerWidth <= 738;
    
    if (isMobile) {
      // On mobile, scroll the window
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // On desktop, scroll the container
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
    }
  };

  return (
    <>
      <GlobalFonts />
      <SafariOptimizations />
      <Navbar />
      <Container ref={containerRef}>
        <FirstPage />
        <SecondPage id="my-journey" />
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
