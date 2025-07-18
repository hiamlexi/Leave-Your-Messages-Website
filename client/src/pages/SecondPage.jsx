import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { media, responsiveFontSize } from "../styles/breakpoints";

import video from "../assets/sky.mp4";
import aeroplane from "../assets/plane.png";
import Berlin from '../assets/Berlin.avif';
import exam from '../assets/exam.gif';
import newyear from '../assets/newyear.webp';
import summer from '../assets/summer.gif';
import winter from '../assets/winter.gif';
import PCModel from '../components/3dModelPC';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const FontStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
`;

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tooltip = styled.span`
  position: fixed;
  background: linear-gradient(135deg, #da4ea2 0%, #c23d8f 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translate(-50%, -150%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  box-shadow: 0 4px 20px rgba(218, 78, 162, 0.4);
  backdrop-filter: blur(10px);
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #c23d8f;
  }
`;

const Msg = styled.h1`
  ${responsiveFontSize('40px', '36px', '32px', '28px', '24px')}
  font-family: 'Poppins', sans-serif;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
`;

const SubMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center;

  ${media.md} {
    padding: 20px;
    flex-direction: column;
  }

  ${media.sm} {
    padding: 15px;
  }

  ${media.xs} {
    padding: 10px;
  }
`;
const Subtitle = styled.h2`
  color: #da4ea2;
  ${responsiveFontSize('24px', '22px', '20px', '18px', '16px')}
  font-family: 'Poppins', sans-serif;
  margin: 0;
`;
const Desc = styled.p`
  ${responsiveFontSize('24px', '22px', '20px', '18px', '16px')}
  font-family: 'Poppins', sans-serif;
  color: lightgray;
  text-align: center;
  margin: 10px 0;

  ${media.md} {
    padding: 20px;
  }

  ${media.sm} {
    padding: 15px;
  }

  ${media.xs} {
    padding: 10px;
  }
`;
const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2.5 / 1;
  border-radius: 60px;
  z-index: 0;

  ${media.lg} {
    width: 85%;
    max-width: 800px;
  }

  ${media.md} {
    width: 80%;
    max-width: 600px;
    aspect-ratio: 2 / 1;
  }

  ${media.sm} {
    width: 95%;
    border-radius: 40px;
  }

  ${media.xs} {
    width: 98%;
    border-radius: 30px;
    aspect-ratio: 1.5 / 1;
  }
`;
const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100px;
`;

const PlaneButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 135%;
    height: 135%;
  }
  
  background: none;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
`;

const PlaneImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  ${PlaneButton}:active & {
    transform: scale(0.95);
  }
`;

const ExpandableStorySection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0a0a0a;
  overflow: hidden;
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  visibility: ${props => props.$isExpanded ? 'visible' : 'hidden'};
  transform: ${props => props.$isExpanded ? 'translateY(0)' : 'translateY(100%)'};
  transition: opacity 0.6s ease-out,
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0s ${props => props.$isExpanded ? '0s' : '0.6s'};
  z-index: 9999;
  pointer-events: ${props => props.$isExpanded ? 'auto' : 'none'};
`;

const StoryScrollContainer = styled.div`
  height: 100vh;
  overflow-y: ${props => props.$isExpanded ? 'auto' : 'hidden'};
  overflow-x: hidden;
  scroll-behavior: smooth;
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  transition: opacity 0.8s ease-out 0.5s;
  position: relative;
  z-index: 1;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #da4ea2;
    border-radius: 4px;
  }
`;

const CloseButtonWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999999;
  pointer-events: auto;
`;

const CloseButton = styled.button`
  background: #da4ea2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(218, 78, 162, 0.4);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: #c23d8f;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Story Timeline Components
const SectionTimeline = styled.section`
  background-color: #0a0a0a;
  position: relative;
  height: auto !important;
  min-height: 100vh;
  padding: 2em 0;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 1360px;
  margin: 0 auto;
`;

const VerticalPadding = styled.div`
  padding: 120px 0;

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const HeadingWrapper = styled.div`
  text-align: center;
  color: white;
  max-width: 640px;
  margin: 0 auto;
`;

