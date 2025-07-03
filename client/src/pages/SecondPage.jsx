import { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

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
  @import url('https://fonts.googleapis.com/css?family=Amaranth|Source+Sans+Pro&display=swap');
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
  position: absolute;
  bottom: 110%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Msg = styled.h1`
  font-size: 40px;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
`;

const SubMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;
const Subtitle = styled.h2`
  color: #da4ea2;
`;
const Desc = styled.p`
  font-size: 24px;
  color: lightgray;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;
const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2.5 / 1;
  border-radius: 60px;
  z-index: 0;
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

  &:hover ${Tooltip} {
    opacity: 1;
  }

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
`;

const PlaneImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const ExpandableStorySection = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #0a0a0a;
  overflow: hidden;
  max-height: ${props => props.$isExpanded ? '100vh' : '0'};
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.6s ease-out;
  z-index: 10;
`;

const StoryScrollContainer = styled.div`
  height: 100vh;
  overflow-y: ${props => props.$isExpanded ? 'auto' : 'hidden'};
  overflow-x: hidden;
  scroll-behavior: smooth;
  
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

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #da4ea2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 11;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
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
  font-size: 50px;
  background: linear-gradient(90deg, #da4ea2, #fcf0f7, #da4ea2);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;

  @media (max-width: 767px) {
    font-size: 40px;
  }

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
  font-size: 20px;
  letter-spacing: -0.02em;

  @media (max-width: 767px) {
    font-size: 18px;
  }
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
  font-family: 'Amaranth', sans-serif;
  font-size: 24px;
  margin: 0 0 16px 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const TimelineDescription = styled.p`
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4em;
  margin: 16px 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
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
  const itemRefs = useRef([]);
  const storyContainerRef = useRef(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 738);
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
    // Small delay to ensure expansion animation starts before scrolling
    setTimeout(() => {
      storyContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCloseStory = () => {
    setIsStoryExpanded(false);
    setVisibleItems(new Set());
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
          <PlaneButton onClick={handlePlaneClick}>
            <Tooltip>Click here to see my journey</Tooltip>
            <PlaneImage src={aeroplane} alt="Plane" />
          </PlaneButton>
        </VideoWrapper>
        
        <ExpandableStorySection $isExpanded={isStoryExpanded}>
          {isStoryExpanded && (
            <CloseButton onClick={handleCloseStory}>×</CloseButton>
          )}
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
                  
                  {/* 3D MODEL SECTION */}
                  <div style={{ height: '100vh', width: '100%' }}>
                    <Canvas camera={{ position: [0, 1.5, 6], fov: 40 }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[2, 2, 2]} />
                      <PCModel
                        scale={isMobile ? 1 : 1.5}
                        rotation={[0, -Math.PI / 2, 0]}
                        position={isMobile ? [0.3, -0.2, 0] : [0.5, 0, 0]}
                      />
                      <OrbitControls enableZoom={false} />
                      <Environment preset="sunset" />
                    </Canvas>
                  </div>
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
