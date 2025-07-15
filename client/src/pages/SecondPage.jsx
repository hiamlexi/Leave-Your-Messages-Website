import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FontStyles,
  Section,
  Tooltip,
  Msg,
  SubMessage,
  Subtitle,
  Desc,
  VideoWrapper,
  StyledVideo,
  PlaneButton,
  PlaneImage,
  ExpandableStorySection,
  StoryScrollContainer,
  CloseButtonWrapper,
  CloseButton,
  SectionTimeline,
  Container,
  VerticalPadding,
  HeadingWrapper,
  Title,
  ParagraphLarge,
  TimelineComponent,
  TimelineItem,
  TimelineContent,
  TimelineDate,
  TimelineDescription,
  TimelineImage
} from "../styles/pages/SecondPage.styles";

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