const Title = styled.h2`
  ${responsiveFontSize('50px', '45px', '40px', '35px', '30px')}
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  background: linear-gradient(90deg, #da4ea2, #fcf0f7, #da4ea2);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  text-align: center;
  margin: 20px 0;

  @keyframes shine {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 200%;
    }
  }
`;

const ParagraphLarge = styled.p`
  ${responsiveFontSize('20px', '19px', '18px', '17px', '16px')}
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.6;
  text-align: center;
`;

const TimelineComponent = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  
  &:before {
    background: #f1efef;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 4px;
    
    @media (max-width: 968px) {
      left: 0;
    }
  }
`;

const TimelineItem = styled.li`
  clear: both;
  list-style-type: none;
  padding: 0 30px;
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  
  &:before {
    background: #8ed6d6;
    border-radius: 50%;
    content: '';
    height: 20px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 20px;
    top: 0;
    z-index: 1;
    
    @media (max-width: 968px) {
      left: 0;
      transform: none;
    }
  }
  
  &:nth-child(2):before {
    background: #bea4ec;
  }
  
  &:nth-child(3):before {
    background: #aec785;
  }
  
  &:nth-child(4):before {
    background: #61d4d7;
  }
  
  &:nth-child(5):before {
    background: #da4ea2;
  }

  @media (max-width: 968px) {
    padding: 0 0 0 30px;
    width: 100%;
  }
