import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

const FontStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Amaranth|Source+Sans+Pro&display=swap');
`;
import Berlin from '../assets/Berlin.avif';
import exam from '../assets/exam.gif';
import newyear from '../assets/newyear.webp';
import summer from '../assets/summer.gif';
import winter from '../assets/winter.gif';
import Navbar from "../components/Navbar";
import PCModel from '../components/3dModelPC';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';

const PageWrapper = styled.div`
  position: relative;
  z-index: 0;
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  background: url("/bg.jpeg");
`;

const SectionHeading = styled.section`
  background-color: #0a0a0a;
`;

<div style={{ height: '70vh', width: '100%' }}>
  <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} intensity={1} />
    <PCModel scale={0.5} />
    <OrbitControls enableZoom={false} />
    <Environment preset="sunset" />
  </Canvas>
</div>


const SectionTimeline = styled.section`
  background-color: #0a0a0a;
  position: relative;
  z-index: -3;
  height: auto !important;
  min-height: 100vh;
  scroll-snap-align: none !important;
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
  animation: ${props => props.$isVisible ? props.$animation || 'fadeIn' : 'none'} 1.2s ease-out forwards;
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
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
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




const OverlayFadeTop = styled.div`
  background-image: linear-gradient(#0a0a0a, #0a0a0a00);
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const OverlayFadeBottom = styled.div`
  background-image: linear-gradient(to top, #0a0a0a, #0a0a0a00);
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 738);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  return (
    <PageWrapper>
      <FontStyles />

      <SectionHeading>
        <Container>
          <Navbar />
          <VerticalPadding>
            <HeadingWrapper>
              <Title>The story of my 26</Title>
              <ParagraphLarge>
                Not the beginning, not the end, just one unforgettable page <br />
                As 26 slips away, I just want to carry forward a little more softness, a little more courage, and a little less fear.
              </ParagraphLarge>
            </HeadingWrapper>
            {/* --- 3D MODEL SECTION --- */}
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
        </Container>
      </SectionHeading>

      <SectionTimeline>
        <Container>
          <TimelineComponent>
            {events.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineContent 
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  $isVisible={visibleItems.has(index)}
                  $animation={isMobile ? 'fadeIn' : (index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight')}
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

            <OverlayFadeTop />
            <OverlayFadeBottom />
          </TimelineComponent>
        </Container>

        <div style={{ height: "50vh" }}></div>
      </SectionTimeline>
    </PageWrapper>
  );
};

export default Timeline;
