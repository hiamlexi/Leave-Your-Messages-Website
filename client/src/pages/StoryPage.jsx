import styled from "styled-components";
import Berlin from '../assets/Berlin.avif';
import exam from '../assets/exam.gif';
import newyear from '../assets/newyear.webp';
import summer from '../assets/summer.gif';
import winter from '../assets/winter.gif';
import Navbar from "../components/Navbar";
import PCModel from '../components/3dModelPC';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useState, useEffect } from 'react';

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

const TimelineComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
`;

const TimelineProgress = styled.div`
  position: absolute;
  width: 3px;
  height: 100%;
  background-color: #414141;
  z-index: -2;
`;

const TimelineProgressBar = styled.div`
  position: fixed;
  inset: 0 auto 50vh;
  width: 3px;
  height: 50vh;
  background: linear-gradient(to bottom, #ff6a00, #ee0979);
  z-index: -1;
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 180px 1fr;
  padding: 80px 0;
  position: relative;

  @media (max-width: 767px) {
    grid-template-columns: 64px 1fr;
    width: 100%;
  }
`;

const TimelineLeft = styled.div`
  text-align: right;

  @media (max-width: 767px) {
    text-align: left;
    grid-area: 1 / 2 / 2 / 3;
  }
`;

const TimelineCentre = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
    grid-area: 1 / 1 / 3 / 2;
  }
`;

const TimelineRight = styled.div``;

const DateText = styled.div`
  position: sticky;
  top: 50vh;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  color: white;

  @media (max-width: 767px) {
    font-size: 36px;
    margin-bottom: 24px;
  }
`;

const TimelineText = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  color: white;

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const LightGreyText = styled.p`
  color: #ffffffa6;
`;

const ImageWrapper = styled.div`
  margin-bottom: 32px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  vertical-align: middle;
    border-radius: 20px;
    border: 2px solid #ffffff1a; 
`;

const TimelineCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 100%;
  position: sticky;
  top: 50vh;
  box-shadow: 0 0 0 8px #0a0a0a;
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 738);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <PageWrapper>

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
            <TimelineProgress>
              <TimelineProgressBar />
            </TimelineProgress>
            {events.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineLeft>
                  <DateText>{event.date}</DateText>
                </TimelineLeft>
                <TimelineCentre>
                  <TimelineCircle />
                </TimelineCentre>
                <TimelineRight>
                  <TimelineText>{event.text}</TimelineText>
                  {event.subtext && (
                    <LightGreyText>{event.subtext}</LightGreyText>
                  )}
                  <ImageWrapper>
                    <StyledImage
                      src={event.img}
                      alt={event.alt}
                      loading="lazy"
                      width="480"
                    />
                  </ImageWrapper>
                </TimelineRight>
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