`;

const TimelineContent = styled.div`
  background: #8ed6d6;
  border: 2px solid #8ed6d6;
  border-radius: 8px;
  padding: 1.5em;
  width: 46%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? props.$animation || 'fadeIn' : 'none'} 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  ${TimelineItem}:nth-child(even) & {
    float: right;
    animation-name: fadeInRight;
    
    @media (max-width: 968px) {
      float: none;
      animation-name: fadeIn;
    }
  }
  
  ${TimelineItem}:nth-child(odd) & {
    float: left;
    clear: right;
    animation-name: fadeInLeft;
    
    @media (max-width: 968px) {
      float: none;
      animation-name: fadeIn;
    }
  }
  
  ${TimelineItem}:nth-child(2) & {
    background: #bea4ec;
    border: 2px solid #bea4ec;
  }
  
  ${TimelineItem}:nth-child(3) & {
    background: #aec785;
    border: 2px solid #aec785;
  }
  
  ${TimelineItem}:nth-child(4) & {
    background: #61d4d7;
    border: 2px solid #61d4d7;
  }
  
  ${TimelineItem}:nth-child(5) & {
    background: #da4ea2;
    border: 2px solid #da4ea2;
  }
  
  @media (max-width: 968px) {
    width: 100%;
    margin: 2em 0;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    50% {
      opacity: 0.5;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-40px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(40px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const TimelineDate = styled.h3`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  ${responsiveFontSize('24px', '22px', '20px', '18px', '16px')}
  margin: 0 0 16px 0;
  
  ${media.sm} {
    margin: 0 0 12px 0;
  }

  ${media.xs} {
    margin: 0 0 8px 0;
  }
`;

const TimelineDescription = styled.p`
  color: white;
  font-family: 'Poppins', sans-serif;
  ${responsiveFontSize('18px', '17px', '16px', '15px', '14px')}
  font-weight: 400;
  line-height: 1.4em;
  margin: 16px 0;
  
  ${media.sm} {
    margin: 12px 0;
    line-height: 1.5em;
  }

  ${media.xs} {
    margin: 8px 0;
  }
`;

const TimelineImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const events = [
  {
    date: "January 2024",
    text: "Vacation in Berlin with my friends",
    img: Berlin,
    alt: "Berlin",
  },
  {
    date: "March 2024",
    text: "Studying hard for the up-coming exam",
    img: exam,
    alt: "Exam",
  },
  {
    date: "July 2024",
    text: "Finally its summer time",
    subtext: "And ice-cream timeeeeeeeeeeeeeeeeeeeeeeeeee",
    img: summer,
    alt: "Summer",
  },
  {
    date: "November 2024",
    text: "Almost a year has went by O.O",
    img: winter,
    alt: "Winter",
  },
  {
    date: "January 2025",
    text: "Celebrating new year with my fam",
    img: newyear,
    alt: "Newyear",
  },
];

const SecondPage = (props) => {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRefs = useRef([]);
  const storyContainerRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isStoryExpanded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
        root: storyContainerRef.current
      }
    );

    const refs = itemRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isStoryExpanded]);

  const handlePlaneClick = () => {
    setIsStoryExpanded(true);
    // Ensure story container starts at top
    setTimeout(() => {
      if (storyContainerRef.current) {
        storyContainerRef.current.scrollTop = 0;
      }
    }, 100);
  };


  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <FontStyles />
      <Section id={props.id} style={{ position: 'relative' }}>
        <Msg>My Journey</Msg>
        <SubMessage>
          <Subtitle>
            26 years of life, 26 years of growth. Every journey shaped me. 🌍✈️
          </Subtitle>
        </SubMessage>
        <Desc>
          Grateful for all the places I've been, the people I've met, and the
          lessons along the way.
        </Desc>
        <VideoWrapper>
          <StyledVideo src={video} autoPlay muted loop />
          <PlaneButton 
            onClick={handlePlaneClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <PlaneImage src={aeroplane} alt="Plane" />
          </PlaneButton>
          <Tooltip 
            style={{ 
              left: tooltipPosition.x + 'px', 
              top: tooltipPosition.y + 'px',
              opacity: showTooltip ? 1 : 0,
              transform: showTooltip ? 'translate(-50%, -150%)' : 'translate(-50%, -140%)'
            }}
          >
            Click here to see my journey
          </Tooltip>
        </VideoWrapper>
        
        {/* Close button using React Portal */}
        {isStoryExpanded && createPortal(
          <CloseButtonWrapper>
            <CloseButton 
              onClick={() => {
                setIsStoryExpanded(false);
                setVisibleItems(new Set());
              }} 
              type="button"
              aria-label="Close story"
            >
              ×
            </CloseButton>
          </CloseButtonWrapper>,
          document.body
        )}
        
        <ExpandableStorySection $isExpanded={isStoryExpanded}>
          <StoryScrollContainer ref={storyContainerRef} $isExpanded={isStoryExpanded}>
            <SectionTimeline>
              <Container>
                <VerticalPadding>
                  <HeadingWrapper>
                    <Title>The story of my 26</Title>
                    <ParagraphLarge>
                      Not the beginning, not the end, just one unforgettable page <br />
                      As 26 slips away, I just want to carry forward a little more softness, a little more courage, and a little less fear.
                    </ParagraphLarge>
                  </HeadingWrapper>
                  
                  {/* 3D MODEL SECTION - Hidden on mobile */}
                  {!isMobile && (
                    <div style={{ height: '100vh', width: '100%' }}>
                      <Canvas camera={{ position: [0, 1.5, 6], fov: 40 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 2]} />
                        <PCModel
                          scale={1.5}
                          rotation={[0, -Math.PI / 2, 0]}
                          position={[0.5, 0, 0]}
                        />
                        <OrbitControls enableZoom={false} />
                        <Environment preset="sunset" />
                      </Canvas>
                    </div>
                  )}
                </VerticalPadding>
                
                <TimelineComponent>
                  {events.map((event, index) => (
                    <TimelineItem key={index}>
                      <TimelineContent 
                        ref={(el) => (itemRefs.current[index] = el)}
                        data-index={index}
                        $isVisible={visibleItems.has(index)}
                        $animation={isMobile ? 'fadeIn' : (index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight')}
                        style={{ animationDelay: visibleItems.has(index) ? `${index * 0.15}s` : '0s' }}
                      >
                        <TimelineImage
                          src={event.img}
                          alt={event.alt}
                          loading="lazy"
                        />
                        <TimelineDate>{event.date}</TimelineDate>
                        <TimelineDescription>
                          {event.text}
                          {event.subtext && <><br/>{event.subtext}</>}
                        </TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineComponent>
                
                <div style={{ height: "50vh" }}></div>
              </Container>
            </SectionTimeline>
          </StoryScrollContainer>
        </ExpandableStorySection>
      </Section>
    </>
  );
};

export default SecondPage;
