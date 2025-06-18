import { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

import video from "../assets/sky.mp4";
import aeroplane from "../assets/plane.png";

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff; /* Optional: white background for contrast */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #111;
  text-align: center;
  margin-bottom: 2rem;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2 / 1;
  border-radius: 60px;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaneImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

const SecondPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Section>
      <Title data-aos="fade-up" data-aos-duration="2500">
        Start Planning Your Next Trip With Us
      </Title>
      <VideoWrapper>
        <StyledVideo src={video} autoPlay muted loop />
        <PlaneImage src={aeroplane} alt="Plane" />
      </VideoWrapper>
    </Section>
  );
};

export default SecondPage;
