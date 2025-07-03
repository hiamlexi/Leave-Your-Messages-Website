import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import FourthPage from "./FourthPage";
import Navbar from "../components/Navbar";
import ThirdPage from "./ThirdPage";
import MessagePage from "./MessagePage";
import PicturePage from "./PicturePage";
import SafariOptimizations from "../styles/SafariOptimizations";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
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

  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Safari momentum scrolling fix */
  @supports (-webkit-touch-callout: none) {
    scroll-behavior: auto;
    -webkit-scroll-snap-type: y mandatory;
  }
`;

const MainPage = () => {
  const containerRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);

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

  return (
    <>
      <SafariOptimizations />
      <Navbar />
      <Container ref={containerRef}>
        <FirstPage />
        <SecondPage id="my-journey" />
        {scrollContainer && <ThirdPage id="wish-jar" scrollContainer={scrollContainer} />}
        <PicturePage id="memories" />
        <MessagePage id="write-wish" />
        <FourthPage />
      </Container>
    </>
  );
};

export default MainPage;
